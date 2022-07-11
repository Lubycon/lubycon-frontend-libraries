import getObjectKeys from '../getObjectKeys';

/**
 * 객체를 순회하며 값을 매핑하여, 키를 유지한채 새로운 값을 가진 객체를 생성합니다.
 *
 * @example
 * ```ts
 * const users = {
 *   fred: { name: 'fred', age: 40 },
 *   pebbles: { name: 'pebbles', age: 1 }
 * };
 *
 * mapValues(users, (o) => o.age);
 * // => { fred: 40, pebbles: 1 }
 * ```
 */
function mapValues<T>(
  object: T,
  iterate: (value: T[keyof T], key: keyof T, object: T) => string | number
) {
  return getObjectKeys(object).reduce<{ [key in keyof T]: ReturnType<typeof iterate> }>(
    (acc, key) => {
      acc[key] = iterate(object[key], key, object);
      return acc;
    },
    {} as { [key in keyof T]: ReturnType<typeof iterate> }
  );
}

export default mapValues;
