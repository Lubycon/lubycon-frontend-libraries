/**
 * UUID를 쉽게 생성해주는 함수입니다.
 *
 */

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 3) | 8;
    return v.toString(16);
  });
}
