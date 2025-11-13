
import { useState } from 'react';

export function useNode(initialData, nodeId) {
  const [data, setData] = useState({
    name: initialData?.name || `node_${nodeId}`,
    type: initialData?.type || 'Text',
    text: initialData?.text || '',
    ...initialData
  });

  const updateData = (fieldName, value) => {
    setData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  return [data, updateData];
}
