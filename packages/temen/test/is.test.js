import {
  isBoolean,
  isNumber,
  isString,
  isNil,
  isPrimitiveType,
  isMap,
  isSet,
  isTypedArray,
  isRegExp,
} from '../src/is/index';

import { isArguments, isArrayBuffer, isArrayLike, isObjectLike } from '../src';

describe('is', () => {
  test('isArguments 함수는 반환값이 arguments이면 true를 반환한다', () => {
    expect(isArguments(arguments)).toBe(true);
    expect(isArguments([])).toBe(false);
    expect(isArguments({})).toBe(false);
    expect(isArguments(1)).toBe(false);
    expect(isArguments('')).toBe(false);
    expect(isArguments(null)).toBe(false);
    expect(isArguments(undefined)).toBe(false);
  });

  test('isArrayBuffer 함수는 ArrayBuffer 객체를 인자로 받으면 true, 아니면 false를 반환한다.', () => {
    expect(isArrayBuffer(new ArrayBuffer(1))).toBe(true);
    expect(isArrayBuffer([])).toBe(false);
    expect(isArrayBuffer({})).toBe(false);
    expect(isArrayBuffer(1)).toBe(false);
    expect(isArrayBuffer('')).toBe(false);
    expect(isArrayBuffer(null)).toBe(false);
    expect(isArrayBuffer(undefined)).toBe(false);
  });

  test('isArrayLike 함수는 인자로 받은 값이 유사 배열이면 true, 아니면 false를 반환한다.', () => {
    expect(isArrayLike([])).toBe(true);
    expect(isArrayLike({})).toBe(false);
    expect(isArrayLike(1)).toBe(false);
    expect(isArrayLike('')).toBe(true);
    expect(isArrayLike(null)).toBe(false);
    expect(isArrayLike(undefined)).toBe(false);
    expect(isArrayLike(Function)).toBe(false);
  });

  test('isObjectLike 함수는 인자로 받은 값이 object-like 이면 true, 아니면 false를 반환한다.', () => {
    expect(isObjectLike({})).toBe(true);
    expect(isObjectLike([])).toBe(true);
    expect(isObjectLike(1)).toBe(false);
    expect(isObjectLike('')).toBe(false);
    expect(isObjectLike(null)).toBe(false);
    expect(isObjectLike(undefined)).toBe(false);
    expect(isObjectLike(Function)).toBe(false);
  });

  test('isString 함수는 string 타입을 인자로 받으면 true, 아니면 false를 반환한다', () => {
    expect(isString('test')).toBe(true);
    expect(isString(1000)).toBe(false);
    expect(isString(true)).toBe(false);
  });

  test('isNumber 함수는 number 타입을 인자로 받으면 true, 아니면 false를 반환한다', () => {
    expect(isNumber('test')).toBe(false);
    expect(isNumber(1000)).toBe(true);
    expect(isNumber(true)).toBe(false);
  });

  test('isBoolean 함수는 boolean 타입을 인자로 받으면 true, 아니면 false를 반환한다', () => {
    expect(isBoolean('test')).toBe(false);
    expect(isBoolean(1000)).toBe(false);
    expect(isBoolean(true)).toBe(true);
  });
  test(`isNil은 value가 nullish한 값이면 true, 아니면 false를 반환한다. `, () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(void 0)).toBe(true);
    expect(isNil(NaN)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(undefined)).toBe(true);
  });
  test(`isPrimitiveType 함수는 인자로 받은 값이 원시 자료형이면 true, 아니면 false를 반환한다`, () => {
    expect(isPrimitiveType(null)).toBe(true);
    expect(isPrimitiveType(1)).toBe(true);
    expect(isPrimitiveType('')).toBe(true);
    expect(isPrimitiveType(false)).toBe(true);
    expect(isPrimitiveType(undefined)).toBe(true);
    expect(isPrimitiveType({})).toBe(false);
    expect(isPrimitiveType([])).toBe(false);
    expect(isPrimitiveType(new Date())).toBe(false);
    expect(isPrimitiveType(new Map())).toBe(false);
    expect(isPrimitiveType(new Int16Array())).toBe(false);
  });
  test(`isMap 함수는 인자로 받은 값이 Map이면 true, 아니면 false를 반환한다`, () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap({})).toBe(false);
  });
  test(`isSet 함수는 인자로 받은 값이 Set이면 true, 아니면 false를 반환한다`, () => {
    expect(isSet(new Set())).toBe(true);
    expect(isSet([])).toBe(false);
    expect(isSet(new Map())).toBe(false);
  });
  test(`isTypedArray 함수는 인자로 받은 값이 TypedArray이면 true, 아니면 false를 반환한다`, () => {
    expect(isTypedArray(new Int16Array())).toBe(true);
    expect(isTypedArray(new Uint16Array())).toBe(true);
    expect(isTypedArray(new BigInt64Array())).toBe(true);
    expect(isTypedArray(new Float32Array())).toBe(true);
    expect(isTypedArray(new ArrayBuffer())).toBe(false);
    expect(isTypedArray(new RegExp())).toBe(false);
    expect(isTypedArray([])).toBe(false);
  });
  test(`isRegExp 함수는 인자로 받은 값이 RegExp 객체이면 true, 아니면 false를 반환한다`, () => {
    expect(isRegExp(new RegExp('123'))).toBe(true);
    expect(isRegExp(/123/)).toBe(true);
    expect(isRegExp('')).toBe(false);
    expect(isRegExp(1)).toBe(false);
  });
});
