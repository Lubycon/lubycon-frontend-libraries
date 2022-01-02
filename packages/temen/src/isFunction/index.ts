/**
 * Checks if `value` is classified as a `Function` object.
 * value가 `Function` 객체인지 확인합니다.
 *
 * @param {any} value 확인할 값
 * @returns {boolean} Returns value가 `Function` 객체인지 여부
 * @example
 * ```js
 * isFunction(class Any{})
 * // => true
 *
 * isFunction(() => {})
 * // => true
 *
 * isFunction(async () => {})
 * // => true
 *
 * isFunction(function * Any() {})
 * // => true
 *
 * isFunction(Math.round)
 * // => true
 *
 * isFunction(/abc/)
 * // => false
 * ```
 */

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export default isFunction;
