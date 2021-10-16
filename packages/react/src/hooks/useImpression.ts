import { useCallback, useMemo, useState } from 'react';

interface Options {
  onImpressionStart?: () => void;
  onImpressionEnd?: () => void;
  rootMargin?: number;
  threshold?: number;
}

/**
 * ref에 담긴 HTML 요소가 화면 안으로 들어오면 인자로 받은 이벤트 핸들러들을 알맞게 호출합니다.
 *
 * @example
 * ```tsx
 * const impressionRef = useImpression({
 *   onImpressionStart: () => console.log('div 노출!'),
 *   onImpressionEnd: () => console.log('div 숨음!'),
 * });
 *
 * return <div ref={impressionRef} />
 * ```
 */
export default function useImpression({
  onImpressionStart,
  onImpressionEnd,
  rootMargin = 0,
  threshold = 0,
}: Options) {
  const [isImpressed, setImpressed] = useState(false);

  const handleImpressionStart = useCallback(() => {
    if (isImpressed === true) {
      return;
    }

    onImpressionStart?.();
    setImpressed(true);
  }, []);

  const handleImpressionEnd = useCallback(() => {
    if (isImpressed === false) {
      return;
    }

    onImpressionEnd?.();
    setImpressed(false);
  }, []);

  const handleImpression = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const currentRatio = entry.intersectionRatio;

      const isHide = threshold === 0 ? !entry.isIntersecting : currentRatio < threshold;

      if (isHide) {
        handleImpressionEnd();
      } else {
        handleImpressionStart();
      }
    },
    [handleImpressionEnd, handleImpressionStart]
  );

  const intersectionObserver = useMemo(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    return new IntersectionObserver(handleImpression, {
      rootMargin: `${rootMargin}px`,
      threshold: threshold,
    });
  }, [rootMargin, threshold]);

  const ref = useCallback(
    (element: Element | null) => {
      if (intersectionObserver === undefined) {
        return;
      }

      intersectionObserver.disconnect();
      if (element !== null) {
        intersectionObserver.observe(element);
      }
    },
    [intersectionObserver]
  );

  return ref;
}
