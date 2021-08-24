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
 * 자식 요소에서 onClick 이벤트가 발생하면 로거의 click 메소드를 사용하여 이벤트 로그를 발송합니다.
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
