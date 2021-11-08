import { getCookie, setCookie } from '../../utils/cookie';
import { LubyconLoggerConfig, LubyconLoggerConfigProps } from '../../models/lubyconLogger';
import { generateUUID, doPost } from 'temen';

interface LubyconLoggerEvent {
  view: string;
  action: string;
}

class LubyconLogger {
  static initialized = false;

  static lubyconLoggerConfig: LubyconLoggerConfig = {};

  /**
   * Lubycon Logger를 init하는 메서드입니다.
   * 받는 props는
   * {
   *    cid: string // devops guild에서 발급하는 unique client key
   *    pl : string // site full url
   *    an : string // application name
   * }
   *
   *  나머지는 해당 메서드에서 생성합니다.
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

      doPost(
        'https://event-gateway.alpha.lubycon.io/v1/collect/',
        LubyconLogger.lubyconLoggerConfig,
        { headers: { 'Content-Type': 'application/json' } }
      ).response.then(() => {
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

        doPost(
          'https://event-gateway.alpha.lubycon.io/v1/collect/',
          {
            ...LubyconLogger.lubyconLoggerConfig,
            view,
            action,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        doPost(
          'https://event-gateway.alpha.lubycon.io/v1/collect/',
          {
            ...LubyconLogger.lubyconLoggerConfig,
            view,
            action,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  }
}

export default new LubyconLogger();
