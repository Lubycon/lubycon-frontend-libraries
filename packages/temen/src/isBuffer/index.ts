/**
 * value가 Buffer인지 확인합니다.
 *
 * @param {any} value 확인할 값
 * @returns {boolean} Returns value가 Buffer인지 여부
 * @example
 * ```js
 * isBuffer(new Buffer(2))
 * // => true
 *
 * isBuffer(new Uint8Array(2))
 * // => false
 * ```
 */

function isBuffer(arg: any): arg is Buffer {
  return arg instanceof Buffer;
}

export default isBuffer;
