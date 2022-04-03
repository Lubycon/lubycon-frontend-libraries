/**
 * `value`를 배열로 변환합니다.
 *
 * @param {*} value 배열로 변환할 값
 * @returns {Array} 변환된 배열을 반환합니다.
 * @example
 *
 * toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * toArray(1);
 * // => []
 *
 * toArray(null);
 * // => []
 */

import { isString } from '../is';
import isObject from '../isObject';

interface Obj {
  [key: string]: any;
}

function toArray(value: string): Array<string>;
function toArray(value: Obj): Array<any>;
function toArray(value: any) {
  if (isObject(value)) return Object.values(value);
  if (isString(value)) return value.split('');

  return [];
}

export default toArray;
