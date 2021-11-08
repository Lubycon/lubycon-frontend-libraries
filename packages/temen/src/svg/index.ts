const MAX_DEGREE = 359.9;

export interface ArcData {
  x: number;
  y: number;
  radius: number;
  degree: number;
}

/**
 * @desc 삼각함수를 사용하여 x축으로부터 시계 방향으로 degree(θ)만큼 벌어진 좌표를 구합니다
 * @example
 * ```ts
 * // 중심 좌표가 (0, 0)이고 반지름이 50인 원을 기준으로 90만큼 벌어진 곳의 좌표를 구합니다
 * const { x, y } = getCoordsOnCircle({ x: 50, y: 50, radius: 50, degree: 90 }); // { x: 50, y: 100 }
 * ```
 */
export const getCoordsOnCircle = ({ x, y, radius, degree }: ArcData) => {
  const radian = (degree / 180) * Math.PI;
  return {
    x: x + radius * Math.cos(radian),
    y: y + radius * Math.sin(radian),
  };
};

/**
 * @desc 중심 좌표 (x, y)를 기준으로 degree(θ)만큼 +방향으로 호를 그리는 패스 명령어를 반환합니다.
 * @example
 * ```tsx
 * const ArcSvg = () => {
 *   return (
 *     <svg width={100} height={100}>
         <path d={getArc({ x: 50, y: 50, radius: 50, degree: 90 })} fill="#000000" />
       </svg>
     );
 * }
 * ```
 */
export const getArc = (props: ArcData) => {
  const startCoord = getCoordsOnCircle({ ...props, degree: 0 });
  const finishCoord = getCoordsOnCircle({ ...props });

  const { x, y, radius, degree } = props;
  const isLargeArc = degree > 180 ? 1 : 0;
  const isEnd = degree === MAX_DEGREE;

  const d = `M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 ${isLargeArc} 1 ${
    finishCoord.x
  } ${finishCoord.y} L ${x} ${y} ${isEnd ? 'z' : ''}`;
  return d;
};
