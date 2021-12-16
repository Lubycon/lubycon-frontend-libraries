import { isEqual } from '../isEqual';

/**
 * 두 배열 간의 겹치는 원소를 담은 배열을 반환합니다. 이때 동일 여부는 세 번째 인자인 comparator 함수로 판단합니다.
 *
 * @example
 * ```ts
 * intersectionWith([1, 2, 3], [2, 3, 4], (x, y) => x === y); // [2, 3]
 * intersectionWith(
 *   [{ info: { id: 1 }, name: 'evan' }, { info: { id: 2 }, name: 'john' }],
 *   [{ info: { id: 2 }, name: 'john' }],
 *   (x, y) => x.info.id === y.info.id
 * ); // [{ info: { id: 2 }, name: 'john' }]
 * ```
 */
export function intersectionWith<T>(xs: T[], ys: T[], comparator: (x: T, y: T) => boolean): T[] {
  return xs.filter((x) => {
    return ys.some((y) => comparator(x, y));
  });
}

/**
 * 두 배열을 깊은 비교한 이후, 겹치는 원소를 담은 배열을 반환합니다.
 *
 * @example
 * ```ts
 * intersection([1, 2, 3], [2, 3]); // [2, 3]
 * intersection(
 *   [{ info: { id: 1 }, name: 'evan' }, { info: { id: 2 }, name: 'john' }],
 *   [{ info: { id: 2 }, name: 'john' }],
 * ); // [{ info: { id: 2 }, name: 'john' }]
 * ```
 */
export function intersection<T>(xs: T[], ys: T[]) {
  return intersectionWith(xs, ys, isEqual);
}
