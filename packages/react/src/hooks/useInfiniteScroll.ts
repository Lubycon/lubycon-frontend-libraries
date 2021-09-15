import { useEffect, useRef, useState } from 'react';
import useWindowSize from './useWindowSize';

export interface Queries {
  page: number;
  pageSize: number;
}
export interface InfiniteScroll<T> {
  fetcher: (params: Queries) => Promise<T>;
  initialQueries: Queries;
  getQueries: (params?: any) => Queries;
  threshold?: number;
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

const useInfiniteScroll = <T>({
  fetcher,
  initialQueries,
  getQueries,
  threshold = 150,
}: InfiniteScroll<T>) => {
  const ref = useRef<HTMLElement>(null);
  const { height: windowHeight } = useWindowSize();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [query, setQuery] = useState(initialQueries);

  const fetchData = () => {
    const nextQuery = getQueries(query);
    setQuery(nextQuery);

    return fetcher(nextQuery);
  };

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
    if (!isLoading) {
      if (ref.current) {
        const bottomOffset = getBottomOffset();

        if (!bottomOffset) return;

        const validOffset = bottomOffset < threshold;
        if (validOffset) {
          setIsLoading(true);
          const loadedData = await fetchData();
          setData(loadedData);
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

  return { ref, data, isLoading };
};

export default useInfiniteScroll;
