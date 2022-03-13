/**
 * @jest-environment jsdom
 */

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

import {
  isArguments,
  isArrayBuffer,
  isArrayLike,
  isObjectLike,
  isBuffer,
  isDate,
  isEqualWith,
  isFunction,
  isError,
  isElement,
  isNull,
  isObject,
  isPlainObject,
  isFinite,
  isInteger,
  isMatch,
  isSymbol,
  isWeakMap,
  isWeakSet,
  isNative,
} from '../src';

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
  test(`isBuffer 함수는 인자로 받은 값이 Buffer 객체이면 true, 아니면 false를 반환한다`, () => {
    expect(isBuffer(Buffer.from('123'))).toBe(true);
    expect(isBuffer(Buffer.alloc(10))).toBe(true);
    expect(isBuffer(Buffer.allocUnsafe(10))).toBe(true);
    expect(isBuffer(Buffer.allocUnsafeSlow(10))).toBe(true);
    expect(isBuffer('')).toBe(false);
    expect(isBuffer(1)).toBe(false);
  });
  test(`isDate 함수는 인자로 받은 값이 Date 객체이면 true, 아니면 false를 반환한다`, () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date('random string'))).toBe(true);
    expect(isDate('2021-12-31')).toBe(false);
  });
  test(`isEqualWith 함수는 인자로 받은 값을 cutomizer로 비교 후 true, 아니면 false를 반환한다`, () => {
    expect(isEqualWith(1, 1, (a, b) => a === b)).toBe(true);
    expect(isEqualWith(1, 2, (a, b) => a + 1 === b)).toBe(true);
    expect(isEqualWith(1, 2, (a, b) => a === b)).toBe(false);
  });
  test(`isFunction 함수는 인자로 받은 값이 function 이면 true, 아니면 false를 반환한다.`, () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(/abc/)).toBe(false);
  });
  test(`isError 함수는 인자로 받은 값이 Error 객체 이면 true, 아니면 false를 반환한다.`, () => {
    expect(isError(new Error())).toBe(true);
    expect(isError(new TypeError())).toBe(true);
    expect(isError(new SyntaxError())).toBe(true);
    expect(isError(new ReferenceError())).toBe(true);
    expect(isError(new RangeError())).toBe(true);
    expect(isError(new URIError())).toBe(true);
    expect(isError(new EvalError())).toBe(true);
    expect(isError(Error)).toBe(false);
  });
  test(`isElement 함수는 인자로 받은 값이 Element 객체이면 true 아니면 false를 반환한다.`, () => {
    expect(isElement(document.createElement('div'))).toBe(true);
  });
  test(`isNull 함수는 인자로 받은 값이 null 이면 true 아니면 false를 반환한다`, () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(NaN)).toBe(false);
    expect(isNull(false)).toBe(false);
  });
  test(`isObject 함수는 인자로 받은 값이 오브젝트의 언어타입인 확인한다.`, () => {
    expect(isObject({})).toBe(true);
    expect(isObject([1, 2, 3])).toBe(true);
    expect(isObject(null)).toBe(false);
  });
  test(`isPlainObject 함수는 인자로 받은 값이  plane object 인지 확인한다.`, () => {
    function Foo() {
      this.a = 1;
    }
    expect(isPlainObject(new Foo())).toBe(false);
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
  });
  test(`isFinite 함수는 인자로 받은 값이 유한한 숫자이면 true 아니면 false를 반환한다.`, () => {
    expect(isFinite(0)).toBe(true);
    expect(isFinite(1)).toBe(true);
    expect(isFinite(-1)).toBe(true);
    expect(isFinite(Infinity)).toBe(false);
    expect(isFinite(-Infinity)).toBe(false);
    expect(isFinite(NaN)).toBe(false);
  });
  test(`isInteger 함수는 인자로 받은 값이 정수이면 true 아니면 false를 반환한다.`, () => {
    expect(isInteger(0)).toBe(true);
    expect(isInteger(1)).toBe(true);
    expect(isInteger(-1)).toBe(true);
    expect(isInteger(1.1)).toBe(false);
    expect(isInteger(-1.1)).toBe(false);
    expect(isInteger(Infinity)).toBe(false);
    expect(isInteger(-Infinity)).toBe(false);
    expect(isInteger(NaN)).toBe(false);
  });
  test(`isMatch 함수는 인자로 받은 'object'에 'source'가 존재 하는지 깊은 비교하여 'source'가 존재하면 true 아니면 false를 반환한다.`, () => {
    expect(isMatch({ a: 1, b: 2 }, { a: 1 })).toBe(true);
    expect(isMatch({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isMatch({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    expect(isMatch({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(false);
    expect(isMatch({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
  });
  test(`isSymbol 함수는 인자로 받은 값이 symbol 이면 true 아니면 false를 반환한다.`, () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol.iterator)).toBe(true);
    expect(isSymbol('abc')).toBe(false);
  });
  test(`isWeakMap 함수는 인자로 받은 값이 WeakMap 객체이면 true 아니면 false를 반환한다`, () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
    expect(isWeakMap(new Map())).toBe(false);
  });
  test(`isWeakSet 함수는 인자로 받은 값이 WeakSet 객체이면 true 아니면 false를 반환한다`, () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
    expect(isWeakSet(new Set())).toBe(false);
  });
  test(`isNative 함수는 인자로 받은 값이 native function 이면 true 아니면 false를 반환한다`, () => {
    expect(isNative(Array.prototype.push)).toBe(true);
    expect(isNative(Object.create)).toBe(true);
    expect(isNative(function () {})).toBe(false);
  });
});
