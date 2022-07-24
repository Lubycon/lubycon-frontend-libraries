/**
 * 첫 번째 인자로 조건을 받아, 조건 결과에 따라 참, 거짓에 해당하는 값을 반환합니다.
 */
export function iif<T>(condition: boolean, trueResult: T): T | undefined;
export function iif<T>(condition: true, trueResult: T): T;
export function iif<T>(condition: false, trueResult: T): undefined;
export function iif<T, K>(condition: boolean, trueResult: T, falseResult: K): T | K;
export function iif<T, K>(condition: true, trueResult: T, falseResult: K): T;
export function iif<T, K>(condition: false, trueResult: T, falseResult: K): K;
export function iif<T, K>(condition: boolean, trueResult: T, falseResult?: K) {
  return condition ? trueResult : falseResult;
}
