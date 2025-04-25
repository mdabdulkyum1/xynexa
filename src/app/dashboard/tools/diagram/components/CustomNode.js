import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: 10,
        borderRadius: 8,
        border: '2px solid #000',
        backgroundColor: data.color || '#ffffff',
        minWidth: 100,
        textAlign: 'center',
      }}
    >
      <Handle type="target" position="top" />
      <div>{data.label}</div>
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default CustomNode;
