import { useEffect, useRef } from 'react';
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
function useResizeObserver(resizeCallback: (arg: ResizeObserverEntry) => void) {
  const elementRef = useRef<HTMLElement | null>(null);
  const resizeObsesrverRef = useRef<ResizeObserver | null>(null);
  const onResize = useRef(resizeCallback);

  useEffect(() => {
    if (elementRef.current === null) {
      return;
    }

    resizeObsesrverRef.current = new ResizeObserver((entries) => {
      onResize.current(entries[0]);
    });
    resizeObsesrverRef.current.observe(elementRef.current);

    return () => resizeObsesrverRef.current?.disconnect();
  }, [elementRef.current]);

  return elementRef;
}

export default useResizeObserver;
