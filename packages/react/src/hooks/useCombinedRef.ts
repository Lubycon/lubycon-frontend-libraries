import { Ref, useCallback, MutableRefObject, RefCallback } from 'react';

/**
 * 여러 개의 ref를 합칠 수 있는 훅입니다.
 * @example
 * ```jsx
 * const Foo = forwardRef((props, fowardedRef) => {
 *   const ref = useRef();
 *   const combinedRef = useCombinedRefs(fowardedRef, ref);
 *
 *   // div가 업데이트되면 ref, fowardedRef 둘 다 업데이트 됨
 *   return <div ref={combinedRef} />
 * });
 * ```
 */
export default function useCombinedRefs<T>(...refs: Array<Ref<T>>): RefCallback<T> {
  const combinedRef = useCallback(
    (value: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref != null) {
          (ref as MutableRefObject<T>).current = value;
        }
      });
    },
    [refs]
  );

  return combinedRef;
}
