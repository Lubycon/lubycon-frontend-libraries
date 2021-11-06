/**
 * 타입가드를 편하게 사용할 수 있는 유틸 함수 입니다.
 *
 * 하지만 타입 가딩을 하는 타입이 string | number <=> string과 같은 서브타입 관계가 아니더라도, 이 함수는 그대로 타입가드를 적용하기 때문에 Type Safely하지 않은 상황이 발생할 수 있습니다.
 *
 * 이 함수를 사용하면 반드시 타입 가딩 이후에 타입이 어떻게 평가되었는지 확인해주세요.
 */
export function is<T>(value: any, validator: (v: any) => boolean): value is T {
  return validator(value);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}
