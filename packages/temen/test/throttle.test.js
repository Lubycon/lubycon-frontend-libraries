import throttle from '../src/throttle';

describe('throttled', () => {
  test('throttle은 일정 시간이 지난 뒤 호출된다.', function () {
    let throttleTime = 0;
    let setTimeoutTime = 0;
    throttle(() => {
      return (throttleTime += 1);
    }, 300);

    setTimeout(() => {
      return (setTimeoutTime += 1);
    }, 100);

    expect(throttleTime < setTimeoutTime).toBe(false);
  });
});
