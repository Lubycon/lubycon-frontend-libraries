/**
 * 오브젝트를 깊은 복사합니다.
 *
 * @param {T} value 복제 할 값
 * @returns {T} 복제 된 값
 *
 * @example
 * ```js
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 * ```
 */

function cloneDeep<T>(value: T): T;
function cloneDeep(value: any) {
  for (const { copy } of copies) {
    if (copy(value)) {
      return copy(value);
    }
  }

  return value;
}

const copies = [
  { copy: copyDate },
  { copy: copySet },
  { copy: copyMap },
  { copy: copyArray },
  { copy: copySymbol },
  { copy: copyTypedArray },
  { copy: copyObject },
];

function copyDate(value: any) {
  if (!(value instanceof Date)) {
    return null;
  }

  return new Date(value.getTime());
}

function copySet(value: any) {
  if (!(value instanceof Set)) {
    return null;
  }

  const result = new Set();
  value.forEach((val) => {
    result.add(cloneDeep(val));
  });

  return result;
}

function copyMap(value: any) {
  if (!(value instanceof Map)) {
    return null;
  }

  const result = new Map();
  value.forEach((val, key) => {
    result.set(key, cloneDeep(val));
  });
  return result;
}

function copyArray(value: any) {
  if (!Array.isArray(value)) {
    return null;
  }

  return value.reduce((arr, item, i) => {
    arr[i] = cloneDeep(item);
    return arr;
  }, []);
}

function copySymbol(value: any) {
  if (typeof value !== 'symbol') {
    return null;
  }

  const strSymbol = String(value);
  const braketIndex = strSymbol.indexOf('(');
  const strValue = strSymbol.substr(braketIndex).replace(/\(|\)/g, '');
  return parseInt(strValue) ? Symbol(strValue) : Symbol(+strValue);
}

function copyObject(value: any) {
  const isObject = typeof value === 'object' && !Array.isArray(value) && value !== null;
  const isMapAndSet = value instanceof Map || value instanceof Set;
  if (!isObject) {
    return null;
  }
  if (isMapAndSet) {
    return null;
  }

  return Object.keys(value).reduce<Record<string, any>>((obj, key) => {
    obj[key] = cloneDeep(value[key]);
    return obj;
  }, {});
}

function copyTypedArray(value: any) {
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

  const typedArray = typedArrays.find((typedArray) => typedArray === value.constructor);

  if (!typedArray) return null;

  return new typedArray(value);
}

export default cloneDeep;
