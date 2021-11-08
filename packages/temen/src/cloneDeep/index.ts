/**
 * 오브젝트를 깊은 복사합니다.
 *
 * @param {T} value 복제 할 값
 * @returns {T} Returns 복제 된 값
 *
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 */

function cloneDeep<T>(obj: T): T {
  const clone: T = JSON.parse(JSON.stringify(obj));

  return clone;
}

export default cloneDeep;
