import { LoggerEventParams } from '@lubycon/logger';
import React, { ComponentProps, ReactElement } from 'react';
import ImpressionArea from './ImpressionArea';
import LoggingEvent from './LoggingEvent';

interface Props {
  view: string;
  logName: string;
  params?: LoggerEventParams;
  children: ReactElement;
  impressionOptions: Pick<ComponentProps<typeof ImpressionArea>, 'rootMargin' | 'threshold'>;
}

/**
 * \@lubycon/logger를 선언적으로 사용할 수 있는 컴포넌트입니다.
 * 내부적으로 ImpressionArea를 사용하고 있기 때문에 자동으로 onImpressionStart 이벤트 발생 시 로거가 발송됩니다.
 *
 * @example
 * <LoggingImpression
 *   view="구독_페이지"
 *   logName="구독해제_버튼노출"
 *   params={{ 서비스: service.name }}
 * >
 *   <button>구독 취소</button>
 * </LoggingImpression>
 */
export default function LoggingImpression({ children, impressionOptions, ...rest }: Props) {
  return (
    <LoggingEvent eventName="onImpressionStart" loggerType="impression" {...rest}>
      <ImpressionArea {...impressionOptions}>{children}</ImpressionArea>
    </LoggingEvent>
  );
}
