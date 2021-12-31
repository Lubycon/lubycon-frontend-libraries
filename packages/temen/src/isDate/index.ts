import { getType } from '../_internal/getType';

/**
 * value가 Date인지 확인합니다.
 *
 * @param {any} value 확인할 값
 * @returns {boolean} Returns value가 Date인지 여부
 * @example
 * ```js
 * isDate(new Date)
 * // => true
 *
 * isDate('2021-12-31')
 * // => false
 * ```
 */

function isDate(value: any): value is Date {
  return getType(value) === '[object Date]';
}

export default isDate;
