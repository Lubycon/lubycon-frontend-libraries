import React, { useState } from 'react';
import RollingNumber from '../components/RollingNumber';
import { useInterval } from '@lubycon/react';

export default {
  title: 'RollingNumber',
};

const max = 1_000_000;
const min = 100;

export const Default = () => {
  const [number, setNumber] = useState(0);
  useInterval(() => {
    setNumber(Math.round(Math.random() * (max - min) + min));
  }, 1500);

  return (
    <>
      <p>현재 숫자 상태: {number}</p>
      <br />
      <RollingNumber number={number} />
    </>
  );
};
