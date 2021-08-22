import { useEffect, useRef, useState } from 'react';
import useWindowSize from './useWindowSize';
import useInterval from './useInterval';

export interface InfiniteScroll {
  isLoading: boolean;
  hasNextPage: boolean;
  onLoadMore: VoidFunction;
  threshold?: number;
  interval?: number;
}

/**
 *  useInfiniteScroll hook
 *
 *  threshold 에 닿았을때 fetch 함수를 실행합니다.
 *
 * @param {boolean} isLoading 로딩 상태
 * @param {boolean} hasNextPage fetch 데이터의 유무
 * @param {Function} onLoadMore threshold 에 닿았을때 호출 할 함수
 * @param {number} threshold 업데이트를 위치
 * @param {number} interval 업데이트 간격
 */
const useInfiniteScroll = <T extends HTMLElement>({
  isLoading,
  hasNextPage,
  onLoadMore,
  threshold = 150,
  interval = 200,
}: InfiniteScroll) => {
  const ref = useRef<T>(null);
  const { height: windowHeight } = useWindowSize();
  const [listen, setListen] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setListen(true);
    }
  }, [isLoading]);

  const getBottomOffset = () => {
    const element = ref.current;

    if (!element || !windowHeight) {
      return null;
    }

    const rect = element.getBoundingClientRect();

    const bottom = rect.bottom;
    const bottomOffset = bottom - windowHeight;

    return bottomOffset;
  };

  const listenBottomOffset = () => {
    if (listen && !isLoading && hasNextPage) {
      if (ref.current) {
        const bottomOffset = getBottomOffset();
        if (!bottomOffset) {
          return;
        }
        const validOffset = bottomOffset < threshold;
        if (validOffset) {
          setListen(false);
          onLoadMore();
        }
      }
    }
  };

  useInterval(
    () => {
      listenBottomOffset();
    },
    hasNextPage ? interval : 0
  );

  return ref;
};
export default useInfiniteScroll;
