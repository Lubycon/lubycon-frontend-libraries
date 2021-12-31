/**
 * 인자로 주어진 함수를 메모아이징합니다. resolver 함수를 인자를 넘겨 메모아이징을 수행할 기준을 정할 수 있습니다.
 *
 * @example
 * ```ts
 * const foo = { a: 1, b: 2 };
 * const func = memoize((value) => Object.values(value));
 *
 * cosnole.log(func(foo)); // [1, 2]
 * foo.a = 2;
 * console.log(func(foo)); // [1, 2]
 *
 * func.cache.delete(foo);
 * console.log(func(foo)); // [2, 2]
 * ```
 */
function memoize<T extends (...args: unknown[]) => unknown>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
) {
  const memoized = (...args: Parameters<T>) => {
    const key = resolver?.(...args) ?? args[0];
    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    memoized.cache = cache.set(key, result) ?? cache;

    return result;
  };

  memoized.cache = new (memoize.Cache ?? WeakMap)();

  return memoized;
}

memoize.Cache = WeakMap;

type Memoize = typeof memoize & { Cache: WeakMapConstructor };
export default memoize as Memoize;
