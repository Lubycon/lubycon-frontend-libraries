import { QueryParam } from '@lubycon/utils';
import { Headers } from 'cross-fetch';
import { convertHeadersToObject } from './utils';

export interface LubyconResponse<T> {
  headers: Record<string, string>;
  data: T | null;
  status: number;
  statusText: string;
}
export async function responseHandler<T>(response: Response): Promise<LubyconResponse<T>> {
  const headers = convertHeadersToObject(response.headers);
  const defaultResponse = {
    headers,
    status: response.status,
    statusText: response.statusText,
  };
  try {
    const data = await response.json();
    return { ...defaultResponse, data };
  } catch {
    return { ...defaultResponse, data: null };
  }
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
  const body =
    contentType === 'application/json' && rawBody != null ? JSON.stringify(rawBody) : rawBody;

  return {
    ...options,
    headers,
    body,
  };
}
