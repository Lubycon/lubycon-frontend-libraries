function flat<T>(arr: T[], target: unknown[], depth: number) {
  arr.forEach(function (el) {
    if (!Array.isArray(el) || depth === -1) {
      target.push(el);
      return;
    }

    flat(el, target, depth - 1);
  });
}

/**
 * 고차원의 배열을 Flatten 합니다. 두 번째 인자로 어느 정도의 Depth까지 탐색하여 Flatten 할지 정할 수 있습니다. 만약 Depth를 지정하지 않는다면 기본적으로 한 단계의 Flatten만 수행합니다.
 *
 * (Native JS의 Array.prototype.flat 메소드보다 더 빠른 속도를 보장하지만 더 많은 Heap 메모리를 사용합니다)
 *
 * @example
 * ```ts
 * flatten([[1, 2], ['hello', 'world', [ 30 ]]]);
 * // [1, 2, 'hello', 'world', [30]]
 *
 * flatten([[1, 2], ['hello', 'world', [ 30 ]]], 2);
 * // [1, 2, 'hello', 'world', 30]
 * ```
 */
export function flatten<T, Depth extends number = 0>(arr: T[], depth?: Depth) {
  const flattened: unknown[] = [];
  flat<T>(arr, flattened, depth ?? 0);

  return flattened as FlatArray<T, Depth>[];
}

/**
 * 고차원의 배열을 끝까지 탐색하여 모든 원소를 Flatten 합니다.
 *
 * (Native JS의 Array.prototype.flat 메소드보다 더 빠른 속도를 보장하지만 더 많은 Heap 메모리를 사용하기 때문에, 너무 깊은 차원의 배열을 Flatten하게되면 out of memory가 발생할 수도 있습니다)
 *
 * @example
 * ```ts
 * flattenDeep([[1, 2, [3, [true]]], ['hello', 'world', [ 30 ]]]);
 * // [1, 2, 3, true, 'hello', 'world', 30]
 * ```
 */
export function flattenDeep<T>(arr: T[]) {
  return flatten(arr, Infinity);
}
