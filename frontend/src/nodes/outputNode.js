// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { icons } from '../icons';

export const OutputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
    const [outputType, setOutputType] = useState(data.outputType || 'Text');

    const handleNameChange = (e) => setCurrName(e.target.value);
    const handleTypeChange = (e) => setOutputType(e.target.value);

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-value` }
    ];

    return (
        <BaseNode id={id} label="Output" icon={icons.customOutput()} handles={handles}>
            <label className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Name</span>
                <input
                    type="text"
                    value={currName}
                    onChange={handleNameChange}
                    className="text-xs p-2 border border-slate-200 rounded-md focus:ring-black focus:border-black outline-none transition-all"
                />
            </label>
            <label className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Type</span>
                <select
                    value={outputType}
                    onChange={handleTypeChange}
                    className="text-xs p-2 border border-slate-200 rounded-md focus:ring-black focus:border-black outline-none transition-all bg-white"
                >
                    <option value="Text">Text</option>
                    <option value="File">Image</option>
                </select>
            </label>
        </BaseNode>
    );
}
