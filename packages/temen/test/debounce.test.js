import debounce from '../src/debounce';

describe('debounce', () => {
  jest.useFakeTimers();

  test('두 번째 인자의 delay 동안 호출된 함수중 마지막 함수만 호출한다.', function () {
    const fn = jest.fn();

    const debounced = debounce(() => {
      return fn();
    }, 500);

    for (let i = 0; i < 100; i++) {
      debounced();
    }

    jest.runAllTimers();

    expect(fn).toBeCalledTimes(1);
  });

  test('두 번째 인자의 delay 시간 이후 함수가 호출된다.', function () {
    const fn = jest.fn();
    const debounced = debounce(() => fn(), 1000);

    debounced();
    expect(fn).toHaveBeenCalledTimes(0); // function not called

    for (let i = 0; i < 10; i++) {
      jest.advanceTimersByTime(500);
      debounced();
    }
    expect(fn).toHaveBeenCalledTimes(0); // function not called

    jest.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1); // function called
  });
});
