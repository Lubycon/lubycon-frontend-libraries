import { upperFirstLetter } from '../convertFirstLetter';
import { splitByUpperCase } from '../_internal/convertSpecialCharacters';

/**
 * 인자로 받은 문자열을 Parscal Case로 변환합니다.
 *
 * splitter 인자에 아무런 값을 주지 않을 경우 공백, -, _ 기준으로 단어를 구분합니다.
 *
 * @example
 * ```ts
 * parscalCase('fooBar'); // FooBar
 * parscalCase('foo-bar'); // FooBar
 * parscalCase('foo&bar', ['&']); // FooBar
 * ```
 */
export function parscalCase(text: string, splitter = [' ', '-', '_']) {
  return upperFirstLetter(splitByUpperCase(text, splitter));
}
