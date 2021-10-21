/**
 * UUID를 생성해주는 함수입니다.
 *
 */

export function generateUUID(): string {
  // timeStmap
  let d = new Date().getTime();
  // 페이지 로드 후 microseconds
  let d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }

    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
