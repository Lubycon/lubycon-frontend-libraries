import assert from 'assert';
import cloneWith from '../src/cloneWith';

describe('deepClone', () => {
  let numbers = ['foo', 'bar', 'baz'];

  it('cloneWith 함수는 인자로 받은 변수를 얕은 복사 및 customizer 한다', function () {
    expect(cloneWith(numbers, (value) => value.length)).toBe(3);
    assert.deepStrictEqual(cloneWith(numbers), numbers);
  });
});
