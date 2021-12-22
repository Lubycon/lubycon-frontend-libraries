import throttle from '../src/throttle';

describe('throttled', () => {
  test('두 번째 인자의 delay 동안 callback 함수를 1회만 호출한다.', function () {
    let throttleTime = 0;

    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const throttleCb = throttle(() => {
      return (throttleTime += 1);
    }, 300);
    throttleCb();
    throttleCb();
    throttleCb();

    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});
