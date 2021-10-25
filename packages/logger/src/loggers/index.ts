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
import { TypeMap } from '../models/utils';
import { getKeys } from '../utils';
import { Defer, defer } from '../utils/promise';

const initializers: TypeMap<SupportedServices, (arg: any) => Promise<any>> = {
  firebase: initializeFirebase,
  amplitude: initializeAmplitude,
  lubyconLogger: LubyconLogger.initializedLubyconLogger,
};

class Logger {
  private mode: LoggerEnvMode = 'production';

  private serviceAvailable: TypeMap<SupportedServices, Defer<boolean>> = {
    firebase: defer(),
    amplitude: defer(),
    lubyconLogger: defer(),
  };

  private clients: TypeMap<SupportedServices, any> = {
    firebase: undefined,
    amplitude: undefined,
    lubyconLogger: undefined,
  };

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
