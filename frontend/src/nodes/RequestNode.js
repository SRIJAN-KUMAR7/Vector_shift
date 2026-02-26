// RequestNode.js--new
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { icons } from '../icons';

export const RequestNode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.url || 'https://api.example.com');
    const [method, setMethod] = useState(data?.method || 'GET');

    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-trigger` },
        { type: 'source', position: Position.Right, id: `${id}-response` }
    ];

    return (
        <BaseNode id={id} label="HTTP Request" icon={icons.request()} handles={handles}>
            <div className="space-y-3">
                <div className="flex gap-2">
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-1/3 text-[10px] p-1 border border-slate-200 rounded-md bg-slate-50 font-bold text-black-600 focus:outline-none"
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <div className="w-2/3 bg-slate-100 rounded-md px-2 py-1 flex items-center">
                        <span className="text-[9px] text-slate-400 font-mono truncate">Endpoint</span>
                    </div>
                </div>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full text-[10px] p-2 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-400 outline-none truncate font-mono"
                    placeholder="https://..."
                />
            </div>
        </BaseNode>
    );
};
