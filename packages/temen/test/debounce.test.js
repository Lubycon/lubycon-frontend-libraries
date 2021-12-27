import debounce from '../src/debounce';

describe('debounce', () => {
  jest.useFakeTimers();

  test('debounce는 정해진 delay 동안 중복되는 호출을 방지할 수 있다.', function () {
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

  test('delay 시간 동안 호출되지 않으며, delay 시간이 지난 후에 호출한다.', function () {
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
