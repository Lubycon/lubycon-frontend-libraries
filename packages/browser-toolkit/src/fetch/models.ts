export interface LubyconSuccessResponse<T> {
  headers: Record<string, string>;
  body: T;
  statusCode: number;
  statusText: string;
  status: 'success';
}

export interface LubyconErrorResponse {
  headers: Record<string, string>;
  body: null;
  statusCode: number;
  statusText: string;
  status: 'failed';
  reason?: string;
}

export type LubyconResponse<T> = LubyconSuccessResponse<T> | LubyconErrorResponse;
