import { useEffect } from 'react';

/**
 * useDidMount hook
 * 마운트 될 때 함수를 호출합니다.
 *
 * @param {Function} callback 마운트 될 때 호출 할 콜백 함수
 */
export default function useDidMount(callback: () => any) {
  useEffect(() => {
    if (typeof callback === 'function') {
      callback();
    }
  }, []);
}
