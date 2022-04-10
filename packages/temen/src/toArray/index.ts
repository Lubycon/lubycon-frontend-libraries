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

function toArray(value: boolean): [];
function toArray(value: number): [];
function toArray(value: string): string[];
function toArray<T>(value: Record<string, T>): T[];
function toArray<T>(value: any) {
  if (isObject(value)) return Object.values<T>(value);
  if (isString(value)) return value.split('');

  return [];
}

export default toArray;
