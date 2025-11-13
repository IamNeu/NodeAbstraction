import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useNode } from '../hooks/useNode';
import { SimpleInput } from './SimpleInput';
import styles from './ReusableNode.module.css';

export function ReusableNode({ id, data }) {
  const config = data?.config || {};
  const [nodeData, updateData] = useNode(data, id);
  const contentRef = useRef(null);
  const [collapsed, setCollapsed] = useState(true);
  const [dynamicInputs, setDynamicInputs] = useState([]);

  // Extract {{variable}}s from textarea for dynamic input handles
  useEffect(() => {
    if (config.title === 'Text') {
      const matches = (nodeData.text || '').match(/{{\s*([\w$]+)\s*}}/g) || [];
      const variableNames = [...new Set(matches.map((m) => m.replace(/{{\s*|\s*}}/g, '')))];
      setDynamicInputs(variableNames);
    }
  }, [nodeData.text]);

  // auto-expand TextNode height 
const autoStyle = {};

  if (!config.title) {
    return <div className={styles.nodeBox}>Missing config</div>;
  }
  

  return (
    <div
      ref={contentRef}
      className={styles.nodeBox}
      style={{
        ...autoStyle,
        width: collapsed ? 100 : 200,

        height: collapsed ? 50 : 'auto',
        cursor: 'pointer',
        overflow: 'visible',
        position: 'relative',
      }}
      onClick={() => collapsed && setCollapsed(false)}
    >
      <div className={styles.nodeTitle}>{config.title}</div>

      {/* Dynamic + static input handles */}
      {[...(config.inputs || []), ...dynamicInputs.map((id) => ({ id }))].map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          id={input.id}
          position={Position.Left}
          style={{
            top: `${(index + 1) * 20}%`,
            left: -10,
            background: '#fff',
            border: '2px solid #6366f1',
            width: 12,
            height: 12,
            borderRadius: '50%',
            zIndex: 10,
          }}
        />
      ))}

      {/* Output handles */}
      {config.outputs?.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          id={output.id}
          position={Position.Right}
          style={{
            top: output.position || `${(index + 1) * 50}%`,
            background: '#fff',
            border: '2px solid #6366f1',
            width: 10,
            height: 10,
            borderRadius: '50%',
          }}
        />
      ))}

      

      {/* Render form fields if not collapsed */}
      {!collapsed &&
        config.fields?.map((field) => (
          <div className={styles.nodeField} key={field.name}>
            <SimpleInput
              label={field.label}
              type={field.type}
              value={nodeData[field.name] || ''}
              onChange={(val) => updateData(field.name, val)}
              options={field.options}
              className={styles.nodeInput}
            />
          </div>
        
        
        ))}
    </div>

    



    
  );
  
}


