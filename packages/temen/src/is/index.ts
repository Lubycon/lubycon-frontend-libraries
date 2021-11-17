import { getType, primitiveTypes, TypedArray, typedArrayTypeNames } from '../_internal/getType';

/**
 * 타입가드를 편하게 사용할 수 있는 유틸 함수 입니다.
 *
 * 하지만 타입 가딩을 하는 타입이 string | number <=> string과 같은 서브타입 관계가 아니더라도, 이 함수는 그대로 타입가드를 적용하기 때문에 Type Safely하지 않은 상황이 발생할 수 있습니다.
 *
 * 이 함수를 사용하면 반드시 타입 가딩 이후에 타입이 어떻게 평가되었는지 확인해주세요.
 */
export function is<T>(value: unknown, validator: (v: unknown) => boolean): value is T {
  return validator(value);
}

/**
 * 인자로 받은 값이 String 타입인지 여부를 반환합니다.
 *
 * @example
 * ```ts
 * isString('foo'); // true
 * ```
 */
export function isString(value: unknown): value is string {
  return getType(value) === '[object String]';
}

/**
 * 인자로 받은 값이 Number 타입인지 여부를 반환합니다.
 *
 * @example
 * ```ts
 * isNumber(-1); // true
 * ```
 */
export function isNumber(value: unknown): value is number {
  return getType(value) === '[object Number]';
}

/**
 * 인자로 받은 값이 Boolean 타입인지 여부를 반환합니다.
 *
 * @example
 * ```ts
 * isBoolean(false); // true
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return getType(value) === '[object Boolean]';
}

/**
 * isNil 은 value가 null, undefined 인지 확인해주는 함수입니다.
 *
 * @example
 * ```ts
 * isNil(null); // true
 * isNil(void 0); // true
 * isNil(NaN); // false
 * ```
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * 인자로 받은 값이 원시 자료형인지 여부를 반환합니다.
 *
 * @example
 * ```ts
 * isPrimitiveType('') // true
 * isPrimitiveType(1) // true
 * isPrimitiveType(false) // true
 * isPrimitiveType(NaN) // true
 * isPrimitiveType({}) // false
 * isPrimitiveType([]) // false
 * ```
 */
export function isPrimitiveType(
  value: unknown
): value is string | boolean | number | null | undefined {
  return primitiveTypes.includes(getType(value));
}

/**
 * 인자로 받은 값이 Map인지 여부를 반환합니다.
 *
 * @example
 * ```ts
 * const map = new Map();
 * isMap(map); // true
 * ```
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return getType(value) === '[object Map]';
}

/**
 * 인자로 받은 값이 Set인지 여부를 반환합니다.
 *
 * @example
 * ```ts
 * const set = new Set();
 * isSet(set); // true
 * ```
 */
export function isSet(value: unknown): value is Set<unknown> {
  return getType(value) === '[object Set]';
}

/**
 * 인자로 받은 값이 TypedArray인지 여부를 반환합니다.
 *
 * @example
 * ```ts
 * const arr = new Int16Array();
 * isTypedArray(arr); // true
 * ```
 */
export function isTypedArray(value: unknown): value is TypedArray {
  return typedArrayTypeNames.includes(getType(value));
}

/**
 * 인자로 받은 값이 정규식 객체인지 여부를 반환합니다.
 *
 * @example
 * ```ts
 * const regex = /123/;
 * isRegExp(regex); // true
 * ```
 */
export function isRegExp(value: any): value is RegExp {
  return value.constructor !== null && value.constructor === RegExp;
}
