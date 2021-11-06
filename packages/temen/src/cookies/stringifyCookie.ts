import { getOptionValue } from './getOptionValue';

export type CookieValue = string | boolean | number;
export interface SetCookieOptions {
  expires?: Date;
  path?: string;
  domain?: string;
  maxAge?: number;
}

export function stringifyCookie<T extends CookieValue>(
  key: string,
  value: T,
  options: SetCookieOptions = {}
) {
  const cookieValue = `${key}=${encodeURIComponent(String(value))};`;

  if (options == null) {
    return cookieValue;
  }

  const { expires, path, domain, maxAge } = options;
  return `${cookieValue} ${getOptionValue('expires', expires, (v) =>
    v.toUTCString()
  )} ${getOptionValue('path', path)} ${getOptionValue('domain', domain)} ${getOptionValue(
    'max-age',
    maxAge
  )}`.trim();
}
