// LogicNode.js --new
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { icons } from '../icons';

export const LogicNode = ({ id, data }) => {
    const [condition, setCondition] = useState(data?.condition || 'equals');

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '30%' } },
        { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '70%' } },
        { type: 'source', position: Position.Right, id: `${id}-true`, style: { background: '#22c55e', top: '30%' } },
        { type: 'source', position: Position.Right, id: `${id}-false`, style: { background: '#ef4444', top: '70%' } }
    ];

    return (
        <BaseNode id={id} label="Logic" icon={icons.logic()} handles={handles}>
            <div className="space-y-3">
                <span className="text-[10px] text-slate-500 font-medium">If input satisfies:</span>
                <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                    <option value="==">Equals</option>
                    <option value="!=">Not Equals</option>
                    <option value=">">Greater Than</option>
                    <option value="<">Less Than</option>
                    <option value="contains">Contains</option>
                </select>
                <div className="flex justify-between text-[9px] font-bold px-1 pt-1 border-t border-slate-50">
                    <span className="text-green-600 uppercase tracking-tight">True Path</span>
                    <span className="text-red-600 uppercase tracking-tight">False Path</span>
                </div>
            </div>
        </BaseNode>
    );
};
