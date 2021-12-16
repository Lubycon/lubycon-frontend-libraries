import { sum, sumBy } from '../src/sum';

describe('sum', () => {
  it('sum 함수는 인자로 받은 배열의 모든 원소를 합산한다', function () {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });
});

describe('sumBy', () => {
  it('sumBy 함수는 인자로 받은 배열을 mapping한 후 원소의 값을 합산한다', function () {
    expect(
      sumBy([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], (item) => item.value)
    ).toBe(10);
    expect(sumBy([{ value: 'evan' }, { value: 'john' }], (item) => item.value.length)).toBe(8);
  });
});
