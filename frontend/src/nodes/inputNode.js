// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { icons } from '../icons';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` }
  ];

  return (
    <BaseNode id={id} label="Input" icon={icons.customInput()} handles={handles}>
      <label className="flex flex-col gap-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase">Name</span>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="text-xs p-2 border border-slate-200 rounded-md focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase">Type</span>
        <select
          value={inputType}
          onChange={handleTypeChange}
          className="text-xs p-2 border border-slate-200 rounded-md focus:ring-black focus:border-black outline-none transition-all bg-white"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}
