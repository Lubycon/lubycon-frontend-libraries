/**
 * `value`를 배열로 변환합니다.
 *
 * @param {*} value 배열로 변환할 값
 * @returns {Array} 변환된 배열을 반환합니다.
 * @example
 *
 * _.toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * _.toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * _.toArray(1);
 * // => []
 *
 * _.toArray(null);
 * // => []
 */

import { isString } from '../is';
import isObject from '../isObject';

function toArray(value: any) {
  if (isObject(value)) return Object.values(value);
  if (isString(value)) return value.split('');

  return [];
}

export default toArray;
