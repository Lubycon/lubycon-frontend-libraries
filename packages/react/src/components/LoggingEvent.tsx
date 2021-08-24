import { logger, LoggerEventParams } from '@lubycon/logger';
import React, { ReactElement, useEffect } from 'react';

function isDefinedLoggerType(loggerType: string): loggerType is 'click' | 'impression' {
  return loggerType === 'click' || loggerType === 'impression';
}

interface Props {
  view: string;
  eventName: string;
  logName: string;
  loggerType: string;
  params?: LoggerEventParams;
  children: ReactElement;
}

/**
 * \@lubycon/logger를 선언적으로 사용할 수 있는 컴포넌트입니다. eventName과 일치하는 자식 컴포넌트의 프로퍼티에 이벤트를 발송하는 로직을 주입합니다.
 *
 * @example
 * <LoggingEvent
 *   view="구독_페이지"
 *   logName="구독해제_버튼클릭"
 *   params={{ 서비스: service.name }}
 *   eventName="onClick"
 *   loggerType="click"
 * >
 *   <button onClick={handleClick}>구독 취소</button>
 * </LoggingEvent>
 */
export default function LoggingEvent({
  view,
  eventName,
  logName,
  loggerType,
  params,
  children,
}: Props) {
  useEffect(() => {
    React.Children.only(children);
  }, [children]);

  return React.cloneElement(children, {
    [eventName]: (...args: any[]) => {
      const pageLogger = logger.getPageLogger(view);

      if (isDefinedLoggerType(loggerType)) {
        pageLogger[loggerType](logName, params);
      } else {
        pageLogger.event(logName, loggerType, params);
      }

      if (children.props[eventName] != null && children.props[eventName] === 'function') {
        return children.props[eventName](...args);
      }
    },
  });
}
