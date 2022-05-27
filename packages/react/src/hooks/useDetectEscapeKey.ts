import useDetectKeyPress from './useDetectKeyPress';

/**
 * Escape 키가 눌렸을 때 true 반환
 *
 * @returns {boolean} Escape 키가 눌렸을 때 true
 * @example
 *
 * ```ts
 * const isEscapeKeyPressed = useDetectEscapeKey();
 *
 * console.log(isEscapeKeyPressed); // Escape 키가 눌렸을 때 true 출력
 * ```
 */

const useDetectEscapeKey = () => {
  const detectKey = useDetectKeyPress();

  return detectKey === 'Escape';
};

export default useDetectEscapeKey;
