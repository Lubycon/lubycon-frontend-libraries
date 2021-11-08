import {
  LoggerEnvMode,
  LoggerEventParams,
  LoggerInitializeConfig,
  LoggerParams,
  SupportedServices,
} from '../models/loggers';
import { initializeFirebase } from './firebase';
import { initializeAmplitude } from './amplitude';
import LubyconLogger from './lubyconLogger';
import { Defer, defer, TypeMap } from 'temen';
import { getKeys } from '../utils';

const initializers: TypeMap<SupportedServices, (arg: any) => Promise<any>> = {
  firebase: initializeFirebase,
  amplitude: initializeAmplitude,
  lubycon: LubyconLogger.initializedLubyconLogger,
};

/**
 * amplitude, firebase, lubycon 로거를 등록하여 쉽게 사용할 수 있는 라이브러리입니다.
 *
 * 기본적으로 lubycon logger는 꼭 사용해야합니다.
 *
 * 사용전 devops guild에 문의해 clientId를 발급받아 주세요!
 */
class Logger {
  private mode: LoggerEnvMode = 'production';

  private serviceAvailable: TypeMap<SupportedServices, Defer<boolean>> = {
    firebase: defer(),
    amplitude: defer(),
    lubycon: defer(),
  };

  private clients: TypeMap<SupportedServices, any> = {
    firebase: undefined,
    amplitude: undefined,
    lubycon: undefined,
  };

  /**
   * 
   * 사용하실 logger를 init 하는 함수입니다.
   * @example
   * ```ts
   * logger.init({
      services: {
        firebase: firebaseConfig,
        amplitude: process.env.AMPLITUDE_KEY ?? '',
        lubycon: { cid: 'clientId', pl: 'dd', an: 'ddd' },
      },
      mode: isProduction ? 'production' : 'development',
    })
   * ```
   */
  public init({ mode, services }: LoggerInitializeConfig) {
    this.mode = mode;

    return Promise.all(
      getKeys(services).map(async (serviceKey) => {
        const initializer = initializers[serviceKey];
        const config = services[serviceKey];
        this.clients[serviceKey] = await initializer?.(config);
        this.serviceAvailable[serviceKey]?.resolve(config != null);
      })
    );
  }

  private async track(logName: string, { view, action, params }: LoggerParams) {
    if (this.mode === 'development') {
      console.table({
        view,
        logName,
        action,
        ...params,
      });
    }

    // 추상화 할 것
    await Promise.all([
      (async () => {
        /**
         * amplitude, firebase는 serviceAvailable 활성상태를 체크하는거같은데 lubyconLogger에서는 어떻게 해줘야할지 고민이 되네요..
         */
        await LubyconLogger.logEvent({ view, action });
      })(),
      (async () => {
        if (await this.serviceAvailable.firebase?.promise) {
          this.clients.firebase?.analytics().logEvent(logName, {
            view,
            action,
            ...params,
          });
        }
      })(),
      (async () => {
        if (await this.serviceAvailable.amplitude?.promise) {
          try {
            this.clients.amplitude?.logEvent(logName, {
              view,
              action,
              ...params,
            });
          } catch (e) {
            return;
          }
        }
      })(),
    ]);
  }

  private getView(loggerName: string) {
    return (params: LoggerEventParams = {}) => {
      this.track(`${loggerName}_view`, {
        view: loggerName,
        action: 'view',
        params,
      });
    };
  }

  private getClick(loggerName: string) {
    return (logName: string, params: LoggerEventParams = {}) =>
      this.track(logName, {
        view: loggerName,
        action: 'click',
        params,
      });
  }

  private getImpression(loggerName: string) {
    return (logName: string, params: LoggerEventParams = {}) =>
      this.track(logName, {
        view: loggerName,
        action: 'impression',
        params,
      });
  }

  private getCustomEvent(loggerName: string) {
    return (logName: string, eventType: string, params: LoggerEventParams = {}) =>
      this.track(logName, {
        view: loggerName,
        action: eventType,
        params,
      });
  }

  public getPageLogger(loggerName: string) {
    return {
      view: this.getView(loggerName),
      click: this.getClick(loggerName),
      impression: this.getImpression(loggerName),
      event: this.getCustomEvent(loggerName),
    };
  }
}

const instance = new Logger();
export default instance;
