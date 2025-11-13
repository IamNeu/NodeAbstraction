export const NODE_CONFIGS = {
    input: {
      title: 'Input',
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'type', label: 'Type', type: 'select', options: ['Text', 'File'] }
      ],
      outputs: [{ id: 'value' }]
    },
    output: {
      title: 'Output',
      
      
      inputs: [{ id: 'value' }]
    },
    
    llm: {
      title: 'LLM',
        style: {
          backgroundColor: '#ede9fe',
          border: '1px solid #a78bfa',
          color: '#4c1d95'
        },
       content: 'This is a LLM.',
      inputs: [
        { id: 'system', position: '33%' },
        { id: 'prompt', position: '67%' }
      ],
      outputs: [{ id: 'response' }]
    },
    text: {
      
      title: 'Text',
      fields: [
        { name: 'text', label: 'Text', type: 'textarea' }

      ],
      outputs: [{ id: 'output' }]
    }
  };
  