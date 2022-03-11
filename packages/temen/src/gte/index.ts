/**
 * value가 other보다 큰지 확인
 *
 * @param {any} value 비교할 값
 * @param {any} other 바교할 다른 값
 * @returns {boolean} 값이 other 보다 크거나 같으면 true 반환 아닌 경우 false 반환
 *
 * @example
 *
 * ```js
 * gte(3, 1)
 * // => true
 *
 * gte(3, 3)
 * // => true
 *
 * gte(1, 3)
 * // => false
 * ```
 */

function gte(value: number, other: number): boolean {
  return value >= other;
}

export default gte;
