interface Options {
  async?: boolean;
  defer?: boolean;
}
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
