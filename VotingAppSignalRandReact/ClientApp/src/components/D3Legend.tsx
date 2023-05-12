import React from 'react';
import LegendElement from './LegendElement';

interface D3LegendProps {
    width: number;
    height: number;
    colors: string[];
    data: { name: string }[];
  }

  const D3Legend: React.FC<D3LegendProps> = ({ width, height, colors, data }) => {
    const elements = data.map((item, i) => (
      <LegendElement
        color={colors}
        xpos={0}
        ypos={100 + i * 20}
        data={item.name}
        key={i}
        ikey={i}
      />
    ));
  
    return (
      <svg className="legend" width={width} height={height}>
        {elements}
      </svg>
    );
  };
  
  export default D3Legend;