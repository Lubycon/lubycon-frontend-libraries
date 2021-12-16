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
 * 항상 O(1)의 시간복잡도를 보장하여 평균을 계산하기 때문에, 센서 데이터 등 빠르게 데이터를 들어오고 연산해야하는 곳에 적합합니다.
 *
 * @example
 * ```ts
 * let 평균조도 = 0;
 * let 조도읽어온횟수 = 0;
 *
 * const 조도센서 = new AmbientLightSensor();
 * 조도센서.onreading = () => {
 *   조도읽어온횟수++;
 *   평균조도 = cumulativeAverage(평균조도, 조도센서.illuminance, 조도읽어온횟수);
 *   console.log(`지금까지의 평균 조도는 ${평균조도}lux 입니다`);
 * };
 *
 * 조도센서.start();
 * ```
 */
export function cumulativeAverage(prevAverage: number, newValue: number, dataListLength: number) {
  const oldWeight = (dataListLength - 1) / dataListLength;
  const newWeight = 1 / dataListLength;
  return prevAverage * oldWeight + newValue * newWeight;
}

/**
 * 이전 평균 값과 새롭게 입력된 값을 토대로 새로운 평균을 계산하는 필터 함수를 생생하며,
 * 이전 평균 값과 현재까지의 데이터 개수는 클로저에 저장됩니다.
 *
 * 항상 O(1)의 시간복잡도를 보장하여 평균을 계산하기 때문에, 센서 데이터 등 빠르게 데이터를 들어오고 연산해야하는 곳에 적합합니다.
 *
 * @example
 * ```ts
 * const 평균계산 = createAverageFilter();
 * const 조도센서 = new AmbientLightSensor();
 *
 * 조도센서.onreading = () => {
 *   console.log(`지금까지의 평균 조도는 ${평균계산(조도센서.illuminance)}lux 입니다`);
 * };
 *
 * 조도센서.start();
 * ```
 */
export function createAverageFilter(defaultDataList: number[] = []) {
  let prevAverage = average(defaultDataList);
  let dataList = [...defaultDataList];

  return (newValue: number) => {
    dataList = [...dataList, newValue];

    const newAverage = cumulativeAverage(prevAverage, newValue, dataList.length);
    prevAverage = newAverage;

    return newAverage;
  };
}
