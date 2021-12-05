/**
 * @example
 * ```ts
 * getLongestArrayLength([[1, 2], [1, 2, 3], [1]]); // 3
 * ```
 */
export function getLongestArrayLength<T>(array: T[][]) {
  return array.reduce((prevArrayLength: number, current: any[]) => {
    return Math.max(prevArrayLength, current.length);
  }, 0);
}
