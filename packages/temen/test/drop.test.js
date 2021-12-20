import assert from 'assert';
import { drop, dropRight } from '../src/drop';

describe('drop', () => {
  test('drop 함수는 두 번째 인자로 받은 수만큼 왼쪽부터 배열의 원소를 버린다', () => {
    assert.deepStrictEqual(drop([1, 2, 3], 1), [2, 3]);
  });

  test('drop 함수에 배열의 길이보다 큰 숫자가 들어오면 빈 배열이 반환된다', () => {
    assert.deepStrictEqual(drop([1, 2, 3], 5), []);
  });

  test('drop 함수에 0을 넘기면 첫 번째 인자로 받은 배열을 얕은 복사한 배열을 반환한다', () => {
    assert.deepStrictEqual(drop([1, 2, 3], 0), [1, 2, 3]);
  });
});

describe('dropRight', () => {
  test('dropRight 함수는 두 번째 인자로 받은 수만큼 오른쪽부터 배열의 원소를 버린다', () => {
    assert.deepStrictEqual(dropRight([1, 2, 3], 1), [1, 2]);
  });

  test('dropRight 함수에 배열의 길이보다 큰 숫자가 들어오면 빈 배열이 반환된다', () => {
    assert.deepStrictEqual(dropRight([1, 2, 3], 5), []);
  });

  test('dropRight 함수에 0을 넘기면 첫 번째 인자로 받은 배열을 얕은 복사한 배열을 반환한다', () => {
    assert.deepStrictEqual(dropRight([1, 2, 3], 0), [1, 2, 3]);
  });
});
