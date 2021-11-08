/**
 * `value`가 배열이 아닌 경우 배열으로 캐스팅합니다.`
 *
 * @param {*} 검사할 value 값.
 * @returns {Array<any>} 캐스팅 된 배열을 반환.
 * @example
 *
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
 */

function castArray(...args: any[]): Array<any> {
  if (!args.length) {
    return [];
  }
  const value = args[0];
  return Array.isArray(value) ? value : [value];
}

export default castArray;
