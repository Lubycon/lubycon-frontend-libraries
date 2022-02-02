import { QueryParam } from 'temen';
import { Headers } from 'cross-fetch';
import { convertHeadersToObject, isSucceedResponse } from './utils';
import { LubyconResponse } from './models';

export async function responseHandler<T>(response: Response): Promise<LubyconResponse<T>> {
  const headers = convertHeadersToObject(response.headers);
  const defaultResponse = {
    headers,
    statusCode: response.status,
    statusText: response.statusText,
  };

  if (isSucceedResponse(response.status) === false) {
    return {
      ...defaultResponse,
      status: 'failed',
      reason: 'invalid_status_code',
      body: null,
    };
  }

  try {
    const body = await response.json();
    return { ...defaultResponse, status: 'success', body };
  } catch {
    return { ...defaultResponse, status: 'failed', reason: 'failed_json_parsing_body', body: null };
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
