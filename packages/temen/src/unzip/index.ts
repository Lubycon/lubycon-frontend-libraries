import getArrayFromCount from '../getArrayFromCount';
import { getLongestArrayLength } from '../_internal/getLongestArrayLength';

/**
 * 인자로 주어진 배열을 순회하며, 내부 배열의 같은 인덱스에 있는 원소들끼리 그룹핑합니다.
 *
 * 주어진 배열들 중 가장 긴 배열의 길이를 기준으로 순회하기 때문에, 만약 해당 인덱스에 대응하는 원소가 없다면 그 자리는 undefined로 채워집니다.
 * @example
 * ```ts
 * unzip(['a', 1, true], ['b', 2, false]]);
 * // [['a', 'b'], [1, 2], [true, false]]
 *
 * unzip([['a', 1, true, 2], ['b', 2, false]]);
 * // [['a', 'b'], [1, 2], [true, false], [2, undefined]]
 * ```
 */
function unzip<T>(array: T[][]): (T | undefined)[][] {
  const longestLength = getLongestArrayLength(array);

  return getArrayFromCount(longestLength).map((_, i) => {
    return array.reduce((result, current) => {
      return [...result, current[i]];
    }, []);
  });
}

export default unzip;
