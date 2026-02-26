// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { icons } from '../icons';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response` }
  ];

  return (
    <BaseNode id={id} label="LLM" icon={icons.llm()} handles={handles}>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-slate-600 leading-relaxed font-medium"> This is a High Performance Large Language Model. </p>
        <div className="mt-2 py-1 px-2 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-800 font-semibold inline-block self-start">
          GPT-4o Ready
        </div>
      </div>
    </BaseNode>
  );
}
