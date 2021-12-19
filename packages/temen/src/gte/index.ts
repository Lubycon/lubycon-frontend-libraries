/**
 * value가 other보다 큰지 확인
 *
 * @param {*} value 비교할 값
 * @param {*} other 바교할 다른 값
 * @returns {boolean} 값이 other 보다 크거나 같으면 true 반환 아닌 경우 false 반환
 *
 * @example
 *
 * ```js
 * gt(3, 1)
 * // => true
 *
 * gt(3, 3)
 * // => true
 *
 * gt(1, 3)
 * // => false
 * ```
 */

function gte(value: number, other: number): boolean {
  return value >= other;
}

export default gte;
