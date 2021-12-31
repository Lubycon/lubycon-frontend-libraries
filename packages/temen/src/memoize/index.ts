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
