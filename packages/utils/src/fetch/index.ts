import fetch from 'cross-fetch';
import { requestHandler, RequestOptions, responseHandler } from './handlers';

export type WithoutRequestBodyOptions = Omit<RequestOptions, 'body'>;

export function createFetchInstance(baseUrl: string, options?: RequestOptions) {
  return {
    request: (path: string) => doRequest(`${baseUrl}/${path}`, options),
    get: (path: string) => doGet(`${baseUrl}/${path}`, options),
    post: (path: string, data: any) => doPost(`${baseUrl}/${path}`, data, options),
    patch: (path: string, data: any) => doPatch(`${baseUrl}/${path}`, data, options),
    put: (path: string, data: any) => doPut(`${baseUrl}/${path}`, data, options),
    delete: (path: string) => doDelete(`${baseUrl}/${path}`, options),
  };
}

/**
 * 모든 요청은 response와 함께 요청을 abort 시킬 수 있는 abort 메서드를 반환합니다
 *
 * @example
 * ```ts
 * import { doRequest } from '@lubycon/utils';
 *
 * const URL = 'https://pokeapi.co/api/v2/pokemon'
 * const { response, abort: abortFetchPokemon } = doRequest(URL);
 *
 * response.then((data) => console.log(data));      // response는 pending 상태인 Promise를 반환합니다
 * abortFetchPokemon();     // abort 메서드를 통해 pending 상태인 fetch 요청을 취소시킬 수 있습니다
 * ```
 */

export function doRequest<T>(url: string, options?: RequestOptions) {
  const controller = new AbortController();

  const response = new Promise((resolve, reject) => {
    fetch(url, requestHandler({ ...options, signal: controller.signal }))
      .then((result) => resolve(responseHandler<T>(result)))
      .catch((err) => reject(err));
  });

  return { response, abort: () => controller.abort() };
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
