import { useRef, useEffect } from 'react';

/**
 *  일정 주기로 콜백 함수를 반복합니다.
 *
 * @param {Function} callback 주기 마다 반복 할 콜백 함수
 * @param {Array} delay 반복 주기
 */
const useInterval = (callback: VoidFunction, delay: number) => {
  const savedCallback = useRef<VoidFunction | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(() => {
      savedCallback.current?.();
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]);
};

export default useInterval;
