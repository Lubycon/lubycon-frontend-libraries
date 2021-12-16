/**
 * 인자로 받은 배열의 모든 원소를 합산합니다
 *
 * @example
 * ```ts
 * sum([1, 2, 3, 4]); // 10
 * ```
 */
export function sum(array: number[]) {
  return array.reduce((result, current) => result + current, 0);
}

/**
 * 인자로 받은 배열을 한번 매핑한 후 모든 반환값을 합산합니다
 *
 * @example
 * ```ts
 * sumBy(
 *   [{ value: 1 }, { value: 2 }, { value: 3 }],
 *   item => item.value
 * ); // 6
 * ```
 */
export function sumBy<T>(array: T[], mapper: (item: T) => number) {
  return sum(array.map(mapper));
}
