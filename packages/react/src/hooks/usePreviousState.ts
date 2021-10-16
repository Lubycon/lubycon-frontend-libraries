import { useRef, useEffect } from 'react';

/**
 * 한 단계 이전 렌더 타이밍의 값을 반환합니다. 이전 값과 현재 값을 비교하는 상황 등에 사용할 수 있습니다.
 *
 * @example
 * ```js
 * const [payMethods, setPaymethods] = useState();
 * const previousPayMethods = usePreviousState(payMethods);
 *
 * useEffect(() => {
 *   if (payMethods.length > previousPayMethods.length) {
 *     alert('새로운 결제 수단이 추가되었습니다!');
 *   }
 * }, []);
 * ```
 */
export default function usePreviousState<T>(value: T): T {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
