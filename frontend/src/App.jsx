import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { LLMNode } from './nodes/llmNode';
import { TextNode } from './nodes/textNode';
import { ReusableNode } from './components/ReusableNode';
import { submitPipeline } from './submit';
import arrangeNodesInRows from './utils/FlowDiagram';
import { DraggableNode } from './draggableNode';


const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
  uppercase: ReusableNode,
  math: ReusableNode,
  concat: ReusableNode,
  split: ReusableNode,
  logic: ReusableNode,
};

const rawNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      config: {
        title: 'Input',
        outputs: [{ id: 'output' }],
        fields: [{ name: 'value', label: 'Input Value', type: 'text' }]
      }
    }
  },
  {
    id: '2',
    type: 'text',
    data: {
      config: {
        title: 'Text',
        outputs: [{ id: 'output' }],
        fields: [{ name: 'text', label: 'Text Content', type: 'textarea' }]
      }
    }
  },
  {
    id: '3',
    type: 'llm',
    data: {
      config: {
        title: 'LLM',
        inputs: [
          { id: 'system_input', position: '30%' },
          { id: 'prompt_input', position: '70%' }
        ],
        outputs: [{ id: 'response' }]
      }
    }
  },
  {
    id: '4',
    type: 'output',
    data: {
      config: {
        title: 'Output',
        inputs: [{ id: 'input', position: '50%' }]
      }
    }
  },
  {
    id: '5',
    type: 'uppercase',
    data: {
      config: {
        title: 'Uppercase',
        inputs: [{ id: 'input' }],
        outputs: [{ id: 'output' }],
        fields: [{ name: 'value', label: 'Input Value', type: 'text' }]
      }
    }
  },
  {
    id: '6',
    type: 'math',
    data: {
      config: {
        title: 'Math Add',
        inputs: [{ id: 'a' }, { id: 'b' }],
        outputs: [{ id: 'sum' }],
        fields: [
          { name: 'a', label: 'A', type: 'number' },
          { name: 'b', label: 'B', type: 'number' }
        ]
      }
    }
  },
  {
    id: '7',
    type: 'concat',
    data: {
      config: {
        title: 'Join Text',
        inputs: [{ id: 'left' }, { id: 'right' }],
        outputs: [{ id: 'joined' }],
        fields: [{ name: 'separator', label: 'Separator', type: 'text' }]
      }
    }
  },
  {
    id: '8',
    type: 'split',
    data: {
      config: {
        title: 'Split Text',
        inputs: [{ id: 'text' }],
        outputs: [{ id: 'parts' }],
        fields: [{ name: 'delimiter', label: 'Delimiter', type: 'text' }]
      }
    }
  },
  {
    id: '9',
    type: 'logic',
    data: {
      config: {
        title: 'If Condition',
        inputs: [{ id: 'condition' }, { id: 'value' }],
        outputs: [{ id: 'result' }],
        fields: [{ name: 'check', label: 'Check if true', type: 'checkbox' }]
      }
    }
  }
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    sourceHandle: 'output',
    target: '2',
    targetHandle: 'input',
    style: { strokeDasharray: '4,2', stroke: '#6366f1' }
  },
  {
    id: 'e2-3a',
    source: '2',
    sourceHandle: 'output',
    target: '3',
    targetHandle: 'system_input',
    style: { strokeDasharray: '4,2', stroke: '#6366f1' }
  },
  {
    id: 'e1-3b',
    source: '1',
    sourceHandle: 'output',
    target: '3',
    targetHandle: 'prompt_input',
    style: { strokeDasharray: '4,2', stroke: '#6366f1' }
  },
  {
    id: 'e3-4',
    source: '3',
    sourceHandle: 'response',
    target: '4',
    targetHandle: 'input',
    style: { strokeDasharray: '4,2', stroke: '#6366f1' }
  }
];

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    const arranged = arrangeNodesInRows(rawNodes, 1200, 260, 140, 40);
    setNodes(arranged);
  }, []);

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'default' }, eds)),
    []
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 70%)',
          zIndex: 0
        }}
      />
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          panOnScroll
          zoomOnScroll
          zoomOnPinch
        >
          <Background color="#dbeafe" gap={16} />
          <Controls position="bottom-left" />
        </ReactFlow>

        <button
          onClick={async () => {
            const result = await submitPipeline(nodes, edges);
          }}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          Submit Pipeline
        </button>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
