/**
 * value가 `Symbol` primitive 혹은 object 인지 확인합니다.
 *
 * @param {any} value - 확인할 값
 * @returns {boolean} 만약 value가 `Symbol` primitive 혹은 object 이면 `true`를, 그렇지 않다면 `false`를 반환합니다.
 * @example
 *
 * ```js
 * isSymbol(Symbol.iterator);
 * // => true
 *
 * isSymbol('abc');
 * // => false
 * ```
 */

function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol';
}

export default isSymbol;
