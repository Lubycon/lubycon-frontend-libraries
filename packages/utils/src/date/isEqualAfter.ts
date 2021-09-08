import { addDays, addMonths, addYears, isEqual } from 'date-fns/esm';

export function isAfterEqualSomeDays(date: Date, days: number) {
  const afterDate = addDays(date, days);
  return isEqual(date, afterDate);
}

export function isAfterEqualSomeMonths(date: Date, months: number) {
  const afterDate = addMonths(date, months);
  return isEqual(date, afterDate);
}

export function isAfterEqualSomeYears(date: Date, years: number) {
  const afterDate = addYears(date, years);
  return isEqual(date, afterDate);
}
