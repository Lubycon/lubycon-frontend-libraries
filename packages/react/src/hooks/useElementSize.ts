import { RefObject, useMemo } from 'react';

const DEFAULT_CASE = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

/**
 *  인자로 받은 Ref가 참조하는 HTML 엘리먼트의 Bounding Rect를 가져옵니다.
 *
 * @param {RefObject<HTMLElement>} ref 크기를 가져올 HTML Element
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLElement>();
 * const { top, left, right, bottom } = useElementSize(ref);
 *
 * return <div ref={ref} />
 * ```
 */
export function useElementSize(ref: RefObject<HTMLElement>) {
  return useMemo(() => {
    if (!ref.current) {
      return DEFAULT_CASE;
    }
    return ref.current?.getBoundingClientRect();
  }, [ref.current]);
}

export default useElementSize;
