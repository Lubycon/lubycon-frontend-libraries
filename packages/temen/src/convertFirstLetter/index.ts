import { convertFirstLetter } from '../_internal/convertFirstLetter';

/**
 * 주어진 문자열의 첫 번째 문자를 소문자로 변경합니다
 *
 * @example
 * ```ts
 * lowerFirstLetter('FRED'); // fRED
 * ```
 */
export function lowerFirstLetter(text: string) {
  return convertFirstLetter(text, (char) => char.toLowerCase());
}

/**
 * 주어진 문자열의 첫 번째 문자를 대문자로 변경합니다
 *
 * @example
 * ```ts
 * upperFirstLetter('fred'); // Fred
 * ```
 */
export function upperFirstLetter(text: string) {
  return convertFirstLetter(text, (char) => char.toUpperCase());
}
