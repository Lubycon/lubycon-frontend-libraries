import { average, averageBy, cumulativeAverage, createAverageFilter } from '../src/average';
import getArrayFromCount from '../src/getArrayFromCount';

const dummyNumbers = [...getArrayFromCount(999, (i) => i + 1), 1000]; // 1 ~ 1000

describe('average', () => {
  it('average 함수는 인자로 받은 배열의 모든 원소의 평균 값을 반환한다', function () {
    expect(average(dummyNumbers)).toBe(500.5);
  });
});

describe('averageBy', () => {
  it('averageBy 함수는 인자로 받은 배열을 mapping한 후 원소의 값을 합산한다', function () {
    expect(
      averageBy([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], (item) => item.value)
    ).toBe(2.5);
    expect(averageBy([{ value: 'evan' }, { value: 'john' }], (item) => item.value.length)).toBe(4);
  });
});

describe('cumulativeAverage', () => {
  it('cumulativeAverage 함수는 이전 평균 값을 토대로 새로운 평균 값을 계산할 수 있다', function () {
    let avg = 0;
    dummyNumbers.forEach((newValue) => {
      avg = cumulativeAverage(avg, newValue, newValue);
    });
    expect(avg).toBe(average(dummyNumbers));
  });
});

describe('createAverageFilter', () => {
  it('createAverageFilter 함수는 이전 평균 값을 토대로 새로운 평균 값을 계산하는 필터를 생성한다', function () {
    const averageFilter = createAverageFilter();

    let avg = 0;
    let avg2 = 0;

    for (let newValue = 1; newValue < 11; newValue++) {
      avg = averageFilter(newValue);
      avg2 = cumulativeAverage(avg2, newValue, newValue);
    }

    expect(avg).toBe(avg2);
  });
});
