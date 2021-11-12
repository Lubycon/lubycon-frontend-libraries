/**
 * 두 배열 간의 동일하지 않은 원소를 담은 배열을 반환합니다. 이때 동일 여부는 세 번째 인자인 comparator 함수로 판단합니다.
 *
 * @example
 * ```ts
 * differenceWith([1, 2, 3], [2, 3], (x, y) => x === y); // [1]
 * differenceWith(
 *   [{ info: { id: 1 }, name: 'evan' }, { info: { id: 2 }, name: 'john' }],
 *   [{ info: { id: 2 }, name: 'john' }],
 *   (x, y) => x.info.id === y.info.id
 * ); // [{ info: { id: 1 }, name: 'evan' }]
 * ```
 */
export function differenceWith<T>(xs: T[], ys: T[], comparator: (x: T, y: T) => boolean): T[] {
  return xs.filter((x) => {
    return ys.findIndex((y) => comparator(x, y)) === -1; // 찾는 원소가 null이나 undefined면 망함
  });
}
