import { useCallback, useEffect, useRef } from 'react';

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
