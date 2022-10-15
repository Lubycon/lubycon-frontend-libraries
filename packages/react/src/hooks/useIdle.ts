import { useCallback, useEffect, useRef } from 'react';

/**
 * 사용자의 idle 상태를 감지하여 callback 실행 및 boolean 상태를 반환합니다.
 *
 * @param {number} timeout idle 상태를 감지할 시간 (ms)
 * @param {() => void} onIdle idle 상태가 되었을 때 실행할 callback
 *
 * @example
 * ```tsx
 * const { isIdle, cancel, reset } = useIdle(1000, () => { console.log('idle') });
 *
 * console.log(isIdle); // true or false
 *
 * return <div onMouseMove={reset} />
 * ```
 */

function useIdle(timeout: number, onIdle: () => void) {
  const timeoutId = useRef<number | null>(null);
  const isIdle = useRef(false);

  const clear = useCallback(() => {
    if (timeoutId.current != null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clear();
    timeoutId.current = window.setTimeout(() => {
      isIdle.current = true;
      onIdle();
    }, timeout);
  }, [clear, onIdle, timeout]);

  const cancel = useCallback(() => {
    clear();
    isIdle.current = false;
  }, [clear]);

  useEffect(() => {
    reset();
    return clear;
  }, [clear, reset]);

  return { isIdle: isIdle.current, cancel, reset };
}

export default useIdle;
