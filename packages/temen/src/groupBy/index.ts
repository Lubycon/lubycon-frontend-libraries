type Key = string | number;

/**
 * 배열의 원소들을 iterator가 반환하는 값을 기준으로 그룹핑합니다.
 *
 * @example
 * ```ts
 * groupBy([6.1, 4.2, 6.3], Math.floor);
 * // { 4: [4.2], 6: [6.1, 6.3] }
 *
 * groupBy(
 *   [
 *     { age: 31, name: 'evan' },
 *     { age: 32, name: 'john' },
 *     { age: 25, name: 'kevin' },
 *   ],
 *   ({ age }) => `${Math.floor(age / 10) * 10}대`
 * ) // { '20대': [{ age: 25, name: 'kevin' }], '30대': [{ age: 31, name: 'evan' }, { age: 32, name: 'john' }]}
 * ```
 */
export function groupBy<T>(array: T[], iterator: (item: T) => Key) {
  return array.reduce<Record<Key, T[]>>((result, current) => {
    const key = iterator(current);
    if (result[key] != null) {
      result[key] = [...result[key], current];
    } else {
      result[key] = [current];
    }

    return result;
  }, {});
}
