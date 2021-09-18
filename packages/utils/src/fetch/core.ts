import fetch from 'cross-fetch';
import { requestHandler, RequestOptions, responseHandler } from './handlers';

export type WithoutRequestBodyOptions = Omit<RequestOptions, 'body'>;

export function createInstance(baseUrl: string, options: RequestOptions) {
  return {
    request: (path: string) => doRequest(`${baseUrl}/${path}`, options),
    get: (path: string) => doGet(`${baseUrl}/${path}`, options),
    post: (path: string, data: any) => doPost(`${baseUrl}/${path}`, data, options),
    patch: (path: string, data: any) => doPatch(`${baseUrl}/${path}`, data, options),
    put: (path: string, data: any) => doPut(`${baseUrl}/${path}`, data, options),
    delete: (path: string) => doDelete(`${baseUrl}/${path}`, options),
  };
}

export async function doRequest<T>(url: string, options?: RequestOptions) {
  const controller = new AbortController();
  const response = async () => {
    const result = await fetch(url, requestHandler({ ...options, signal: controller.signal }));
    return responseHandler<T>(result);
  };

  return { response, abort: controller.abort };
}

export function doGet<T>(url: string, options: WithoutRequestBodyOptions) {
  doRequest<T>(url, { ...options, method: 'GET' });
}

export function doPost<T>(url: string, data: any, options: WithoutRequestBodyOptions) {
  doRequest<T>(url, { ...options, method: 'POST', body: data });
}

export function doPatch<T>(url: string, data: any, options: WithoutRequestBodyOptions) {
  doRequest<T>(url, { ...options, method: 'PATCH', body: data });
}

export function doPut<T>(url: string, data: any, options: WithoutRequestBodyOptions) {
  doRequest<T>(url, { ...options, method: 'PUT', body: data });
}

export function doDelete<T>(url: string, options: WithoutRequestBodyOptions) {
  doRequest<T>(url, { ...options, method: 'DELETE' });
}
