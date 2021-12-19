import { findQueryParamInClient } from 'browser-toolkit';
import { useState, useEffect } from 'react';

/**
 * 쿼리스트링의 키를 기반으로 값을 가져옵니다. 만약 값이 존재하지 않을 경우 undefined가 반환됩니다.
 * SSR의 Hydration Mismatch를 방지하기 위해 처음에는 undefined를 반환하고 mounted 이후에 해당 값의 존재 여부에 따른 결과 값을 반환합니다.
 *
 * @example
 * // https://lubycon.io?foo=1&bar=hello
 * const foo = useQueryParam('foo', Number) ?? -1; // number
 * const bar = useQueryParam('bar'); // string | undefined
 * const baz = useQueryParam('baz') ?? 'empty'; // string
 */
export default function useQueryParam<T extends string = string>(key: string): T | undefined;
export default function useQueryParam<T>(key: string, parser: (value: string) => T): T | undefined;
export default function useQueryParam<T = string>(key: string, parser?: (value: string) => T) {
  const [queryParam, setQueryParam] = useState<string | T | undefined>(undefined);

  useEffect(() => {
    const value = findQueryParamInClient(key);

    if (value === undefined) {
      setQueryParam(undefined);
    } else {
      setQueryParam(parser != null ? parser(value) : value);
    }
  }, []);

  return queryParam;
}
