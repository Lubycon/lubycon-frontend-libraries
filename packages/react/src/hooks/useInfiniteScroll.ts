import { useEffect, useRef, useState } from 'react';
import { useBooleanState } from '..';
import useWindowSize from './useWindowSize';

export interface Queries {
  page: number;
  pageSize: number;
}
export interface InfiniteScroll<T> {
  fetcher: (params: Queries) => Promise<T>;
  getQueries: (params?: any) => Queries;
  merger: (prevData?: T, newData?: T) => T;
  initialQueries: Queries;
  threshold?: number;
}

/**
 *  useInfiniteScroll hook
 *
 *  threshold 에 닿았을때 fetcher 함수를 실행합니다.
 *
 * @param {Function} fetcher 로딩 상태
 * @param {Function} merger fetch 데이터의 유무
 * @param {Function} getQueries threshold 에 닿았을때 호출 할 함수
 * @param {Queries} initialQueries 업데이트 간격
 * @param {number} threshold fetcher 함수의 호출 위치
 */

const useInfiniteScroll = <T>({
  fetcher,
  initialQueries,
  getQueries,
  threshold = 150,
  merger,
}: InfiniteScroll<T>) => {
  const ref = useRef<HTMLElement>(null);
  const { height: windowHeight } = useWindowSize();
  const [isLoading, startLoading, endLoading] = useBooleanState(false);

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
    if (!isLoading) return;

    if (ref.current) {
      const bottomOffset = getBottomOffset();
      if (!bottomOffset) return;

      const validOffset = bottomOffset < threshold;
      if (validOffset) {
        startLoading();
        const loadedData = await fetchData();
        const mergedData = merger(data, loadedData);
        setData(mergedData);
        endLoading();
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
