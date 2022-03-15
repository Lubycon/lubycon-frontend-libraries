import getArrayFromCount from '../src/getArrayFromCount';

describe('getArrayFromCount', () => {
  test('getArrayFromCount은 인자로 길이를 가진 순차 값 배열을 생성한다', () => {
    expect(getArrayFromCount(2)).toStrictEqual([0, 1]);
    expect(getArrayFromCount(5)).toStrictEqual([0, 1, 2, 3, 4]);
    expect(getArrayFromCount(10)).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('getArrayFromCount는 배열을 생성할 때 mapper를 사용하여 값을 변형할 수 있다', () => {
    expect(getArrayFromCount(5, (v) => `${v}!`)).toStrictEqual(['0!', '1!', '2!', '3!', '4!']);
    expect(getArrayFromCount(5, (v) => v * 2)).toStrictEqual([0, 2, 4, 6, 8]);
  });
});
