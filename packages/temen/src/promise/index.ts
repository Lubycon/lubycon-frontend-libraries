type PromiseResolver<T> = (value: T | PromiseLike<T>) => void;
type PromiseRejecter = (reason?: any) => void;

export interface Defer<T> {
  promise: Promise<T>;
  resolve: PromiseResolver<T>;
  reject: PromiseRejecter;
}

/**
 * Promise defer 패턴을 사용할 수 있는 함수입니다.
 *
 * @example
 * ```js
 * const {
 *   promise: sdkLoadPromise,
 *   resolve: sdkLoadPromiseResolver
 * } = defer();
 *
 * async function call() {
 *   const isLoaded = await sdkLoadPromise;
 *   console.log('SDK 로딩 완료');
 * }
 *
 * function completeLoading () {
 *   // 로딩 중....
 *   sdkLoadPromiseResolver(true);
 * }
 * ```
 */
export function defer<T>(): Defer<T> {
  let resolver: PromiseResolver<T> | null = null;
  let rejecter: PromiseRejecter | null = null;

  const promise = new Promise<T>((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });

  return {
    promise,
    resolve: resolver!,
    reject: rejecter!,
  };
}

/**
 * Promise를 사용하여 일정 시간 동안 라인의 실행을 멈춥니다. delay의 단위로는 ms를 사용합니다.
 *
 * @example
 * ```js
 * console.log('슬립 시작');
 * await sleep(1000);
 * console.log('1초 지남');
 * ```
 */
export function sleep(delay: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
