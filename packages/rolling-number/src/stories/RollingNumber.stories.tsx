import React, { useState } from 'react';
import { Txt, Stack } from 'quantumic-design';
import RollingNumber from '../components/RollingNumber';
import { useInterval } from '@lubycon/react';

export default {
  title: 'RollingNumber',
};

export const Default = () => {
  return (
    <Stack direction="column" gutter={16}>
      <RollingNumber number={574547754} />
      <RollingNumber number={1234} />
      <RollingNumber number={1234} length={8} />
    </Stack>
  );
};

export const Formatter = () => {
  return (
    <Stack gutter={24} direction="column">
      <RollingNumber
        number={4574545}
        height={24}
        formatter={(digit) => (
          <Txt size={24} weight={700}>
            {digit}
          </Txt>
        )}
      />
      <Stack align="flex-end" gutter={8}>
        <Txt size={18}>문동욱님의 현재 잔고는</Txt>
        <RollingNumber
          number={10000000}
          height={24}
          formatter={(digit) => (
            <Txt size={24} weight={700}>
              {digit}
            </Txt>
          )}
          duration={0.8}
        />
        <Txt size={18}>원이에요</Txt>
      </Stack>
    </Stack>
  );
};

const max = 1_000_000;
const min = 100;

export const Interval = () => {
  const [number, setNumber] = useState(0);
  useInterval(() => {
    setNumber(Math.round(Math.random() * (max - min) + min));
  }, 1500);

  return (
    <Stack gutter={8} direction="column">
      <Txt>현재 숫자 상태: {number}</Txt>
      <RollingNumber number={number} />
    </Stack>
  );
};
