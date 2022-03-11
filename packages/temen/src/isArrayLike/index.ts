/**
 * value가 유사 배열인지 확인.
 * value가 다음과 같은 경우 유사배열으로 간주한다.
 * 함수가 아니며 또는 0이상의 value.length를 가진 경우
 *
 * @param {any} value 검사할 값
 * @returns {boolean} 유사 배열이면 true 반환 아닌 경우 false 반환
 * @example
 *
 * ```js
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike(document.body.children)
 * // => true
 *
 * isArrayLike('abc')
 * // => true
 *
 * isArrayLike(Function)
 * // => false
 * ```
 */

function isArrayLike(value: any): boolean {
  if (value === null || value === undefined) return false;

  return typeof value !== 'function' && value.length >= 0;
}

export default isArrayLike;
