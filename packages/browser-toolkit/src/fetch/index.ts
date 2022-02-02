import fetch from 'cross-fetch';
import { requestHandler, RequestOptions, responseHandler } from './handlers';

export type WithoutRequestBodyOptions = Omit<RequestOptions, 'body'>;

export function createFetchInstance(baseUrl: string, options?: RequestOptions) {
  return {
    request: <T>(path: string, additionalOptions?: RequestOptions) =>
      doRequest<T>(`${baseUrl}${path}`, { ...options, ...additionalOptions }),
    get: <T>(path: string, additionalOptions?: RequestOptions) =>
      doGet<T>(`${baseUrl}${path}`, { ...options, ...additionalOptions }),
    post: <T>(path: string, data: any, additionalOptions?: RequestOptions) =>
      doPost<T>(`${baseUrl}${path}`, data, { ...options, ...additionalOptions }),
    patch: <T>(path: string, data: any, additionalOptions?: RequestOptions) =>
      doPatch<T>(`${baseUrl}${path}`, data, { ...options, ...additionalOptions }),
    put: <T>(path: string, data: any, additionalOptions?: RequestOptions) =>
      doPut<T>(`${baseUrl}${path}`, data, { ...options, ...additionalOptions }),
    delete: <T>(path: string, additionalOptions?: RequestOptions) =>
      doDelete<T>(`${baseUrl}${path}`, { ...options, ...additionalOptions }),
  };
}

/**
 * 모든 요청은 header, status, data를 담은 response를 반환합니다.
 *
 * @example
 * ```ts
 * import { doRequest } from 'browser-toolkit';
 *
 * const correctFetch = async () => {
 *  const URL = 'https://pokeapi.co/api/v2/pokemon'
 *  const response = await doRequest(URL);
 * };
 *
 * const wrongFetch = async () => {
 *  const WRONG_URL = 'https://pokeapi.co/api/v2/pokekemon';
 *  const response = await doRequest(WRONG_URL);
 *  console.log(response.data)   // 요청이 실패한 경우 response의 data 프로퍼티는 null을 반환합니다
 * };
 *
 * const abortController = new AbortController();
 * doRequest(URL, { signal: abortController.signal }).then((response) => {
 *  console.log(response);
 * });
 * abortController.abort();   // abort 메서드를 통해 pending 상태인 fetch 요청을 취소시킬 수 있습니다
 * ```
 */

export async function doRequest<T>(url: string, options?: RequestOptions) {
  const response = await fetch(url, requestHandler({ ...options }));
  const lubyconResponse = await responseHandler<T>(response);

  if (lubyconResponse.status === 'failed') {
    throw lubyconResponse;
  }

  return lubyconResponse;
}

export function doGet<T>(url: string, options?: WithoutRequestBodyOptions) {
  return doRequest<T>(url, { ...options, method: 'GET' });
}

export function doPost<T>(url: string, data: any, options?: WithoutRequestBodyOptions) {
  return doRequest<T>(url, { ...options, method: 'POST', body: data });
}

export function doPatch<T>(url: string, data: any, options?: WithoutRequestBodyOptions) {
  return doRequest<T>(url, { ...options, method: 'PATCH', body: data });
}

export function doPut<T>(url: string, data: any, options?: WithoutRequestBodyOptions) {
  return doRequest<T>(url, { ...options, method: 'PUT', body: data });
}

export function doDelete<T>(url: string, options?: WithoutRequestBodyOptions) {
  return doRequest<T>(url, { ...options, method: 'DELETE' });
}
