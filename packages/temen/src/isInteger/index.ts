/**
 * value가 정수인지 확인합니다.
 *
 *
 * @param {any} value 확인 할 값
 * @returns {boolean} value가 정수이면 `true` 아니면 `false`
 * @example
 *```js
 * isInteger(3);
 * // => true
 *
 * isInteger(Number.MIN_VALUE);
 * // => false
 *
 * isInteger(Infinity);
 * // => false
 * ```
 */
function isInteger(value: number) {
  return Number.isInteger(value);
}

export default isInteger;
