import { useEffect, useRef, useState } from 'react';
import useWindowSize from './useWindowSize';
import useInterval from './useInterval';

export interface Queries {
  hasNextPage: boolean;
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
 * @param {number} threshold onLoadMore 이 호출 될 높이
 * @param {number} interval 업데이트 간격
 */
const useInfiniteScroll = <T>(
  fetcher: (params?: any) => Promise<T>,
  { hasNextPage, threshold = 150, interval = 200 }: Queries
) => {
  const ref = useRef<HTMLElement>(null);
  const { height: windowHeight } = useWindowSize();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();

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

  const listenBottomOffset = async () => {
    if (!isLoading && hasNextPage) {
      if (ref.current) {
        const bottomOffset = getBottomOffset();

        if (!bottomOffset) return;

        const validOffset = bottomOffset < threshold;
        if (validOffset) {
          setIsLoading(true);
          const fetchData = await fetcher();
          setData(fetchData);
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenBottomOffset);
    return () => {
      window.removeEventListener('scroll', listenBottomOffset);
    };
  });

  useInterval(listenBottomOffset, hasNextPage ? interval : 0);

  return { ref, data, isLoading };
};

export default useInfiniteScroll;
