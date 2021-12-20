import { findQueryParamInClient } from 'browser-toolkit';
import { useMemo } from 'react';

/**
 * 쿼리스트링의 키를 기반으로 값을 가져옵니다. 만약 값이 존재하지 않을 경우 undefined가 반환됩니다.
 * useClienQueryParam은 mounted 시점과 관계없이 결과 값을 바로 반환합니다.
 *
 * @example
 * // https://lubycon.io?foo=1&bar=hello
 * const foo = useClientQueryParam('foo', Number) ?? -1; // number
 * const bar = useClientQueryParam('bar'); // string | undefined
 * const baz = useClientQueryParam('baz') ?? 'empty'; // string
 */

export default function useClientQueryParam<T extends string = string>(key: string): T | undefined;
export default function useClientQueryParam<T>(
  key: string,
  parser: (value: string) => T
): T | undefined;
export default function useClientQueryParam<T = string>(
  key: string,
  parser?: (value: string) => T
) {
  return useMemo(() => {
    const value = findQueryParamInClient(key);

    if (value === undefined) {
      return undefined;
    }

    return parser != null ? parser(value) : value;
  }, [key, parser]);
}
