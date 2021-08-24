import { LoggerEventParams } from '@lubycon/logger';
import React, { ReactElement } from 'react';
import LoggingEvent from './LoggingEvent';

interface Props {
  view: string;
  logName: string;
  params?: LoggerEventParams;
  children: ReactElement;
}

/**
 * \@lubycon/logger를 선언적으로 사용할 수 있는 컴포넌트입니다.
 * 하나의 Children만 감쌀 수 있으며, Children은 onClick property를 받을 수 있어야 합니다.
 *
 * @example
 * <LoggingClick view="구독_페이지" logName="구독해제_버튼클릭" params={{ 서비스: service.name }}>
 *   <button>구독 취소</button>
 * </LoggingClick>
 */
export default function LoggingClick({ children, ...rest }: Props) {
  return (
    <LoggingEvent eventName="onClick" loggerType="click" {...rest}>
      {children}
    </LoggingEvent>
  );
}
