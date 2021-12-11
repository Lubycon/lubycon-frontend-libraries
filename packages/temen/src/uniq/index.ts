/**
 * 인자로 주어진 배열 내의 중복된 원소를 제거합니다. 같은 값을 가진 원소를 걸러내기 때문에 Object와 같은 자료형의 중복은 체크하지 않습니다.
 *
 * @example
 * ```ts
 * uniq([1, 1, 2, 3, 5, 5, 7, 'foo', 'bar', 'bar']);
 * // [1, 2, 3, 5, 7, 'foo', 'bar']
 * ```
 */
export function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set<T>(arr));
}

/**
 * 두 번째 인자인 converter 함수로 배열의 원소를 매핑한 후, 중복된 원소를 제거합니다. 같은 값을 가진 원소를 걸러내기 때문에 Object와 같은 자료형의 중복은 체크하지 않습니다.
 *
 * @example
 * ```ts
 * uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor);
 * // [1, 2, 3, 5, 7]
 * ```
 */
export function uniqBy<T, U>(arr: T[], converter: (item: T) => U): U[] {
  const mappedArray = arr.map(converter);
  return uniq(mappedArray);
}
