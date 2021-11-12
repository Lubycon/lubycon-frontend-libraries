import assert from 'assert';
import pick from '../src/pick';

describe('pick', () => {
  it('pick 함수는 Object 중 원하는 Object 를 선택하여 개체를 만들수 있다. ', function () {
    assert.deepStrictEqual(pick({ a: 1, b: '2', c: 3 }, ['a', 'c']), { a: 1, c: 3 });
  });
  it('pick 함수는 Object 중 a, b, c Object 를 선택해서 a,b,c 로 이루어져있는 개체를 만들수 있다. ', function () {
    assert.deepStrictEqual(pick({ a: 1, b: '2', c: 3 }, ['a', 'b', 'c']), { a: 1, b: '2', c: 3 });
  });
  it('pick 함수는 Object 중 원하는 Object 를 아무것도 선택안할수도 있다. ', function () {
    assert.deepStrictEqual(pick({ a: 1, b: '2', c: 3 }, []), {});
  });
});
