/**
 * 인자로 받은 배열의 원소들 중 최소 값을 반환합니다.
 *
 * @example
 * ```ts
 * min([1, 2, 3, 4]); // 1
 * ```
 */
export function min(array: number[]) {
  return Math.min(...array);
}

/**
 * 인자로 받은 배열을 매핑한 후 결과 값에 따라 최소 값을 가진 원소를 반환합니다.
 *
 * @example
 * ```ts
 * minBy(
 *   [{ value: 1 }, { value: 2 }, { value: 3 }],
 *   item => item.value
 * ); // { value: 1 }
 * ```
 */
export function minBy<T>(array: T[], mapper: (item: T) => number) {
  return array.reduce((prev, current) => {
    return mapper(prev) < mapper(current) ? prev : current;
  });
}
