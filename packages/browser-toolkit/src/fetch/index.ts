import fetch from 'cross-fetch';
import { LubyconResponse, requestHandler, RequestOptions, responseHandler } from './handlers';

export type WithoutRequestBodyOptions = Omit<RequestOptions, 'body'>;

export function createFetchInstance(baseUrl: string, options?: RequestOptions) {
  return {
    request: <T>(path: string) => doRequest<T>(`${baseUrl}/${path}`, options),
    get: <T>(path: string) => doGet<T>(`${baseUrl}/${path}`, options),
    post: <T>(path: string, data: any) => doPost<T>(`${baseUrl}/${path}`, data, options),
    patch: <T>(path: string, data: any) => doPatch<T>(`${baseUrl}/${path}`, data, options),
    put: <T>(path: string, data: any) => doPut<T>(`${baseUrl}/${path}`, data, options),
    delete: <T>(path: string) => doDelete<T>(`${baseUrl}/${path}`, options),
  };
}

/**
 * 모든 요청은 response와 함께 요청을 abort 시킬 수 있는 abort 메서드를 반환합니다
 *
 * @example
 * ```ts
 * import { doRequest } from 'browser-toolkit';
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

  const response = new Promise<LubyconResponse<T>>((resolve, reject) => {
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
