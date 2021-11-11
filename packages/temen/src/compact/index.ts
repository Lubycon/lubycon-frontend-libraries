/**
 * 배열 내에서 0, "", undefined, null, NaN과 같은 Falsy 값을 모두 제거합니다.
 *
 * @example
 * ```ts
 * compact([0, 1, false, 2, '', 3]); // [1, 2, 3]
 * ```
 */
function compact<T>(array: T[]) {
  return array.filter((el) => Boolean(el));
}

export default compact;
