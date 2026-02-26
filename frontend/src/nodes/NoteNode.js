// NoteNode.js--new
import { useState } from 'react';
import { BaseNode } from './baseNode';
import { icons } from '../icons';

export const NoteNode = ({ id, data }) => {
    const [note, setNote] = useState(data?.note || 'Work in progress...');

    return (
        <BaseNode
            id={id}
            label="Sticky Note"
            icon={icons.note()}
            handles={[]}
        >
            <div className="bg-amber-50 p-3 -m-2 rounded-md border border-amber-100 min-h-[100px] flex flex-col shadow-inner">
                <span className="text-[8px] text-amber-400 font-bold uppercase mb-1">Editor Note</span>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onFocus={() => {
                        if (note === 'Work in progress...') {
                            setNote('');
                        }
                    }}
                    className="flex-1 bg-transparent border-none outline-none text-xs text-amber-900 resize-none font-sans leading-relaxed italic"
                    placeholder="Write something..."
                />
            </div>
        </BaseNode>
    );
};
