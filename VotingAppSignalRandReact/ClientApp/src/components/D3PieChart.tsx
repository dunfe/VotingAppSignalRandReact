import React, { FC } from 'react';
import D3Chart from './D3Chart';
import D3Legend from './D3Legend';
import DataSeries from './DataSeries';

const colors = ['#FD9827', '#DA3B21', '#3669C9', '#1D9524', '#971497'];

interface D3PieChartProps {
  width?: number;
  height?: number;
  title?: string;
  data: any[];
}

const D3PieChart: FC<D3PieChartProps> = ({
  width = 300,
  height = 350,
  title = '',
  data,
}) => {
  return (
    <div>
      <h4>{title}</h4>
      <D3Chart width={width} height={height}>
        <DataSeries data={data} colors={colors} width={width} height={height} />
      </D3Chart>
      <D3Legend
        data={data}
        colors={colors}
        width={width - 100}
        height={height}
      />
    </div>
  );
};

export default D3PieChart;
