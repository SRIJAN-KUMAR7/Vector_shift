// MergeNode.js--new
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { icons } from '../icons';

export const MergeNode = ({ id, data }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-input1`, style: { top: '30%' } },
        { type: 'target', position: Position.Left, id: `${id}-input2`, style: { top: '70%' } },
        { type: 'source', position: Position.Right, id: `${id}-merged` }
    ];

    return (
        <BaseNode id={id} label="Merge" icon={icons.merge()} handles={handles}>
            <div className="flex flex-col gap-1">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Combines multiple inputs into a single merged output stream.
                </p>
            </div>
        </BaseNode>
    );
};
