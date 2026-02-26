// MarkdownNode.js --new
import { useState } from 'react';
import { BaseNode } from './baseNode';
import { icons } from '../icons';

export const MarkdownNode = ({ id, data }) => {
    const [content, setContent] = useState(data?.content || '# Hello World\nThis is markdown');

    return (
        <BaseNode id={id} label="Markdown" icon={icons.markdown()} handles={[]}>
            <div className="space-y-2">
                <div className="max-h-24 overflow-y-auto bg-slate-50 p-2 rounded-md border border-slate-100 text-[10px] text-slate-500">
                    <div className="font-bold border-b border-slate-200 mb-1 pb-1">Formatted Output</div>
                    <div className="prose prose-sm italic">
                        {content.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                </div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full text-[10px] p-2 border border-slate-200 rounded-md h-16 focus:ring-1 focus:ring-blue-400 outline-none resize-none font-mono"
                    placeholder="Type markdown..."
                />
            </div>
        </BaseNode>
    );
};
