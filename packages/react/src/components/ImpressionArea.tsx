import React, { ReactNode } from 'react';
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
 * ```tsx
 * <ImpressionArea onImpressionStart={() => console.log('나타났다!')}>
 *   <div />
 * </ImpressionArea>
 * ```
 */
const ImpressionArea = ({ children, ...rest }: Props) => {
  const impressionRef = useImpression({
    ...rest,
  });

  return <div ref={impressionRef}>{children}</div>;
};

export default ImpressionArea;
