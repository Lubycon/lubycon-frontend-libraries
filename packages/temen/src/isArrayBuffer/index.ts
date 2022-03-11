/**
 * value가 ArrayBuffer인지 확인
 *
 * @param {any} value 검사할 값
 * @returns {boolean} ArrayBuffer이면 true 반환 아닌 경우 false 반환
 * @example
 *
 * ```js
 * isArrayBuffer(new ArrayBuffer(2))
 * // => true
 *
 * isArrayBuffer(new Array(2))
 * // => false
 * ```
 */

function isArrayBuffer(value: any): value is ArrayBuffer {
  return value !== null && typeof value === 'object' && value.constructor === ArrayBuffer;
}

export default isArrayBuffer;
