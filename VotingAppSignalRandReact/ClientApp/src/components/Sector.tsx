import React, { useState } from 'react';
import * as d3 from 'd3';

interface SectorProps {
  width: number;
  height: number;
  data: any;
  ikey: number;
  colors: string[];
  total: number;
  name: string;
}

const Sector: React.FC<SectorProps> = (props) => {
  const [text, setText] = useState('');
  const [opacity, setOpacity] = useState('arc');

  const onMouseOver = () => {
    setOpacity('arc-hover');
    const percent = ((props.data.value / props.total) * 100).toFixed(1);
    setText(percent + ' %');
  };

  const onMouseOut = () => {
    setText('');
    setOpacity('arc');
  };

  const onClick = () => {
    alert('You clicked ' + props.name);
  };

  const outerRadius = props.width / 2.2;
  const innerRadius = props.width / 8;
  const arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

  const data = props.data;
  const center = `translate(${arc.centroid(data)})`;
  const percentCenter = 'translate(0,3)';
  const color = props.colors[props.ikey];

  return (
    <g onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick}>
      <path className={opacity} fill={color} d={arc(props.data) ?? ""}></path>
      <text fill="white" transform={center} textAnchor="middle" fontSize="15px">{data.value}</text>
      <text fill={color} stroke={color} fontSize="15px" transform={percentCenter} textAnchor="middle">{text}</text>
    </g>
  );
};

export default Sector;
