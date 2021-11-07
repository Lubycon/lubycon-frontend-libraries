/**
 * 첫 번째 인자로 주어진 배열을 두 번째 인자로 주어진 크기의 배열로 쪼갭니다.
 *
 * @example
 * ```ts
 * chunk([1, 2, 3, 4]); // [[1], [2], [3], [4]]
 * chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
 * ```
 */
function chunk<T>(array: T[], size = 1): Array<T[]> {
  const chunkSize = Math.max(Math.floor(size), 0);

  const length = array.length;
  if (!length || chunkSize < 1) {
    return [];
  }

  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(length / chunkSize));

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += chunkSize));
  }

  return result;
}

export default chunk;
