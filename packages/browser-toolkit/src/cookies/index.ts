import { identify } from 'temen';
import { parseCookies } from './parseCookies';
import { CookieValue, SetCookieOptions, stringifyCookie } from './stringifyCookie';

/**
 * 쿠키에 값을 세팅합니다. expires, path 등의 쿠키 옵션을 사용할 수 있습니다.
 *
 * @example
 * ```ts
 * setCookie('foo', 1);
 * setCookie('foo', 1, { expires: new Date(2022, 1, 15) });
 * ```
 */
export function setCookie<T extends CookieValue>(
  key: string,
  value: T,
  options?: SetCookieOptions
) {
  document.cookie = stringifyCookie(key, value, options);
}

/**
 * 전체 쿠키를 가져옵니다. 만약 쿠키가 없는 경우에는 빈 객체를 반환합니다.
 *
 * @example
 * ```ts
 * const { foo } = getCookies();
 * console.log(foo);
 * ```
 */
export function getCookies() {
  return parseCookies(document.cookie);
}

/**
 * 인자로 주어진 key에 해당하는 쿠키를 가져옵니다. 만약 해당 쿠키가 존재하지 않는 경우 undefined를 반환합니다.
 *
 * @example
 * ```ts
 * const foo = getCookie('foo'); // string | undefined;
 * const foo = getCookie('foo', Number); // number | undefined;
 * const foo = getCookie('foo', v => [v]) // string[] | undefined;
 * ```
 */
export function getCookie<T extends string>(key: string): T | undefined;
export function getCookie<T>(key: string, parser: (v: string) => T): T | undefined;
export function getCookie<T = string>(key: string, parser?: (v: string) => T) {
  const cookies = getCookies();
  const value = cookies[key];
  if (value == null) {
    return undefined;
  }

  const finalParser = parser ?? identify;
  return finalParser(value);
}
