/**
 * 객체를 받아 원하는 키만으로 이루어져있는 새로운 객체를 만드는 함수
 *
 * @param object (Object): 객체.
 * @param array (...string|string[]): 선택할 속성
 * @example
 * ```ts
 *  const objectA = { 'a': 1, 'b': '2', 'c': 3 };
 *  pick(objectA, ['a', 'c']); // {'a':1 ,'c': 3}
 * ```
 */
function pick<T extends Record<string | number | symbol, unknown>, K extends keyof T>(
  object: T,
  keys: readonly K[]
) {
  return keys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: object[key],
    };
  }, {} as Pick<T, K>);
}

export default pick;
