import { stringifyCookie } from '../src/cookies/stringifyCookie';
import { parseCookies } from '../src/cookies/parseCookies';

describe('cookies', () => {
  describe('stringifyCookie', () => {
    test(`stringifyCookie 함수는 string 타입의 값을 처리할 수 있다.`, () => {
      expect(stringifyCookie('foo', 'test')).toBe(`foo=test;`);
    });
    test(`stringifyCookie 함수는 boolean 타입의 값을 처리할 수 있다.`, () => {
      expect(stringifyCookie('foo', true)).toBe(`foo=true;`);
    });
    test(`stringifyCookie 함수는 number 타입의 값을 처리할 수 있다.`, () => {
      expect(stringifyCookie('foo', 1)).toBe(`foo=1;`);
    });
    test(`stringifyCoookie 함수는 쿠키의 옵션을 처리할 수 있다`, () => {
      expect(
        stringifyCookie('foo', 1, { expires: new Date(Date.UTC(2022, 1, 12)), path: '/' })
      ).toBe(`foo=1; expires=Sat, 12 Feb 2022 00:00:00 GMT; path=/;`);
    });
  });
  describe('parseCookies', () => {
    test('parseCookie 함수는 주어진 쿠키 포맷의 문자열을 파싱하여 올바른 객체를 반환한다', () => {
      expect(parseCookies('foo=1')).toEqual({ foo: '1' });
    });
    test('parseCookie 함수는 key=value 형태로 구성되지 않은 문자열을 무시한다', () => {
      expect(parseCookies('foo=true; bar123')).toEqual({ foo: 'true' });
    });
    test('parseCookie 함수는 쿠키가 없는 경우, 빈 객체를 반환한다', () => {
      expect(parseCookies('')).toEqual({});
    });
  });
});
