import { useEffect, useState } from 'react';

/**
 * esc 키를 눌렀을 때 true인 상태를 반환합니다.
 *
 * @example
 * ```ts
 * const isEscapeKeyPressed = useDetectEscapeKey();
 *
 * useEffect(()=>{
 *   if(isEscapeKeyPressed) console.log("pressed esc");
 * },[isEscapeKeyPressed])
 * ```
 */

const useDetectEscapeKey = () => {
  const [isEscapeKeyPressed, setIsEscapeKeyPressed] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEscapeKeyPressed(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEscapeKeyPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  return isEscapeKeyPressed;
};

export default useDetectEscapeKey;
