import { QueryParam, stringifyQueryParams } from 'temen';

export function getEndpoint(baseURL: string, path: string, params?: QueryParam) {
  const querystring = stringifyQueryParams(params);
  return /https?:\/\//.test(path) ? path : `${baseURL}${path}${querystring}`;
}

export function convertHeadersToObject(headers: Headers) {
  const data: Record<string, string> = {};
  headers.forEach((value, key) => {
    data[key] = value;
  });

  return data;
}

export function isSucceedResponse(status: number) {
  return status >= 200 && status < 400;
}
