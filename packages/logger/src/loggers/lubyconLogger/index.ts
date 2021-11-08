import { LubyconLoggerConfig, LubyconLoggerConfigProps } from '../../models/lubyconLogger';
import { generateUUID, createFetchInstance, getCookie, setCookie } from 'temen';

interface LubyconLoggerEvent {
  view: string;
  action: string;
}

class LubyconLogger {
  static initialized = false;

  static lubyconLoggerConfig: LubyconLoggerConfig = {};

  static logHost = createFetchInstance('https://event-gateway.alpha.lubycon.io', {
    headers: { 'Content-Type': 'application/json' },
  });
  /**
   * Lubycon Logger를 init하는 메서드입니다.
   */
  public initializedLubyconLogger(config: LubyconLoggerConfigProps) {
    return new Promise(() => {
      LubyconLogger.lubyconLoggerConfig = {
        ...config,
        ...{
          tid: generateUUID(),
          sid: generateUUID(),
          sdid: generateUUID(),
          ett: new Date().getTime(),
          v: '1',
        },
      };

      setCookie('sid', LubyconLogger.lubyconLoggerConfig.sid, 5);

      if (LubyconLogger.initialized) {
        return;
      }
      LubyconLogger.logHost
        .post('/v1/collect/', { ...LubyconLogger.lubyconLoggerConfig })
        .response.then(() => {
          LubyconLogger.initialized = true;
        });
    });
  }

  public logEvent({ view, action }: LubyconLoggerEvent) {
    if (LubyconLogger.initialized) {
      /**
       * 쿠키에 저장된 sid가 없으면 sid 다시 넣고 요청
       */
      if (getCookie('sid') === null) {
        LubyconLogger.lubyconLoggerConfig = {
          ...LubyconLogger.lubyconLoggerConfig,
          sid: generateUUID(),
        };

        setCookie('sid', LubyconLogger.lubyconLoggerConfig.sid, 5);

        LubyconLogger.logHost.post('/v1/collect/', {
          ...LubyconLogger.lubyconLoggerConfig,
          view,
          action,
        });
      } else {
        LubyconLogger.logHost.post('/v1/collect/', {
          ...LubyconLogger.lubyconLoggerConfig,
          view,
          action,
        });
      }
    }
  }
}

export default new LubyconLogger();
