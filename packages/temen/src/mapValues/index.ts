/**
 * 'object'와 동일한 키를 가진 객체를 만들고
 * 'object'의 각 열거형 문자열 키 속성을 이용해
 * iterate는 세 가지 인수(value, key, object)로 호출됩니다.
 *
 * @param {Object} object 반복할 객체
 * @param {Function} iterate 반복당 호출 함수
 * @returns {Object} 매핑된 새 객체를 반환합니다.
 *
 * @example
 * ```js
 * const users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * mapValues(users, function(o) { return o.age; });
 * // => { 'fred': 40, 'pebbles': 1 }
 *
 * mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 }
 * ```
 */

import getObjectKeys from '../getObjectKeys';

function mapValues<T>(
  object: T,
  iterate: (value: T[keyof T], key: keyof T, object: T) => string | number
) {
  return getObjectKeys(object).reduce<{ [key in keyof T]: any }>((acc, key) => {
    acc[key] = iterate(object[key] as T[keyof T], key as keyof T, object);
    return acc;
  }, {} as { [key in keyof T]: T[keyof T] });
}

export default mapValues;
