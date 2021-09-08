import { isEqual, isBefore, isAfter } from 'date-fns/esm';

export function isBeforeOrEqual(date1: Date, date2: Date) {
  return isEqual(date1, date2) || isBefore(date1, date2);
}

export function isAfterOrEqual(date1: Date, date2: Date) {
  return isEqual(date1, date2) || isAfter(date1, date2);
}
