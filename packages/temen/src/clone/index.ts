/**
 * @param {T} value 복제 할 값.
 * @returns {T} 복제 된 값을 반환.
 * @example
 * ```js
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const shallow = clone(objects)
 * console.log(shallow[0] === objects[0])
 * // => true
 * ```
 */

function clone<T>(value: T): T;
function clone(value: any) {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (Array.isArray(value)) {
    return [...value];
  }

  if (value instanceof Object) {
    return { ...value };
  }

  return value;
}

export default clone;
