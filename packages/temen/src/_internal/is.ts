import { getType, JSTypes } from './getType';

const primitiveTypes: JSTypes[] = ['[object Boolean]', '[object String]', '[object Number]'];
export function isPrimitiveType(value: unknown) {
  return primitiveTypes.includes(getType(value));
}

export function isMap(value: unknown): value is Map<unknown, unknown> {
  return getType(value) === '[object Map]';
}

export function isSet(value: unknown): value is Set<unknown> {
  return getType(value) === '[object Set]';
}

type TypedArray =
  | Float32Array
  | Float64Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Uint8ClampedArray
  | BigInt64Array
  | BigUint64Array;
export function isTypedArray(value: unknown): value is TypedArray {
  const typedArrayTypeNames: JSTypes[] = [
    '[object BigInt64Array]',
    '[object BigUint64Array]',
    '[object Float32Array]',
    '[object Float64Array]',
    '[object Int16Array]',
    '[object Int32Array]',
    '[object Int8Array]',
    '[object Uint16Array]',
    '[object Uint32Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
  ];

  return typedArrayTypeNames.includes(getType(value));
}

export function isRegExp(value: any): value is RegExp {
  return value.constructor !== null && value.constructor === RegExp;
}
