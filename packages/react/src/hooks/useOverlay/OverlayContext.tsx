import React, {
  ReactNode,
  useState,
  useCallback,
  Fragment,
  createContext,
  PropsWithChildren,
  useMemo,
  useContext,
} from 'react';
import { Portal } from '../../components/Portal';

interface OverlayValues {
  addToArea: (overlayId: string, element: ReactNode) => void;
  removeFromArea: (overlayId: string) => void;
}
const OverlayContext = createContext<OverlayValues>({
  addToArea: () => {},
  removeFromArea: () => {},
});

function OverlayProvider({ children }: PropsWithChildren<unknown>) {
  const [overlays, setOverlays] = useState(new Map<string, ReactNode>());

  const addToArea = useCallback((overlayId: string, element: ReactNode) => {
    setOverlays((state) => {
      const newState = new Map(state);
      newState.set(overlayId, element);
      return newState;
    });
  }, []);

  const removeFromArea = useCallback((overlayId: string) => {
    setOverlays((state) => {
      const newState = new Map(state);
      newState.delete(overlayId);
      return newState;
    });
  }, []);

  const values = useMemo(
    () => ({
      addToArea,
      removeFromArea,
    }),
    [addToArea, removeFromArea]
  );

  return (
    <OverlayContext.Provider value={values}>
      {children}
      <Portal>
        {Array.from(overlays).map(([id, element]) => (
          <Fragment key={id}>{element}</Fragment>
        ))}
      </Portal>
    </OverlayContext.Provider>
  );
}

function useOverlayArea() {
  return useContext(OverlayContext);
}

export { OverlayProvider, useOverlayArea };
