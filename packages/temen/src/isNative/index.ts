/**
 * value가 native function인지 확인합니다.
 *
 * @param {any} value - 확인할 값
 * @returns {boolean} 만약 value가 native function이면 `true`를, 그렇지 않다면 `false`를 반환합니다.
 * @example
 *
 * ```js
 * isNative(Array.prototype.push);
 * // => true
 *
 * isNative(cloneDeep);
 * // => false
 * ```
 */

function isNative(value: any) {
  return typeof value === 'function' && /native code/.test(value.toString());
}

export default isNative;
