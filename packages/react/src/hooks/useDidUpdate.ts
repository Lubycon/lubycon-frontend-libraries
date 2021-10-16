import { DependencyList, useEffect, useRef } from 'react';

/**
 * dependency 배열의 요소가 업데이트 됐을때 콜백 함수를 실행합니다. 첫 렌더링 때는 실행되지 않습니다.
 *
 * @param {Function} callback dependency 배열의 요소가 업데이트 될 때 호출 할 콜백 함수
 * @param {Array} conditions 업데이트를 트리거하는 변수 목록
 */
export default function useDidUpdate(callback: () => void, dependencies: DependencyList) {
  const hasMount = useRef(false);

  if (JSON.stringify(dependencies) === '[]') {
    throw new Error('useDidUpdate 훅의 Dependency Array는 빈 배열일 수 없습니다.');
  }
  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
  }, dependencies);
}
