'use client';
import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { SketchPicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import * as htmlToImage from 'html-to-image';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Node 1', color: '#6366f1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'Node 2', color: '#10b981' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'Node 3', color: '#f59e0b' },
    position: { x: 400, y: 100 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
];

const Diagram = () => {
  const diagramRef = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [editingNode, setEditingNode] = useState(null);
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeColor, setNodeColor] = useState('#6366f1');

  const addNode = () => {
    const newNode = {
      id: uuidv4(),
      type: 'custom',
      data: { label: 'New Node', color: nodeColor },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDoubleClick = (event, node) => {
    setEditingNode(node.id);
    setNodeLabel(node.data.label);
    setNodeColor(node.data.color || '#20B7AB');
  };

  const saveNodeChanges = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === editingNode
          ? {
              ...node,
              data: { ...node.data, label: nodeLabel, color: nodeColor },
            }
          : node
      )
    );
    setEditingNode(null);
  };

  const downloadImage = () => {
    if (diagramRef.current) {
      htmlToImage
        .toPng(diagramRef.current, {
          pixelRatio: 0.5,  
          backgroundColor: '#ffffff',  
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          },
        })
        .then(dataUrl => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'diagram.png';
          link.click();
        })
        .catch(err => {
          console.error('Error generating image:', err);
        });
    } else {
      console.error('Diagram ref is not defined');
    }
  };
  


  return (
    <div>
      <div className="flex justify-between items-center p-4 space-x-4">
        <button
          onClick={addNode}
          className="text-[#20B7AB] border-2 border-[#20B7AB] px-4 py-2 rounded-full"
        >
          Add Node
        </button>
        <button
          onClick={downloadImage}
          className="text-[#20B7AB] border-2 border-[#20B7AB] px-4 py-2 rounded-full"
        >
          Download as Image
        </button>

        {editingNode && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={nodeLabel}
              onChange={(e) => setNodeLabel(e.target.value)}
              className="p-2 border rounded"
            />
            <SketchPicker
              color={nodeColor}
              onChangeComplete={(color) => setNodeColor(color.hex)}
            />
            <button
              onClick={saveNodeChanges}
              className="text-[#20B7AB] border-2 border-[#20B7AB] px-4 py-2 rounded-full"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div ref={diagramRef} style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Diagram;
