import React from 'react';
import { ReusableNode } from '../components/ReusableNode';
import { NODE_CONFIGS } from '../config/nodeConfigs';
export const TextNode = (props) => <ReusableNode {...props} config={NODE_CONFIGS.text} />;

