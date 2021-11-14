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
  | '[object Date]'
  | '[object Null]'
  | '[object Undefined]';

export function getType(value: unknown) {
  const toString = Object.prototype.toString;
  return toString.call(value) as JSTypes;
}
