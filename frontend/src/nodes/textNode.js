// textNode.js

import { useState, useRef, useEffect, useCallback } from 'react';
import { Position, Handle } from 'reactflow';
import { BaseNode } from './baseNode';
import { icons } from '../icons';

const Tooltip = ({ label, sublabel, directive, position = 'right' }) => (
    <div className={`absolute z-50 ${position === 'left' ? 'right-full mr-3' : 'left-full ml-3'} top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100`}>
        <div className="bg-slate-900/95 backdrop-blur-sm text-white rounded-xl shadow-2xl py-2.5 px-3.5 min-w-[180px] border border-slate-700/50 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{label}</span>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-100 leading-none">{sublabel}</span>
                <p className="text-[8px] text-slate-400 leading-relaxed font-medium capitalize">
                    {directive}
                </p>
            </div>
            <div className={`absolute top-1/2 -translate-y-1/2 ${position === 'left' ? 'left-full border-l-slate-900/95' : 'right-full border-r-slate-900/95'} border-[6px] border-transparent`} />
        </div>
    </div>
);

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
    const matches = [];
    const seen = new Set();
    let match;
    VARIABLE_REGEX.lastIndex = 0;
    while ((match = VARIABLE_REGEX.exec(text)) !== null) {
        const varName = match[1];
        if (!seen.has(varName)) {
            seen.add(varName);
            matches.push(varName);
        }
    }
    return matches;
};

export const TextNode = ({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || '');
    const [variables, setVariables] = useState(() => extractVariables(data?.text || ''));
    const textareaRef = useRef(null);

    const autoResize = useCallback(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, []);

    useEffect(() => {
        autoResize();
    }, [currText, autoResize]);

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setCurrText(newText);

        const newVars = extractVariables(newText);
        setVariables(prev => {
            if (prev.length === newVars.length && prev.every((v, i) => v === newVars[i])) {
                return prev;
            }
            return newVars;
        });
    };

    const staticHandles = [
        { type: 'source', position: Position.Right, id: `${id}-output` }
    ];

    const variableHandles = variables.map((varName, i) => ({
        type: 'target',
        position: Position.Left,
        id: `${id}-${varName}`,
        style: { top: `${((i + 1) / (variables.length + 1)) * 100}%` }
    }));

    const allHandles = [...staticHandles, ...variableHandles];

    return (
        <BaseNode id={id} label="Text" icon={icons.text()} handles={allHandles}>
            <div className="flex flex-col gap-2 w-full">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Content</span>
                <textarea
                    ref={textareaRef}
                    value={currText}
                    onChange={handleTextChange}
                    placeholder={'Type here... Use {{variable}} for inputs.'}
                    className="text-xs p-2 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all resize-none w-full bg-slate-50 focus:bg-white leading-relaxed"
                    style={{ minHeight: '80px', overflowY: 'hidden' }}
                />


                {variables.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {variables.map((v) => (
                            <span
                                key={v}
                                className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-50 text-blue-600 border border-blue-100"
                            >
                                <span className="opacity-50 mr-0.5">{'{'}</span>
                                {v}
                                <span className="opacity-50 ml-0.5">{'}'}</span>
                            </span>
                        ))}
                    </div>
                )}

                <p className="text-[9px] text-slate-400 italic">
                    Use <code className="font-mono bg-slate-100 px-1 rounded">{'{{variable}}'}</code> to create dynamic inputs.
                </p>
            </div>
        </BaseNode>
    );
};
