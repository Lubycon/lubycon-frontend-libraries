import { iif } from '../iif';

/**
 * 배열 내 지정된 인덱스에 위치한 원소를 새로운 원소로 변경하고 새로운 배열을 반환합니다.
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
  arr[targetIndex] = newItem;
  return arr;
}
