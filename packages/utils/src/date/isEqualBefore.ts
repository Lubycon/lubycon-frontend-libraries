import { subDays, subMonths, subYears, isEqual } from 'date-fns/esm';

export function isBeforeEqualSomeDays(date: Date, days: number) {
  const afterDate = subDays(date, days);
  return isEqual(date, afterDate);
}

export function isBeforeEqualSomeMonths(date: Date, months: number) {
  const afterDate = subMonths(date, months);
  return isEqual(date, afterDate);
}

export function isBeforeEqualSomeYears(date: Date, years: number) {
  const afterDate = subYears(date, years);
  return isEqual(date, afterDate);
}
