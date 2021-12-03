import cloneDeepWith from '../src/cloneDeepWith';

describe('deepClone', () => {
  let number = 5;

  it('cloneDeepWith 함수는 인자로 받은 변수를 깊은 복사 및 customizer 한다', function () {
    expect(cloneDeepWith(number, (value) => value === 5)).toBe(true);
    expect(cloneDeepWith(number)).toBe(5);
  });
});
