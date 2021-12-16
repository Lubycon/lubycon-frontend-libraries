/**
 * 인자로 받은 배열의 원소들 중 최대 값을 반환합니다.
 *
 * @example
 * ```ts
 * max([1, 2, 3, 4]); // 4
 * ```
 */
export function max(array: number[]) {
  return Math.max(...array);
}

/**
 * 인자로 받은 배열을 매핑한 후 결과 값에 따라 최대 값을 가진 원소를 반환합니다.
 *
 * @example
 * ```ts
 * maxBy(
 *   [{ value: 1 }, { value: 2 }, { value: 3 }],
 *   item => item.value
 * ); // { value: 3 }
 * ```
 */
export function maxBy<T>(array: T[], mapper: (item: T) => number) {
  return array.reduce((prev, current) => {
    return mapper(prev) > mapper(current) ? prev : current;
  });
}
