import { replaceItem, preserveRefReplaceItem } from '../src/replaceItem';

describe('replaceItem', () => {
  it('replaceItem 함수는 특정 인덱스의 원소를 업데이트하고 새로운 배열을 반환한다.', function () {
    const array = [1, 2, 3];
    expect(replaceItem(array, 2, 5)).toStrictEqual([1, 2, 5]);
    expect(replaceItem(array, 2, 5)).not.toBe(array);
  });
  it('replaceItem 함수는 대상 배열을 얕은 복사한다.', function () {
    const array = [1, 2, 3];
    expect(replaceItem(array, 2, 5)[0]).toBe(array[0]);
  });
  it('preserveRefReplaceItem 함수는 특정 인덱스의 원소를 업데이트하고 원본 배열을 반환한다.', function () {
    const array = [1, 2, 3];
    expect(preserveRefReplaceItem(array, 2, 5)).toStrictEqual([1, 2, 5]);
    expect(preserveRefReplaceItem(array, 2, 5)).toBe(array);
  });
});
