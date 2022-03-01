/**
 * value가 `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` 객체인지 확인합니다.
 *
 * @param {any} value 확인할 값
 * @returns {boolean} Returns value가 `Error` 객체인지 여부
 * @example
 * ```js
 * isError(new Error)
 * // => true
 *
 * isError(Error)
 * // => false
 * ```
 */

function isError(value: any): value is Error {
  return value instanceof Error;
}

export default isError;
