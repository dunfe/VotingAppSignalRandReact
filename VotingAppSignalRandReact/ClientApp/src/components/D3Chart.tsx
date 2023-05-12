import React, { FC, ReactNode } from 'react';

interface D3ChartProps {
  width: number;
  height: number;
  children?: ReactNode;
}

const D3Chart: FC<D3ChartProps> = ({ width, height, children }) => {
  return (
    <svg width={width} height={height}>
      {children}
    </svg>
  );
};

export default D3Chart;
