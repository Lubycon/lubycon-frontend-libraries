/**
 * throttle 입니다.
 * @param {Function} callback - 마지막 debounce 호출 이후 delay 이후 호출될 함수.
 * @param {number} delay - delay: millisecond 기준.
 * @example
 * ```ts
 *  const callbackFunc = () => {
 *    return 'callback'
 *  }
 *
 *  const debounce(callback, 300);
 * ```
 */

function debounce<T extends unknown[]>(callback: (...args: T) => void, delay: number) {
  let timeout: NodeJS.Timeout;

  return function debouncedCallback(...args: T) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export default debounce;
