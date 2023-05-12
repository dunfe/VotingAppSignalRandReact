import React, { FC } from 'react';

interface LegendElementProps {
  xpos: number;
  ypos: number;
  color: string[];
  ikey: number;
  data: string;
}

const LegendElement: FC<LegendElementProps> = ({
  xpos,
  ypos,
  color,
  ikey,
  data,
}) => {
  const position = `translate(${xpos},${ypos})`;

  return (
    <g transform={position}>
      <rect width="18" height="18" fill={color[ikey]}></rect>
      <text x="24" y="9" dy=".35em">{data}</text>
    </g>
  );
};

export default LegendElement;
