/** 제네릭으로 받은 맵의 키를 유지한 채 밸류의 타입을 Value로 변경합니다 */
export type TypeMap<T, Value> = {
  [K in keyof T]: Value;
};

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
