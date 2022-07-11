import getObjectKeys from '../getObjectKeys';

/**
 * 객체를 순회하며 키를 매핑하여, 값을 유지한 채 새로운 키를 가진 객체를 생성합니다.
 *
 *
 * @example
 * ```ts
 * mapKeys({ a: 1, b: 2 }, (value, key) => key + value);
 * // => { a1: 1, b2: 2 }
 * ```
 */
function mapKeys<T>(
  object: T,
  iterate: (value: T[keyof T], key: keyof T, object: T) => string | number
) {
  return getObjectKeys(object).reduce<Record<ReturnType<typeof iterate>, T[keyof T]>>(
    (acc, key) => {
      acc[iterate(object[key], key, object)] = object[key];
      return acc;
    },
    {}
  );
}

export default mapKeys;
