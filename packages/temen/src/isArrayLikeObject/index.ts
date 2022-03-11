import isArrayLike from '../isArrayLike';
import isObjectLike from '../isObjectLike';

/**
 *  value가 object인지 확인 한다는 점을 제외하면 isArrayLike와 동일하다.
 *
 * @param {any} value 검사할 값
 * @returns {boolean} array-like object이면 true 반환 아닌 경우 false 반환
 * @example
 *```js
 * isArrayLikeObject([1, 2, 3])
 * // => true
 *
 * isArrayLikeObject(document.body.children)
 * // => true
 *
 * isArrayLikeObject('abc')
 * // => false
 *
 * isArrayLikeObject(Function)
 * // => false
 * ```
 */
function isArrayLikeObject(value: any): boolean {
  return isObjectLike(value) && isArrayLike(value);
}

export default isArrayLikeObject;
