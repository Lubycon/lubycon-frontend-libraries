import { parseQueryString } from 'temen';

/**
 * 쿼리스트링의 키를 기반으로 값을 가져옵니다. 만약 값이 존재하지 않을 경우 undefined가 반환됩니다.
 * 쿼리 스트링 맵은 location.search의 값을 인자로 받은 parseQueryString 함수의 결과 값입니다.
 *
 * @example
 * ```js
 * findQueryParamInClient('foo');
 * // location.search -> '?foo=1&bar=%ED%95%98%EC%9D%B4'
 * // '1'
 * // location.search -> '?bar=%ED%95%98%EC%9D%B4'
 * // undefined
 * ```
 */
export function findQueryParamInClient(key: string) {
  const queryString = location != null ? location.search : '';
  const query = parseQueryString(queryString);

  return query[key];
}
