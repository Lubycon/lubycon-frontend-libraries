import { isPrimitiveType } from '../_internal/isPrimitiveType';

export function isEqual<T>(a: unknown, b: T): a is T {
  if (a === b) {
    return true;
  }

  if (isPrimitiveType(a) && isPrimitiveType(b)) {
    return Object.is(a, b);
  }

  return true;
}
