import React from 'react';
import { useViewport, Panel } from 'reactflow';

export const ZoomIndicator = () => {
    const { zoom } = useViewport();

    return (
        <Panel position="top-right" className="m-4">
            <div className="bg-white px-2 py-1 rounded shadow-sm border border-slate-200 text-[10px] font-bold text-slate-500 text-center min-w-[32px] select-none pointer-events-none">
                {Math.round(zoom * 100)}%
            </div>
        </Panel>
    );
};