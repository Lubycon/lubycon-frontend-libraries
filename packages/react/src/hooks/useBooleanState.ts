import { useCallback, useState } from 'react';

/**
 * setState(true)와 같은 동작을 추상화하여 setTrue, setFalse를 사용합니다.
 *
 * @example
 * ```ts
 * const [isOpenModal, openModal, closeModal] = useBooleanState();
 * ```
 */
function useBooleanState(defaultValue = false): [boolean, () => void, () => void] {
  const [state, setState] = useState(defaultValue);

  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  return [state, setTrue, setFalse];
}

export default useBooleanState;
