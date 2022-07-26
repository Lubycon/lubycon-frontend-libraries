import React, { createContext, ReactNode, useContext, useState, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

export const PortalContext = createContext<HTMLDivElement | null>(null);

interface PortalProviderProps {
  children: ReactNode;
}

export function PortalProvider({ children }: PortalProviderProps) {
  const [portalRef, setPortalRef] = useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={portalRef}>
      {children}
      <div
        id="lubycon-portal-container"
        ref={(element) => {
          if (portalRef !== null || element === null) {
            return;
          }

          setPortalRef(element);
        }}
      />
    </PortalContext.Provider>
  );
}

interface PortalConsumerProps {
  children: ReactNode;
}
export function Portal({ children }: PortalConsumerProps): ReactPortal | null {
  const portalRef = useContext(PortalContext);
  return portalRef == null ? null : createPortal(children, portalRef);
}
