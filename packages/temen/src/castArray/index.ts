/**
 * `value`가 배열이 아닌 경우 배열으로 캐스팅합니다.`
 *
 * @param {any} ...args 캐스팅 할 값
 * @returns {Array} 캐스팅 된 배열을 반환.
 *
 * @example
 *```js
 * castArray(1)
 * // => [1]
 *
 * castArray({ 'a': 1 })
 * // => [{ 'a': 1 }]
 *
 * castArray('abc')
 * // => ['abc']
 *
 * castArray(null)
 * // => [null]
 *
 * castArray(undefined)
 * // => [undefined]
 *
 * castArray()
 * // => []
 *
 * const array = [1, 2, 3]
 * console.log(castArray(array) === array)
 * // => true
 * ```
 */

function castArray<T extends unknown[]>(...v: T[]): T;
function castArray<T>(...v: T[]): T[];
function castArray(...args: any[]) {
  if (!args.length) {
    return [];
  }
  const value = args[0];
  return Array.isArray(value) ? value : [value];
}

export default castArray;
