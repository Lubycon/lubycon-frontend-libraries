/**
 * value가 Element인지 확인합니다.
 *
 * @param {any} value 확인할 값
 * @returns {boolean} Returns value가 Element인지 여부
 * @example
 *
 * ```js
 * isElement(document.body)
 * // => true
 *
 * isElement('<body>')
 * // => false
 * ```
 */

function isElement(value: any): value is Element {
  return value instanceof Element;
}

export default isElement;
