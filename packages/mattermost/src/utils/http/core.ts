import { QueryParam, stringifyQueryParams } from 'temen';
import fetch from 'cross-fetch';
import { requestHandler, RequestOptions, responseHandler } from './handlers';

const getEndpoint = (baseURL: string, path: string, params?: QueryParam) => {
  const querystring = stringifyQueryParams(params);
  return /https?:\/\//.test(path) ? path : `${baseURL}${path}${querystring}`;
};

export type WithoutRequestBodyOptions = Omit<RequestOptions, 'body'>;
export const createInstance = ({ baseURL }: { baseURL: string }) => {
  const request = async <T>(path: string, options: RequestOptions) => {
    const response = await fetch(
      getEndpoint(baseURL, path, options.params),
      requestHandler(options)
    );
    return responseHandler<T>(response);
  };

  return {
    request,
    get: <T>(path: string, options?: WithoutRequestBodyOptions) =>
      request<T>(path, {
        ...options,
        method: 'GET',
      }),
    post: <T>(path: string, data: any, options?: WithoutRequestBodyOptions) =>
      request<T>(path, {
        ...options,
        method: 'POST',
        body: data,
      }),
    patch: <T>(path: string, data: any, options?: WithoutRequestBodyOptions) =>
      request<T>(path, {
        ...options,
        method: 'PATCH',
        body: data,
      }),
    put: <T>(path: string, data: any, options?: WithoutRequestBodyOptions) =>
      request<T>(path, {
        ...options,
        method: 'PUT',
        body: data,
      }),
    delete: <T>(path: string, options?: WithoutRequestBodyOptions) =>
      request<T>(path, {
        ...options,
        method: 'DELETE',
      }),
  };
};
