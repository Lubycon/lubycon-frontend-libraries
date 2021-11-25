import { RefObject, useEffect } from 'react';

/**
 * 컴포넌트에 스크롤 이벤트를 추가하는 hook입니다.
 * useEffect dependency로 hook의 인자인 ref, scrollCallback을 포함하고 있어
 * ref, scrollCallback의 레퍼런스가 변경 될 때마다 스크롤 이벤트가 바인딩됩니다.
 * 이 부분을 참고하셔서 성능이슈가 발생하지 않도록 잘 관리해주세요.
 */
const useScrollEvent = (ref: RefObject<HTMLElement>, scrollCallback: () => void) => {
  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    ref.current.addEventListener('scroll', scrollCallback, { passive: true });
    return () => ref.current?.removeEventListener('scroll', scrollCallback);
  }, [ref.current, scrollCallback]);
};

export default useScrollEvent;
