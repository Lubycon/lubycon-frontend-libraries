type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/**
 * 인자로 받은 객체를 `[key, value]`의 배열로 변경하여 반환합니다.
 *
 * Object.entries 메소드와 동일한 동작을 제공하지만, 객체의 key를 `string`으로 추론하지 않고 `keyof T`로 더 정밀하게 추론합니다.
 *
 * @example
 * ```ts
 * const foo = { name: 'john', age: 31 };
 * entries(foo); // [['name', 'john'], ['age', 31]]
 * ```
 */
export function entries<T>(object: T) {
  return Object.entries(object) as Entries<T>;
}
