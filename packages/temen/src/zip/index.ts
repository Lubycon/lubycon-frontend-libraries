import getArrayFromCount from '../getArrayFromCount';
import { getLongestArrayLength } from '../_internal/getLongestArrayLength';

/**
 * 인자로 주어진 배열들의 같은 인덱스에 있는 원소들끼리 그룹핑합니다.
 *
 * 순회는 인자로 주어진 배열들 중 가장 긴 배열의 길이를 기준으로 수행되며, 만약 해당 인덱스에 대응하는 원소가 없다면 그 자리는 undefined로 채워집니다.
 * @example
 * ```ts
 * zip(['a', 'b'], [1, 2]);
 * // [['a', 1], ['b', 2]]
 *
 * zip(['a', 'b'], [1, 2, 3]);
 * // [['a', 1], ['b', 2], [undefined, 3]]
 * ```
 */
function zip<T1, T2>(array1: T1[], array2: T2[]): Array<[T1 | undefined, T2 | undefined]>;
function zip<T1, T2, T3>(
  array1: T1[],
  array2: T2[],
  array3: T3[]
): Array<[T1 | undefined, T2 | undefined, T3 | undefined]>;
function zip<T1, T2, T3, T4>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[]
): Array<[T1 | undefined, T2 | undefined, T3 | undefined, T4 | undefined]>;
function zip<T1, T2, T3, T4, T5>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[],
  array5: T5[]
): Array<[T1 | undefined, T2 | undefined, T3 | undefined, T4 | undefined, T5 | undefined]>;
function zip(...arrays: any[]) {
  const longestLength = getLongestArrayLength(arrays);

  return getArrayFromCount(longestLength).map((_, i) => {
    return getArrayFromCount(arrays.length).map((_, j) => {
      return arrays[j][i];
    });
  });
}

export default zip;
