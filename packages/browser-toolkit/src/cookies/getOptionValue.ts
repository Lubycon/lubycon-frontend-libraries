import { identify } from 'temen';

export function getOptionValue<T>(key: string, v?: T | null): string;
export function getOptionValue<T, K>(
  key: string,
  v: T | undefined | null,
  parser: (v: T) => K
): string;
export function getOptionValue<T, K>(key: string, v?: T | null, parser?: (v: T) => K) {
  if (v == null) {
    return '';
  }

  const finalParser = parser ?? identify;
  const parsedValue = finalParser<T>(v);
  return `${key}=${parsedValue};`;
}
