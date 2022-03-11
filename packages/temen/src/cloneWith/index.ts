import clone from '../clone';

/**
 * value를 얕은 복사 한다.
 * customizer는 얕은 복사 된 value를 매게변수로 받는다.
 *
 * @param {any} value value를 얕은 복사 합니다.
 * @param {Function} [customizer] The function to customize cloning.
 * @returns {any} Returns 얕은 복사 된 value 또는 customizer의 결과 값
 * @see cloneDeepWith
 * @example
 * ```js
 * function customizer(value) {
 *   if (isElement(value)) {
 *     return value.cloneNode(false)
 *   }
 * }
 *
 * const el = cloneWith(document.body, customizer)
 *
 * console.log(el === document.body)
 * // => false
 * console.log(el.nodeName)
 * // => 'BODY'
 * console.log(el.childNodes.length)
 * // => 0
 * ```
 */
function cloneWith<T, R>(value: T, customizer?: (params: T) => R): R;
function cloneWith<T>(value: T, customizer?: (params: T) => unknown) {
  const clonedValue = clone(value);
  if (customizer) {
    return customizer(clonedValue);
  }
  return clonedValue;
}

export default cloneWith;
