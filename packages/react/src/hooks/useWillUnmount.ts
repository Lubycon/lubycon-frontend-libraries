import { useEffect } from 'react';

/**
 * useWillUnmount hook
 * 컴포넌트가 언마운트 될 때 함수를 호출합니다.
 *
 * @param {Function} callback 컴포넌트가 언마운트 될 때 호출 할 콜백 함수
 */
export default function useWillUnmount(callback: () => void) {
  useEffect(() => {
    return callback;
  }, []);
}
