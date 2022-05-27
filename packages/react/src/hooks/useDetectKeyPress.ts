import { useEffect, useState } from 'react';
import KeyCode from '../_internal/Key';

/**
 * 첫 번째 매개변수로 전달된 키가 눌렸을 때 키(상태) 값을 반환합니다.
 * 두 번째 매개변수로 전달된 함수는 전달된 키가 눌렸을 때 함수를 호출합니다.
 *
 * @param {string} targetKey 눌렸을 때 반환할 키 값
 * @param {() => void} callback 눌렸을 때 실행할 함수
 * @returns {string} 눌렸을 때 반환할 키 값
 * @example
 *
 * ```ts
 * const pressedKey = useDetectKeyPress('Escape', callback);
 *
 * console.log(pressedKey); // Escape 키가 눌렸을 때 Escape 출력
 * ```
 */

function useDetectKeyPress(targetKey?: KeyCode, callback?: () => void) {
  const [key, setKey] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback?.();
      }
      setKey(event.key);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setKey('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [targetKey, callback]);

  return key;
}

export default useDetectKeyPress;
