import React, { forwardRef, ReactNode, Ref } from 'react';
import useCombinedRefs from '../hooks/useCombinedRef';
import useImpression from '../hooks/useImpression';

interface Props {
  onImpressionStart?: () => void;
  onImpressionEnd?: () => void;
  rootMargin?: number;
  threshold?: number;
  children: ReactNode;
}

const ImpressionArea = forwardRef(
  ({ children, ...rest }: Props, forwardedRef: Ref<HTMLDivElement>) => {
    const impressionRef = useImpression({
      ...rest,
    });

    const ref = useCombinedRefs(forwardedRef, impressionRef);

    return <div ref={ref}>{children}</div>;
  }
);

export default ImpressionArea;
