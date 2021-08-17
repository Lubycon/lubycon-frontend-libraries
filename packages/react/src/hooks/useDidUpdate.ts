import { useEffect, useRef } from 'react';

/**
 *  useDidUpdate hook
 *
 *  dependency 배열의 요소가 업데이트 됐을때 콜백 함수를 실해압니다.
 *
 * @param {Function} callback dependency 배열의 요소가 업데이트 될 때 호출 할 콜백 함수
 * @param {Array} conditions 업데이트를 트리거하는 변수 목록
 */
export default function useDidUpdate(callback: () => any, conditions?: any[]) {
  const hasMount = useRef(false);

  if (JSON.stringify(conditions) === '[]') {
    console.warn("두번째 인자로 []을 사용하면 'useDidUpdate'는 죽습니다.");
  }
  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
  }, conditions);
}
