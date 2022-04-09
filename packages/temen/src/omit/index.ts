import getObjectKeys from '../getObjectKeys';

/**
 * 객체를 받아 원하는 키를 제외한 새로운 객체를 반환합니다.
 *
 * @example
 * ```ts
 * omit({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { b: '2' }
 * ```
 */
function omit<T extends Record<string | number | symbol, unknown>, K extends keyof T>(
  object: T,
  keys: readonly K[]
) {
  return getObjectKeys(object).reduce((result, key) => {
    if (keys.includes(key as K)) {
      return result;
    }

    return {
      ...result,
      [key]: object[key],
    };
  }, {} as Omit<T, K>);
}

export default omit;
