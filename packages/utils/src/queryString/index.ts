export type QueryParamValue = string | number | boolean | undefined;
export type QueryParam = Record<string, QueryParamValue>;

/**
 * 맵을 인자로 받아서 쿼리스트링을 반환하는 함수입니다. 만약 맵 내부에 유효한 값이 없다면 빈 문자열을 반환합니다.
 *
 * @example
 * stringifyQueryParams({ foo: true, bar: 'hello', baz: '안녕' });
 * // '?foo=true&bar=hello&%EC%95%88%EB%85%95'
 *
 * stringifyQueryParams({ foo: undefined });
 * // ''
 */
export function stringifyQueryParams(params: QueryParam = {}) {
  const queryString = Object.entries(params)
    .filter(([, value]) => value != null)
    .map(([key, value]) => {
      const encodedValue = encodeURIComponent(value as NonNullable<QueryParamValue>);
      return `${key}=${encodedValue}`;
    });

  if (queryString.length === 0) {
    return '';
  }

  return `?${queryString.join('&')}`;
}

/**
 * 쿼리 스트링을 인자로 받아서 맵을 반환하는 함수입니다.
 * @example
 * parseQueryString('?foo=1&bar=%ED%95%98%EC%9D%B4');
 * // { foo: '1', bar: '하이' }
 */
export function parseQueryString(queryString: string) {
  const queryEntries = queryString.trim().replace(/^\?/, '').split('&');
  const queryParams = queryEntries.map((query) => query.split('='));

  return queryParams.reduce<Record<string, string | undefined>>((result, [key, value]) => {
    return {
      ...result,
      [key]: value ? decodeURIComponent(value) : undefined,
    };
  }, {});
}

/**
 * 쿼리스트링의 키를 기반으로 값을 가져옵니다. 만약 값이 존재하지 않을 경우 undefined가 반환됩니다.
 * 쿼리 스트링 맵은 location.search의 값을 인자로 받은 parseQueryString 함수의 결과 값입니다.
 *
 * @example
 * findQueryParamInClient('foo');
 * // location.search -> '?foo=1&bar=%ED%95%98%EC%9D%B4'
 * // '1'
 * // location.search -> '?bar=%ED%95%98%EC%9D%B4'
 * // undefined
 */
export function findQueryParamInClient(key: string) {
  const queryString = location != null ? location.search : '';
  const query = parseQueryString(queryString);

  return query[key];
}
