import { iif } from '../iif';

/**
 * 배열 내 지정된 인덱스에 위치한 원소를 새로운 원소로 변경하고 새로운 배열을 반환합니다. 대상 배열은 얕은 복사 되기 때문에 내부 원소들의 레퍼런스는 변하지 않습니다.
 */
export function replaceItem<T>(arr: T[], targetIndex: number, newItem: T) {
  return arr.map((item, index) => {
    return iif(index === targetIndex, newItem, item);
  });
}

/**
 * 배열 내 지정된 인덱스에 위치한 원소를 새로운 원소로 변경하고 원본 배열을 반환합니다.
 */
export function preserveRefReplaceItem<T>(arr: T[], targetIndex: number, newItem: T) {
  if (targetIndex < 0 || targetIndex > arr.length - 1) {
    throw new Error('targetIndex의 값이 유효하지 않습니다.');
  }
  arr[targetIndex] = newItem;
  return arr;
}
