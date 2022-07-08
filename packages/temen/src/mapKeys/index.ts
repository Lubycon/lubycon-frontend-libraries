/**
 * "object"와 동일한 값을 가진 객체를 만들고 "iterate"를 통해
 * "object"의 각 열거형 문자열 키 속성을 이용해 새로운 생성된 키를 생성한합니다.
 *
 * 'object'의 키 속성을 'iterate'를 통해 문자열화합니다.
 * iterate는 세 가지 인수(value, key, object)로 호출됩니다.
 *
 * @param {Object} object 반복할 객체
 * @param {Function} iterate 반복당 호출 함수
 * @returns {Object} 키 값이 새로 매핑 된 객체
 *
 * @example
 * ```js
 * mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
 *   return key + value;
 * });
 * // => { 'a1': 1, 'b2': 2 }
 * ```
 */

import getObjectKeys from '../getObjectKeys';

function mapKeys<T>(
  object: T,
  iterate: (value: T[keyof T], key: keyof T, object: T) => string | number
) {
  return getObjectKeys(object).reduce<Record<string, T[keyof T]>>((acc, key) => {
    acc[iterate(object[key], key, object)] = object[key];
    return acc;
  }, {});
}

export default mapKeys;
