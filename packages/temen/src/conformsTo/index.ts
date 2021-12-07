type Conform<T> = {
  [P in keyof T]: (args: T[keyof T]) => boolean;
};

/**
 * 'object'가 인라인 함수 'source'와 일치하는지 확인
 * 'source'의 프로퍼티와 'object'의 프로퍼티는 일치
 *
 *
 * @param {Object} object 검사할 오브젝트
 * @param {Object} source 오브젝트의 프로퍼티를 검증할 오브젝트
 * @returns {boolean} 'object'가 일치하면 'true'를 반환하고, 그렇지 않으면 'false'를 반환
 * @example
 *
 * ```ts
 * const object = { 'a': 1, 'b': 2 }
 *
 * conformsTo(object, { 'b': function(n) { return n > 1 } })
 * // => true
 *
 * conformsTo(object, { 'b': function(n) { return n > 2 } })
 * // => false
 * ```
 */

function conformsTo<T>(object: T, source: Conform<T>) {
  const keys = Object.keys(source) as Array<keyof typeof source>;

  return keys.reduce((_bool, key) => {
    const predicate = source[key];
    const value = object[key];

    if (!predicate(value)) {
      return false;
    }
    return true;
  }, false);
}

export default conformsTo;
