import { useEffect, useRef } from 'react';

/**
 * requestAnimationFrame을 쉽게 사용할 수 있는 훅입니다.
 * 콜백의 레퍼런스가 변경되면 기존의 animationFrame을 취소하고 새로운 animationFrame을 등록하니, 최적화를 위해 콜백의 레퍼런스 관리를 신경써주세요.
 *
 * @example
 * ```javascript
 * const [progress, setProgress] = useState(0);
 * const updateProgress = useCallback(() => {
 *   setProgress(prevProgress => prevProgress >= 100 ? 0 : prevProgress + 1);
 * }, []);
 * ```
 *
 * useAnimationFrame(updateProgress);
 */
export default function useAnimationFrame(callback: () => void) {
  const animateRequestRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      callback();
      animateRequestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animateRequestRef.current != null) {
        cancelAnimationFrame(animateRequestRef.current);
      }
    };
  }, [callback]);
}
