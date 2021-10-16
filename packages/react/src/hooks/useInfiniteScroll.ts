import { useEffect, useRef, useState } from 'react';
import useBooleanState from './useBooleanState';
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
 *  threshold 에 닿았을때 fetcher 함수를 실행합니다.
 *
 * @param {Function} fetcher threshold 에 닿았을때 호출 할 데이터페칭 함수
 * @param {Function} merger 이전 데이터와, 현재 받아온 데이터를 병합 하는 함수
 * @param {Function} getQueries fetcher에서 가져올 초기 데이터 범위
 * @param {Queries} initialQueries fetcher에서 가져올 데이터 범위 값
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

    const bottomOffset = getBottomOffset();
    if (bottomOffset === null) return;
    const isValidOffset = bottomOffset < threshold;
    if (isValidOffset) {
      startLoading();
      const loadedData = await fetchData();
      const mergedData = merger(data, loadedData);
      setData(mergedData);
      endLoading();
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
