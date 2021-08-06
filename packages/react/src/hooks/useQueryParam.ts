import { parseQueryString } from '@lubycon/utils';
import { useMemo } from 'react';

/**
 * 쿼리스트링의 키를 기반으로 값을 가져옵니다. 만약 값이 존재하지 않을 경우 undefined가 반환됩니다.
 *
 * @example
 * // https://lubycon.io?foo=1&bar=hello
 * const foo = useQueryParam('foo', Number) ?? -1; // number | undefined
 * const bar = useQueryParam('bar'); // string | undefined
 * const baz = useQueryParam('baz') ?? 'empty'; // string
 */
export function useQueryParam<T extends string = string>(key: string): T | undefined;
export function useQueryParam<T>(key: string, parser: (value: string) => T): T | undefined;
export function useQueryParam<T = string>(key: string, parser?: (value: string) => T) {
  return useMemo(() => {
    const queryString = location != null ? location.search : '';
    const query = parseQueryString(queryString);

    const value = query[key];
    if (value == null) {
      return undefined;
    }

    return parser != null ? parser(value) : query[key];
  }, []);
}
