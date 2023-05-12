import React from 'react';
import * as d3 from 'd3';
import Sector from './Sector';

interface DataItem {
    name: string;
    count: number;
  }

interface DataSeriesProps { 
    width: number;
    height: number;
    colors?: string[];
    data: DataItem[];
  }

const DataSeries: React.FC<DataSeriesProps> = ({
    width,
    height,
    colors,
    data,
  }) => {
    const pie = d3.pie();
    const result = data.map((item) => item.count);
    const names = data.map((item) => item.name);
    const sum = result.reduce((memo, num) => memo + num, 0);
    const position = `translate(${width / 2},${height / 2})`;
  
    const bars = pie(result).map((point, i) => (
      <Sector
        data={point}
        ikey={i}
        key={i}
        name={names[i]}
        colors={colors!}
        total={sum}
        width={width}
        height={height}
      />
    ));
  
    return <g transform={position}>{bars}</g>;
  };

export default DataSeries;