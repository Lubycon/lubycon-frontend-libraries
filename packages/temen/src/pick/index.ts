/**
 * pick object 중에서 원하는 키 값으로 선택한 키로 이루어져있는 개체를 만드는 함수
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
  ...keys: readonly K[]
): Pick<T, K> {
  return keys.reduce((acc, key) => {
    acc[key] = object[key];

    return acc;
  }, {} as Pick<T, K>);
}

export default pick;
