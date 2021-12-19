/**
 * value가 object-like인지 확인
 * typeof 결과는 object이다.
 *
 * @param {any} value 검사할 값
 * @returns {boolean} object-like이면 true 반환 아닌 경우 false 반환
 * @example
 *
 * ```ts
 * isObjectLike({})
 * // => true
 *
 * isObjectLike([1, 2, 3])
 * // => true
 *
 * isObjectLike(Function)
 * // => false
 *
 * isObjectLike(null)
 * // => false
 * ```
 */

function isObjectLike(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

export default isObjectLike;
