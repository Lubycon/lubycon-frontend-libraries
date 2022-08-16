import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { usePreviousState } from '@lubycon/react';
import { css } from '@emotion/css';
import { getArr } from '../utils';

let rendered = false;
let isAnimating = false;

interface Props {
  digit: string;
  width?: number;
  height: number;
  duration: number;
  formatter?: (digit: string) => ReactNode;
}
const Digit = ({ digit, width, height, duration, formatter }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const prevDigitState = usePreviousState(digit);
  const prevDigit = rendered ? prevDigitState : digit === '0' ? '1' : '0';

  const [numbers, setNumbers] = useState<string[]>([]);

  useEffect(() => {
    rendered = true;
    isAnimating = true;
    setOffset(-digit * height);

    return () => {
      rendered = false;
      setOffset(0);
      isAnimating = false;
    };
  }, []);

  useEffect(() => {
    const diff = Number(digit) - Number(prevDigit);
    const offset = diff > 0 ? -diff * height : -(diff + 10) * height;

    setOffset(offset);
    isAnimating = true;
  }, [digit, height]);

  useEffect(() => {
    setNumbers(getArr(Number(prevDigit), Number(digit)).map(String));
  }, [digit]);

  useEffect(() => {
    wrapperRef.current?.addEventListener('transitionend', () => {
      rendered = false;
      isAnimating = false;
      setNumbers((prev) => [digit, ...prev]);
      setOffset(0);
    });
  }, [digit]);

  return (
    <div
      ref={wrapperRef}
      className={css`
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin-top: ${offset}px;
        transition: ${isAnimating
          ? `margin-top ${duration}s cubic-bezier(0.08, 0.9, 0.64, 0.99)`
          : ''};
      `}
    >
      {numbers.map((d, index) => (
        <div
          key={index}
          className={css`
            display: flex;
            flex: none;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            height: ${height}px;
            width: ${width == null ? 'auto' : `${width}px`};
          `}
        >
          {formatter?.(d) ?? d}
        </div>
      ))}
    </div>
  );
};

export default Digit;
