import React, { useCallback, useRef, useMemo, useEffect } from 'react';
import { generateUUID } from 'temen';
import { useOverlayArea } from './OverlayContext';
import StateReacter, { StateReacterControl } from './StateReacter';
import { OverlayController } from './types';

/**
 * 선언적으로 사용해야하는 컴포넌트를 open, close와 같은 함수로 열고 닫을 수 있도록 도와주는 유틸성 Hooks입니다.
 * 하나의 useOverlay는 고유한 ID를 가진 오버레이를 생성하고, open 함수에 인자로 받은 컴포넌트를 이 오버레이에 렌더합니다.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { open } = useOverlay();
 *
 *   const openMyModal = () => {
 *     open(({ isOpen, close }) => (
 *       <MyModal open={isOpen} onClose={close} />
 *     ))
 *   };
 *
 *   return <button onClick={openMyModal}>모달열기</button>
 * }
 * ```
 *
 */
export function useOverlay() {
  const context = useOverlayArea();
  if (context == null) {
    throw new Error('useOverlay는 OverlayProvider 안에서만 사용 가능합니다.');
  }

  const { addToArea, removeFromArea } = context;
  const stateReacterRef = useRef<StateReacterControl>(null);

  const overlayId = useMemo(() => generateUUID(), []);

  const open = useCallback((controller: OverlayController) => {
    if (stateReacterRef.current != null) {
      stateReacterRef.current?.close();
    }

    addToArea(overlayId, <StateReacter ref={stateReacterRef} controller={controller} />);
    stateReacterRef.current?.open();
  }, []);

  const close = useCallback(() => {
    stateReacterRef.current?.close();
  }, []);

  useEffect(() => {
    return () => {
      removeFromArea(overlayId);
    };
  }, []);

  return useMemo(
    () => ({
      open,
      close,
    }),
    []
  );
}
