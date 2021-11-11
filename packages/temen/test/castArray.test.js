import assert from 'assert';
import castArray from '../src/castArray';

describe('castArray', () => {
  const array = [1];

  test('castArray 함수는 다수의 인자를 받으면 첫번째 인자를 배열으로 반환한다.', () => {
    assert.deepStrictEqual(castArray(1, 2, 3), array);
  });

  it('castArray 함수는 배열을 받으면 배열의 레퍼런스를 반환한다.', function () {
    assert.strictEqual(castArray(array), array);
  });

  it('castArray 함수는 인자가 주어지지 않으면 빈배열을 반환한다.', function () {
    assert.deepStrictEqual(castArray(), []);
  });
});
