/**
 * throttle 입니다.
 * @param {Function} callback - delay(지연) 이후에 실행되는 함수입니다.
 * @param {number} delay - delay(지연)시킬 시간 millisecond 기준.
 * @example
 * ```ts
 *  const callbackFunc = () => {
 *    return 'callback'
 *  }
 *
 *  throttle(callback, 300);
 * ```
 */

function throttle<T extends unknown[]>(callback: (...args: T) => void, delay: number) {
  let isThrottle = false;

  return function throttledCallback(...args: T) {
    if (isThrottle === false) {
      callback(...args);
      isThrottle = true;
      setTimeout(() => {
        isThrottle = false;
      }, delay);
    }
  };
}

export default throttle;
