import { RefObject, useEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

function useResizeObserver(
  ref: RefObject<HTMLElement>,
  resizeCallback: (arg: ResizeObserverEntry['contentRect']) => void
) {
  const resizeObsesrverRef = useRef<ResizeObserver | null>(null);
  const onResize = useRef(resizeCallback);

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    resizeObsesrverRef.current = new ResizeObserver((entries) => {
      onResize.current(entries[0].contentRect);
    });
    resizeObsesrverRef.current.observe(ref.current);

    return () => resizeObsesrverRef.current?.disconnect();
  }, [ref]);
}

export default useResizeObserver;
