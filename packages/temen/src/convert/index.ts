/**
 * 첫 번째 인자가 nullish(null, undefined)값이 아닌 경우 formatter 함수의 결과를, nullish 값일 경우는 첫 번째 인자를 그대로 반환합니다.
 *
 * formatter 함수의 인자는 반드시 존재한다는 것을 가정하고 작성할 수 있습니다.
 *
 * @example
 * ```ts
 * convert(1, (v) => String(v)); // '1'
 *
 * interface Foo {
 *   bar?: string;
 * }
 * const foo: Foo = {};
 * convert(foo.bar, v => v.toUpperCase()); // string | undefined
 * ```
 */
export function convert<T, V>(
  value: T,
  formatter: (value: NonNullable<T>) => V
): Extract<T, undefined | null> | V;
export function convert(value: null, formatter: (value: null) => unknown): null;
export function convert<T, V>(
  value: T,
  formatter: (value: NonNullable<T>) => V
): Extract<T, undefined | null> | V {
  return value == null ? (value as Extract<T, undefined | null>) : formatter(value!);
}
