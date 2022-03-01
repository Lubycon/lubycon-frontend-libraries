import isEqual from 'date-fns/isEqual';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';

/**
 * 첫 번째 인자로 주어진 날짜가 두 번째 인자로 주어진 날짜와 같거나 과거인지 확인합니다.
 *
 * @example
 * ```js
 * isBeforeOrEqual(new Date(2021, 8, 9), new Date(2021, 8, 9)); // true
 * isBeforeOrEqual(new Date(2021, 8, 1), new Date(2021, 8, 9)); // true
 * ```
 */
export function isBeforeOrEqual(date1: Date, date2: Date) {
  return isEqual(date1, date2) || isBefore(date1, date2);
}

/**
 * 첫 번째 인자로 주어진 날짜가 두 번째 인자로 주어진 날짜와 같거나 미래인지 확인합니다.
 *
 * @example
 * ```js
 * isAfterOrEqual(new Date(2021, 8, 9), new Date(2021, 8, 9)); // true
 * isAfterOrEqual(new Date(2021, 8, 31), new Date(2021, 8, 9)); // true
 * ```
 */
export function isAfterOrEqual(date1: Date, date2: Date) {
  return isEqual(date1, date2) || isAfter(date1, date2);
}
