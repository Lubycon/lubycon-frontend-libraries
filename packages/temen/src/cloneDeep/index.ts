interface Constructable<T> {
  new (...args: any): T;
}
interface Obj {
  [key: string]: any;
}

type TypedArray =
  | Constructable<Int8Array>
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

type Value = Date &
  Set<any> &
  Map<string, any> &
  Array<any> &
  symbol &
  GenericTypedArray<TypedArray> &
  Obj;

interface GenericTypedArrayConstructor<T> {
  new (): T;
  new (buffer: GenericTypedArray<TypedArray>): T;
}

interface GenericTypedArray<T> {
  constructor: GenericTypedArrayConstructor<T>;
}

/**
 * 오브젝트를 깊은 복사합니다.
 *
 * @param {T} value 복제 할 값
 * @returns {T} 복제 된 값
 * @example
 *
 * ```ts
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 * ```
 */

function cloneDeep<T>(value: T): T;
function cloneDeep(value: Value) {
  for (const { copy, validation } of copyValidations) {
    if (validation(value)) {
      return copy(value);
    }
  }

  return value;
}

const isDate = (value: any) => value instanceof Date ?? false;
const isSet = (value: any) => value instanceof Set ?? false;
const isMap = (value: any) => value instanceof Map ?? false;
const isSymbol = (value: any) => typeof value === 'symbol' ?? false;
const isObject = (value: any) =>
  typeof value === 'object' && !Array.isArray(value) && value !== null;
const isTypedArray = (value: any) => {
  const typedArrays = [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
  ];

  return typedArrays.some((typedArray) => typedArray === value.constructor);
};

const copyValidations = [
  { validation: isDate, copy: copyDate },
  { validation: isSet, copy: copySet },
  { validation: isMap, copy: copyMap },
  { validation: Array.isArray, copy: copyArray },
  { validation: isSymbol, copy: copySymbol },
  { validation: isTypedArray, copy: copyTypedArray },
  { validation: isObject, copy: copyObject },
];

function copyDate(value: Date) {
  return new Date(value.getTime());
}

function copySet<T>(value: Set<T>) {
  const result = new Set();
  value.forEach((val) => {
    result.add(cloneDeep(val));
  });

  return result;
}

function copyMap(value: Map<string, any>) {
  const result = new Map();
  value.forEach((val, key) => {
    result.set(key, cloneDeep(val));
  });
  return result;
}

function copyArray(value: Array<any>) {
  return value.reduce((arr, item, i) => {
    arr[i] = cloneDeep(item);
    return arr;
  }, []);
}

function copySymbol(value: symbol) {
  const strSymbol = String(value);
  const braketIndex = strSymbol.indexOf('(');
  const strValue = strSymbol.substr(braketIndex).replace(/\(|\)/g, '');
  return parseInt(strValue) ? Symbol(+strValue) : Symbol(strValue);
}

function copyObject(value: Obj) {
  return Object.keys(value).reduce<Record<string, any>>((obj, key) => {
    obj[key] = cloneDeep(value[key]);
    return obj;
  }, {});
}

function copyTypedArray(value: GenericTypedArray<TypedArray>) {
  return new value.constructor(value);
}

export default cloneDeep;
