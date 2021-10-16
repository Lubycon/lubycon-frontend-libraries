import { useEffect } from 'react';

/**
 * 마운트 될 때 함수를 호출합니다.
 *
 * @param {Function} callback 마운트 될 때 호출 할 콜백 함수
 */
export default function useDidMount(callback: () => void) {
  useEffect(() => {
    callback();
  }, []);
}
