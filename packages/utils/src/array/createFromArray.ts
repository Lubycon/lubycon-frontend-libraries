/**
 * 인자로 받은 배열을 기반으로 key를 키로 가지는 Map을 생성합니다.
 *
 * @example
 * ```ts
 * interface Foo {
 *   id: string;
 *   name: string;
 * }
 * const fooList: Foo[] = [];
 * createMapFromArray(fooList, 'id'); // Map<string, Foo>
 * ```
 */
export function createMapFromArray<T, K extends keyof T>(array: T[], key: K) {
  const map = new Map<T[K], T>();
  array.forEach((item) => {
    if (map.get(item[key]) != null) {
      throw new Error('이미 동일한 key가 존재합니다.');
    }

    map.set(item[key], item);
  });

  return map;
}

/**
 * 인자로 받은 배열을 기반으로 key를 키로 가지는 Object를 생성합니다.
 *
 * @example
 * ```ts
 * interface Foo {
 *   id: string;
 *   name: string;
 * }
 * const fooList: Foo[] = [];
 * createObjectFromArray(fooList, 'id'); // Record<string, Foo>
 * ```
 */
export function createObjectFromArray<T extends Record<string, any>, K extends keyof T>(
  array: T[],
  key: K
) {
  const obj: Record<string, T> = {};
  array.forEach((item) => {
    if (obj[item[key]] != null) {
      throw new Error('이미 동일한 key가 존재합니다.');
    }

    obj[item[key]] = item;
  });

  return obj;
}
