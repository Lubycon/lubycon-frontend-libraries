import { isNumber } from '../is';

const commaizeByRegex = (value: string) => value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

/**
 * 인자로 주어진숫자의 3자리수 마다 콤마를 찍은 문자열을 반환합니다. ex)  1000000 -> 1,000,000
 */
const commaizeNumber = (value: number | string) => {
  if (isNumber(value) && value.toLocaleString != null) {
    return value.toLocaleString();
  }

  return commaizeByRegex(String(value));
};

export default commaizeNumber;
