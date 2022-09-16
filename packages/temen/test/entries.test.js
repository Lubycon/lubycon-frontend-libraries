import { entries } from '../src/entries';

describe('entries', () => {
  test('entries는 인자로 받은 객체의 키와 값으로 이루어진 배열을 반환한다', () => {
    const obj = {
      name: 'john',
      age: 13,
    };

    expect(entries(obj)).toStrictEqual([
      ['name', 'john'],
      ['age', 13],
    ]);
    expect(entries(obj)).toStrictEqual(Object.entries(obj));
  });
});
