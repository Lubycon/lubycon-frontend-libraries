/**
 * value가 `WeakSet` 객체인지 확인합니다.
 *
 * @param {any} value - 확인할 값
 * @returns {boolean} 만약 value가 `WeakSet` 객체이면 `true`를, 그렇지 않다면 `false`를 반환합니다.
 * @example
 *
 * ```js
 * isWeakSet(new WeakSet);
 * // => true
 *
 * isWeakSet(new Set);
 * // => false
 * ```
 */
function isWeakSet(value: any): value is WeakSet<any> {
  return value instanceof WeakSet;
}

export default isWeakSet;
