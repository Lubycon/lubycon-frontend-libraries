import { getType, JSTypes } from './getType';

const primitiveTypes: JSTypes[] = ['[object Boolean]', '[object String]', '[object Number]'];
export function isPrimitiveType(value: unknown) {
  return primitiveTypes.includes(getType(value));
}
