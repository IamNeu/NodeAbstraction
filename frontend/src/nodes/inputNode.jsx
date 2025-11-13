import React from 'react';
import { ReusableNode } from '../components/ReusableNode';
import { NODE_CONFIGS } from '../config/nodeConfigs';
export const InputNode = (props) => <ReusableNode {...props} config={NODE_CONFIGS.input} />;

