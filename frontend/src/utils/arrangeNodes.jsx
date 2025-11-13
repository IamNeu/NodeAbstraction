const arrangeNodes = (nodes, containerWidth, nodeWidth, nodeHeight, spacing) => {
    let x = 0;
    let y = 0;
    return nodes.map((node, index) => {
        if (x + nodeWidth > containerWidth) {
            x = 0;
            y += nodeHeight + spacing;
        }

        // Assigning default inputs and outputs per node type
        let config = {};
        if (node.type === 'input') {
            config = {
                title: 'Input',
                outputs: [{ id: 'output' }]
            };
        } else if (node.type === 'text') {
            config = {
                title: 'Text',
                inputs: [{ id: 'input', position: '50%' }],
                outputs: [{ id: 'output' }]
            };
        } else if (node.type === 'llm') {
            config = {
                title: 'LLM',
                inputs: [
                    { id: 'system_input', position: '30%' },
                    { id: 'prompt_input', position: '70%' }
                ],
                outputs: [{ id: 'response' }]
            };
        } else if (node.type === 'output') {
            config = {
                title: 'Output',
                inputs: [{ id: 'input', position: '50%' }]
            };
        }

        const positionedNode = {
            ...node,
            data: {
                ...node.data,
                config
            },
            position: { x, y }
        };
        x += nodeWidth + spacing;
        return positionedNode;
    });
};

export const edges = [
    { id: 'e1-2', source: '1', target: '2', sourceHandle: 'output', targetHandle: 'input', style: { strokeDasharray: '5,5', stroke: '#000' } },
    { id: 'e2-3a', source: '2', target: '3', sourceHandle: 'output', targetHandle: 'system_input', style: { strokeDasharray: '5,5', stroke: '#000' } },
    { id: 'e1-3b', source: '1', target: '3', sourceHandle: 'output', targetHandle: 'prompt_input', style: { strokeDasharray: '5,5', stroke: '#000' } },
    { id: 'e3-4', source: '3', target: '4', sourceHandle: 'response', targetHandle: 'input', style: { strokeDasharray: '5,5', stroke: '#000' } }
];