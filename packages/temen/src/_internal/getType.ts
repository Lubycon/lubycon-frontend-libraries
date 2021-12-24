export type JSTypes =
  | '[object String]'
  | '[object Boolean]'
  | '[object Number]'
  | '[object Object]'
  | '[object Array]'
  | '[object Symbol]'
  | '[object Function]'
  | '[object Map]'
  | '[object WeakMap]'
  | '[object Set]'
  | '[object WeakSet]'
  | '[object Float32Array]'
  | '[object Float64Array]'
  | '[object Int8Array]'
  | '[object Int16Array]'
  | '[object Int32Array]'
  | '[object Uint8Array]'
  | '[object Uint16Array]'
  | '[object Uint32Array]'
  | '[object Uint8ClampedArray]'
  | '[object BigInt64Array]'
  | '[object BigUint64Array]'
  | '[object RegExp]'
  | '[object Date]'
  | '[object Null]'
  | '[object Undefined]'
  | '[object Arguments]';

export type TypedArray =
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

export const primitiveTypes: JSTypes[] = [
  '[object Boolean]',
  '[object String]',
  '[object Number]',
  '[object Null]',
  '[object Undefined]',
];

export const typedArrayTypeNames: JSTypes[] = [
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

export function getType(value: unknown) {
  const toString = Object.prototype.toString;
  return toString.call(value) as JSTypes;
}
