// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { icons } from './icons';
import { toast } from 'react-hot-toast';

const selector = (state) => ({
    undo: state.undo,
    redo: state.redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    clearWorkspace: state.clearWorkspace,
});

export const PipelineToolbar = () => {
    const { undo, redo, canUndo, canRedo, clearWorkspace } = useStore(selector, shallow);

    return (
        <div className="p-4 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
            <div className="max-w-screen-2xl mx-auto flex flex-col gap-4">
                <div className="flex items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-6">

                        <div className="flex flex-wrap gap-2 group">
                            <DraggableNode type='customInput' label='Input' />
                            <DraggableNode type='llm' label='LLM' />
                            <DraggableNode type='customOutput' label='Output' />
                            <DraggableNode type='text' label='Text' />
                        </div>

                        <div className="hidden lg:flex items-center px-6">
                            <div className="h-8 w-px bg-slate-200"></div>
                        </div>

                        <div className="flex flex-wrap gap-2 group">
                            <DraggableNode type='merge' label='Merge' />
                            <DraggableNode type='logic' label='Logic' />
                            <DraggableNode type='request' label='Request' />
                            <DraggableNode type='markdown' label='Markdown' />
                            <DraggableNode type='note' label='Note' />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">

                        <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/50 shadow-inner">
                            <button
                                onClick={undo}
                                disabled={!canUndo}
                                className={`p-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${canUndo
                                    ? 'bg-white text-slate-700 shadow-sm border border-slate-200/80 hover:bg-slate-50 hover:text-blue-600 active:scale-90 hover:shadow-md'
                                    : 'text-slate-300 cursor-not-allowed opacity-40'
                                    }`}
                                title="Undo (Ctrl+Z)"
                            >
                                {icons.undo("h-4 w-4")}
                            </button>
                            <button
                                onClick={redo}
                                disabled={!canRedo}
                                className={`p-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${canRedo
                                    ? 'bg-white text-slate-700 shadow-sm border border-slate-200/80 hover:bg-slate-50 hover:text-blue-600 active:scale-90 hover:shadow-md'
                                    : 'text-slate-300 cursor-not-allowed opacity-40'
                                    }`}
                                title="Redo (Ctrl+Y / Ctrl+Shift+Z)"
                            >
                                {icons.redo("h-4 w-4")}
                            </button>
                        </div>


                        <button
                            onClick={() => {
                                toast((t) => (
                                    <div className="flex flex-col gap-3 p-1">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-red-50 rounded-lg text-red-500">
                                                {icons.trash("h-4 w-4")}
                                            </div>
                                            <span className="text-sm font-bold text-slate-800">Clear workspace?</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 leading-relaxed">
                                            This will permanently delete all nodes and connections. This action cannot be undone.
                                        </p>
                                        <div className="flex justify-end gap-2 mt-1">
                                            <button
                                                onClick={() => toast.dismiss(t.id)}
                                                className="px-3 py-1.5 text-[10px] font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors uppercase tracking-wider"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => {
                                                    clearWorkspace();
                                                    toast.dismiss(t.id);
                                                    toast.success('Workspace cleared', {
                                                        duration: 2000,
                                                        position: 'bottom-right',
                                                        style: {
                                                            borderRadius: '12px',
                                                            background: '#1e293b',
                                                            color: '#fff',
                                                            fontSize: '12px',
                                                            fontWeight: '600',
                                                            padding: '12px 20px',
                                                        },
                                                    });
                                                }}
                                                className="px-4 py-1.5 text-[10px] font-bold bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors shadow-sm uppercase tracking-wider"
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                    </div>
                                ), {
                                    duration: 5000,
                                    position: 'top-center',
                                    style: {
                                        minWidth: '300px',
                                        borderRadius: '16px',
                                        background: '#fff',
                                        color: '#333',
                                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                                        border: '1px solid #f1f5f9',
                                        padding: '16px',
                                    },
                                });
                            }}
                            className="group flex items-center gap-2 px-4 py-2.5 bg-white text-red-500 border border-slate-200 rounded-2xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95 font-semibold text-sm"
                        >
                            {icons.trash("h-4 w-4 transition-transform group-hover:rotate-12")}
                            <span>Clear All</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
