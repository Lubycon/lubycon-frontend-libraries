interface Options {
  async?: boolean;
  defer?: boolean;
}

/**
 * 비동기적으로 스크립트를 로드하고 실행합니다. 로드가 완료되면 Promise가 resolve됩니다.
 *
 * 함수의 두 번째 인자로 async, defer 속성을 추가할 수도 있으며, 기본 값은 async = true , defer = true입니다.
 *
 * @example
 * ```ts
 * function loadGoogleSDK () {
 *   return loadScript('https://developers.kakao.com/sdk/js/kakao.js');
 *   // 또는
 *   return loadScript('https://developers.kakao.com/sdk/js/kakao.js', { async: false, defer: true });
 * }
 * ```
 */
export function loadScript(src: string, options: Options = {}) {
  const { async = true, defer = true } = options;
  if (window == null || document == null) {
    console.warn('loadScript 함수는 브라우저가 아닌 환경에서 실행될 수 없습니다.');
    return Promise.resolve();
  }

  const element = document.querySelector(`script[src="${src}"]`);
  if (element) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.async = async;
    script.defer = defer;
    script.src = src;

    document.body.appendChild(script);

    script.addEventListener('load', resolve);
  });
}
