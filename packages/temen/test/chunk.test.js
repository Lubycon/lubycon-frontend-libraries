import assert from 'assert';
import chunk from '../src/chunk';

describe('chunk', () => {
  const array = [0, 1, 2, 3, 4, 5];

  it('chunk 함수는 첫 번째 인자로 받은 배열을 두번째 인자의 값의 크기만큼 쪼갠다', function () {
    assert.deepStrictEqual(chunk(array, 3), [
      [0, 1, 2],
      [3, 4, 5],
    ]);
  });

  it('chunk 함수는 청킹을 진행하고 남은 원소를 하나의 배열로 합쳐서 반환한다', function () {
    assert.deepStrictEqual(chunk(array, 4), [
      [0, 1, 2, 3],
      [4, 5],
    ]);
  });
});
