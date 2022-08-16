import React, { ReactNode } from 'react';
import Digit from './Digit';
import { formatDigit } from '../utils';
import { css } from '@emotion/css';

interface Props {
  number: number;
  length?: number;
  height?: number;
  width?: number;
  duration?: number;
  divider?: string;
  formatter?: (digit: string) => ReactNode;
}

/**
 * 입력된 숫자가 롤링 애니메이션으로 나타나는 컴포넌트입니다.
 *
 * @param number 롤링 애니메이션으로 나타날 숫자.
 * @param length 전체 숫자의 길이. number의 길이보다 더 긴 값이 입력된 경우 앞쪽으로 0을 패딩한다.
 * @param height 숫자가 보여질 엘리먼트 한 칸의 높이. formatter를 사용하여 글자의 크기를 조정한 경우, height도 같이 조정해줘야한다.
 * @param width 숫자가 보여질 엘리먼트 한 칸의 넓이.
 * @param divider 숫자를 3자리마다 나눌 때 사용할 구분자. 기본값은 ,(콤마).
 * @param duration 애니메이션이 실행될 시간. 단위는 초(s)
 * @param formatter 숫자를 보여줄 때 사용할 포맷터. 숫자를 보여줄 때 사용할 포맷터를 지정하지 않으면, 숫자 그대로를 보여준다.
 *
 * @example
 * ```tsx
 * <RollingNumber number={1234} />
 *
 * // Quantumic Design의 Txt 컴포넌트와 조합하여 사용할 수도 있습니다.
 * <RollingNumber
 *   number={10000000}
 *   height={24}
 *   formatter={(digit) => (
 *     <Txt size={24} weight="bold">
 *       {digit}
 *     </Txt>
 *   )}
 *   duration={0.8}
 * />
 * ```
 */
const RollingNumber = ({
  number,
  length = String(number).length,
  width,
  height = 16,
  divider = ',',
  duration = 1,
  formatter,
}: Props) => {
  const digits = formatDigit({
    number,
    length,
    divider,
  });

  return (
    <div
      className={css`
        display: flex;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: row-reverse;
          overflow-y: hidden;
          height: ${height}px;
        `}
      >
        {digits.map((d, index) => {
          if (index % 4 === 3) {
            return <Divider key={index} divider={divider} height={height} formatter={formatter} />;
          }

          const delayWeight = index * 0.1;
          return (
            <Digit
              key={index}
              digit={d}
              height={height}
              width={width}
              duration={duration + delayWeight}
              formatter={formatter}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RollingNumber;

const Divider = ({
  divider,
  height,
  formatter,
}: {
  divider: string;
  height: number;
  formatter?: (divider: string) => ReactNode;
}) => (
  <div
    className={css`
      display: flex;
      align-items: center;
      padding: 0 2px;
      height: ${height}px;
    `}
  >
    {formatter?.(divider) ?? divider}
  </div>
);
