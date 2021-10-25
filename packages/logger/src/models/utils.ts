/** 제네릭으로 받은 맵의 키를 유지한 채 밸류의 타입을 Value로 변경합니다 */
export type TypeMap<T, Value> = {
  [K in keyof T]: Value;
};

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

/**
 * UUID를 생성해주는 함수입니다.
 *
 */

export function generateUUID() {
  // timeStmap
  let d = new Date().getTime();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16;
    r = (d + r) % 16 | 0;
    d = Math.floor(d / 16);

    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
