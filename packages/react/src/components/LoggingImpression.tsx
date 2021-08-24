import { LoggerEventParams } from '@lubycon/logger';
import React, { ComponentProps, ReactElement } from 'react';
import ImpressionArea from './ImpressionArea';
import LoggingEvent from './LoggingEvent';

interface Props {
  view: string;
  logName: string;
  params?: LoggerEventParams;
  children: ReactElement;
  impressionOptions: ComponentProps<typeof ImpressionArea>;
}

export default function LoggingImpression({ children, impressionOptions, ...rest }: Props) {
  return (
    <LoggingEvent eventName="onImpressionStart" loggerType="impression" {...rest}>
      <ImpressionArea {...impressionOptions}>{children}</ImpressionArea>
    </LoggingEvent>
  );
}
