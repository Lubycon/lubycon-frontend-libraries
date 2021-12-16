import { sum, sumBy } from '../sum';

/**
 * 인자로 받은 배열 내 원소들의 평균을 구합니다
 *
 * @example
 * ```ts
 * average([1, 2, 3, 4]); // 2.5
 * ```
 */
export function average(array: number[]) {
  return sum(array) / array.length;
}

/**
 * 인자로 받은 배열을 한번 매핑한 후 평균을 구합니다
 *
 * @example
 * ```ts
 * averageBy(
 *   [{ value: 1 }, { value: 2 }, { value: 3 }],
 *   (item) => item.value,
 * ); // 2
 * ```
 */
export function averageBy<T>(array: T[], mapper: (item: T) => number) {
  return sumBy(array, mapper) / array.length;
}

/**
 * 이전 평균 값과 새롭게 입력된 값을 토대로 새로운 평균을 계산하는 평균 필터 알고리즘을 사용하여 값을 계산합니다.
 *
 * 항상 O(1)의 시간복잡도를 보장하여 평균을 계산하기 때문에, 센서 데이터 등 빠르게 입력된 데이터를 후처리하는 상황에 적합합니다.
 *
 * @example
 * ```ts
 * let averageLux = 0;
 * let calcCount = 0;
 *
 * const sensor = new AmbientLightSensor();
 * sensor.onreading = () => {
 *   calcCount++;
 *   averageLux = cumulativeAverage(averageLux, sensor.illuminance, calcCount);
 *   console.log(`지금까지의 평균 조도는 ${averageLux}lux 입니다`);
 * };
 *
 * sensor.start();
 * ```
 */
export function cumulativeAverage(prevAverage: number, newValue: number, dataListLength: number) {
  const oldWeight = (dataListLength - 1) / dataListLength;
  const newWeight = 1 / dataListLength;
  return prevAverage * oldWeight + newValue * newWeight;
}

/**
 * 이전 평균 값과 새롭게 입력된 값을 토대로 새로운 평균을 계산하는 클로저 필터 함수를 반환하며,
 * 이전 평균 값과 현재까지의 데이터 개수는 createAverageFilter 함수 스코프에 자유 변수로 저장됩니다.
 *
 * 항상 O(1)의 시간복잡도를 보장하여 평균을 계산하기 때문에, 센서 데이터 등 빠르게 입력된 데이터를 후처리하는 상황에 적합합니다.
 *
 * @example
 * ```ts
 * const average = createAverageFilter();
 * console.log(average(1)); // 1
 * console.log(average(2)); // 1.5
 * console.log(average(3)); // 2
 * console.log(average(4)); // 2.5
 * ```
 */
export function createAverageFilter() {
  let prevAverage = 0;
  let dataList: number[] = [];

  return (newValue: number) => {
    dataList = [...dataList, newValue];

    const newAverage = cumulativeAverage(prevAverage, newValue, dataList.length);
    prevAverage = newAverage;

    return newAverage;
  };
}
