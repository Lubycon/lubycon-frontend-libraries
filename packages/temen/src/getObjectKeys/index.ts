/**
 * 객체의 키가 아닌 string을 반환하는 Object.keys 대신 사용할 수 있는 Type Safe한 함수입니다
 */
function getObjectKeys<T extends Record<string, any>>(object: T) {
  return Object.keys(object) as Array<keyof T>;
}

export default getObjectKeys;
