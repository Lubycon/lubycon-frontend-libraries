/**
 * 두 번째 인자로 받은 개수만큼 왼쪽부터 원소를 버리고, 얕은 복사된 배열을 반환합니다.
 *
 * @example
 * ```ts
 * drop([1, 2, 3], 1); // [2, 3]
 * ```
 */
export function drop<T>(array: T[], count: number) {
  return array.slice(count);
}

/**
 * 두 번째 인자로 받은 개수만큼 오른쪽부터 원소를 버리고, 얕은 복사된 배열을 반환합니다.
 *
 * @example
 * ```ts
 * dropRight([1, 2, 3], 1); // [1, 2]
 * ```
 */
export function dropRight<T>(array: T[], count: number) {
  if (count === 0) {
    return array.slice(0);
  }

  return array.slice(0, count * -1);
}
