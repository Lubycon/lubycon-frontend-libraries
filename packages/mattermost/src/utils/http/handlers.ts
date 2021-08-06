import { QueryParam } from '@lubycon/utils';
import { convertHeadersToObject } from './headers';

export interface LubyconResponse<T> {
  headers: Record<string, string>;
  data: T;
}
export async function responseHandler<T>(response: Response): Promise<LubyconResponse<T>> {
  if (response.status >= 400) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return {
    headers: convertHeadersToObject(response.headers),
    data,
  };
}

export interface RequestOptions extends Omit<RequestInit, 'headers'> {
  params?: QueryParam;
  headers?: Record<string, string>;
}
export function requestHandler({
  headers: rawHeaders,
  body: rawBody,
  ...options
}: RequestOptions): RequestInit {
  const contentType = rawHeaders?.['Content-Type'] ?? 'application/json';

  const headers = new Headers(rawHeaders);
  const body = contentType && rawBody != null ? JSON.stringify(rawBody) : rawBody;

  return {
    ...options,
    headers,
    body,
  };
}
