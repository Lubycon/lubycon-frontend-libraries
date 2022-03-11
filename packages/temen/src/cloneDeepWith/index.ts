import cloneDeep from '../cloneDeep';

/**
 * value를 깊은 복사 한다.
 * customizer는 깊은복사 된 value를 매게변수로 받는다.
 *
 * @param {any} value value를 깊은 복사 합니다.
 * @param {Function} [customizer] The function to customize cloning.
 * @returns {any} Returns 깊은 복사 된 value 또는 customizer의 결과 값
 * @see cloneWith
 * @example
 *
 * ```ts
 * function customizer(value) {
 *   if (isElement(value)) {
 *     return value.cloneNode(true)
 *   }
 * }
 *
 * const el = cloneDeepWith(document.body, customizer)
 *
 * console.log(el === document.body)
 * // => false
 * console.log(el.nodeName)
 * // => 'BODY'
 * console.log(el.childNodes.length)
 * // => 20
 * ```
 */
function cloneDeepWith<T, R>(value: T, customizer: (params: T) => R): R;
function cloneDeepWith<T>(value: T, customizer: (params: T) => unknown) {
  const clonedValue = cloneDeep(value);
  if (customizer) {
    return customizer(clonedValue);
  }
  return clonedValue;
}

export default cloneDeepWith;
