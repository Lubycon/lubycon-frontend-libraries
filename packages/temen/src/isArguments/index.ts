/**
 * value가 arguments인지 확인
 *
 * @param {any} value 검사할 값
 * @returns {boolean} arguments이면 true 반환 아닌 경우 false 반환
 * @example
 *
 * ```js
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 * ```
 */

import { getType } from '../_internal/getType';

function isArguments(value: any): boolean {
  return getType(value) === '[object Arguments]';
}

export default isArguments;
