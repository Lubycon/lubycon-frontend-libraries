import { useRef, useEffect } from 'react';

/**
 * 한 단계 이전 렌더 타이밍의 값을 반환합니다. 이전 값과 현재 값을 비교하는 상황 등에 사용할 수 있습니다.
 */
export default function usePreviousState<T>(value: T): T {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
