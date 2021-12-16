/**
 * 제네릭으로 받은 맵의 키를 유지한 채 밸류의 타입을 Value로 변경합니다
 */
export type TypeMap<T, Value> = {
  [K in keyof T]: Value;
};

/**
 * 제네릭으로 받은 맵의 키를 유지한 채 밸류의 타입을 nullable하게 변경합니다
 */
export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

/**
 * Promise<T> 타입을 T 타입으로 변환합니다
 */
export type UnwrapPromise<T> = T extends PromiseLike<infer U> ? UnwrapPromise<U> : T;

/**
 * Array<T> 타입을 T 타입으로 변환합니다
 */
export type UnwrapArray<T> = T extends Array<infer U> ? UnwrapArray<U> : T;
