import { lowerFirstLetter, upperFirstLetter } from '../src';

describe('convertFirstLetter', () => {
  test('lowerFirstLetter 함수는 문자열의 첫 글자를 소문자로 변경한다', () => {
    expect(lowerFirstLetter('FRED')).toBe('fRED');
    expect(lowerFirstLetter('1FRED')).toBe('1FRED');
    expect(lowerFirstLetter('')).toBe('');
  });
  test('upperFirstLetter 함수는 문자열의 첫 글자를 대문자로 변경한다', () => {
    expect(upperFirstLetter('fred')).toBe('Fred');
    expect(upperFirstLetter('1fred')).toBe('1fred');
    expect(upperFirstLetter('')).toBe('');
  });
});
