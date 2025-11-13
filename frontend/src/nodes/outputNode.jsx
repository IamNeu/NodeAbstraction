// src/nodes/outputNode.jsx
import { ReusableNode } from '../components/ReusableNode';
import { NODE_CONFIGS } from '../config/nodeConfigs';
export const OutputNode = (props) => <ReusableNode {...props} config={NODE_CONFIGS.output} />;
