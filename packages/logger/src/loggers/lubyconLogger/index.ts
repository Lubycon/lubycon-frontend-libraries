import { generateUUID } from '@lubycon/utils';
import { getCookie, setCookie } from '../../utils/cookie';
import { LubyconLoggerConfig, LubyconLoggerConfigProps } from '../../models/lubyconLogger';

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
    return new Promise(async () => {
      LubyconLogger.lubyconLoggerConfig = await {
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

      return fetch('https://event-gateway.alpha.lubycon.io/v1/collect/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(LubyconLogger.lubyconLoggerConfig),
      }).then((res) => {
        res.json();
        LubyconLogger.initialized = true;
      });
    });
  }

  public async logEvent({ view, action }: LubyconLoggerEvent) {
    if (LubyconLogger.initialized) {
      /**
       * 쿠키에 저장된 sid가 없으면 sid 다시 넣고 요청
       */
      if (!getCookie('sid')) {
        LubyconLogger.lubyconLoggerConfig = await {
          ...LubyconLogger.lubyconLoggerConfig,
          sid: generateUUID(),
        };

        await setCookie('sid', LubyconLogger.lubyconLoggerConfig.sid, 5);
        await fetch('https://event-gateway.alpha.lubycon.io/v1/collect/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...LubyconLogger.lubyconLoggerConfig,
            view,
            action,
          }),
        }).then((res) => res.json());
      } else {
        return fetch('https://event-gateway.alpha.lubycon.io/v1/collect/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...LubyconLogger.lubyconLoggerConfig,
            view,
            action,
          }),
        }).then((res) => res.json());
      }
    }
  }
}

export default new LubyconLogger();
