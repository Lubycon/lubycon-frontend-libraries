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

/**
 * 요소가 화면 안에 등장하거나 화면에서 사라지면 onImpressionStart, onImpressionEnd 이벤트를 트리거하는 컴포넌트입니다.
 *
 * @example
 * <ImpressionArea onImpressionStart={() => console.log('나타났다!')}>
 *   <div />
 * </ImpressionArea>
 */
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
