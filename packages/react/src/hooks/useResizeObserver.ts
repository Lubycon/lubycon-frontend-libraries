import { useCallback, useMemo } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';

/**
 * ref에 담긴 HTML 엘리먼트의 리사이즈 여부를 옵저빙하는 ResizeObserver를 사용합니다.
 *
 * @example
 * function Foo () {
 *   const ref = useResizeObserver((entry) => {
 *     console.log('element', entry.target);
 *   });
 *
 *   return <div ref={ref} />
 * }
 */
function useResizeObserver(resizeCallback: (entry: ResizeObserverEntry) => void) {
  const resizeObserver = useMemo(() => {
    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    return new ResizeObserver((entries) => {
      if (entries[0] != null) {
        resizeCallback(entries[0]);
      }
    });
  }, [resizeCallback]);

  const ref = useCallback(
    (element: Element | null) => {
      if (resizeObserver === undefined) {
        return;
      }

      resizeObserver.disconnect();
      if (element !== null) {
        resizeObserver.observe(element);
      }
    },
    [resizeObserver]
  );

  return ref;
}

export default useResizeObserver;
