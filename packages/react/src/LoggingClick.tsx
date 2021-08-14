import { logger, LoggerEventParams } from '@lubycon/logger';
import React, { MouseEvent, ReactElement, useEffect } from 'react';

interface LoggingClickProps {
  view: string;
  logName: string;
  params?: LoggerEventParams;
  children: ReactElement;
}

/**
 * @lubycon/logger를 선언적으로 사용할 수 있는 컴포넌트입니다.
 * 하나의 Children만 감쌀 수 있으며, Children은 onClick property를 받을 수 있어야 합니다.
 *
 * @example
 * <LoggingClick view="구독_페이지" logName="구독해제_버튼클릭" params={{ 서비스: service.name }}>
 *   <button>구독 취소</button>
 * </LoggingClick>
 */
export default function LoggingClick({ view, logName, params, children }: LoggingClickProps) {
  const onClick = (e: MouseEvent) => {
    const clickLogger = logger.getPageLogger(view);
    clickLogger.click(logName, params);

    if (children.props && typeof children.props.onClick === 'function') {
      children.props.onClick(e);
    }
  };

  useEffect(() => {
    React.Children.only(children);
  }, [children]);

  return React.cloneElement(children, { onClick });
}
