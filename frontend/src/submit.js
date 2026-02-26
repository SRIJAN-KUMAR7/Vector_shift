// submit.js

import { useStore } from './store';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

export const SubmitButton = () => {
    const { nodes, edges } = useStore();

    const handleSubmit = async () => {
        const loadingToast = toast.loading('Analyzing pipeline...');
        try {
            const payload = {
                nodes: nodes.map(node => ({ id: node.id })),
                edges: edges.map(edge => ({ source: edge.source, target: edge.target }))
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Server error: ${response.status}`);
            }

            const data = await response.json();

            toast.success(
                (t) => (
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-800">Pipeline Analysis</span>
                        <div className="text-sm text-slate-600 flex flex-col">
                            <span>num_nodes: <span className="font-mono font-bold text-blue-600">{data.num_nodes}</span></span>
                            <span>num_edges: <span className="font-mono font-bold text-blue-600">{data.num_edges}</span></span>
                            <span>is_dag: <span className={`font-bold ${data.is_dag ? 'text-green-600' : 'text-red-600'}`}>{data.is_dag ? 'Yes' : 'No'}</span></span>
                        </div>
                    </div>
                ),
                { id: loadingToast, duration: 5000 }
            );
        } catch (error) {
            console.error('Submission failed:', error);
            toast.error(
                `Analysis failed: ${error.message}`,
                { id: loadingToast }
            );
        }
    };

    return (
        <button
    type="button"
    onClick={handleSubmit}
    className="
        group
        relative
        flex items-center gap-2
        px-3 py-2.5
        bg-slate-900
        text-white
        text-sm font-semibold tracking-tight
        shadow-md
        transition-all duration-200 ease-out
        hover:bg-slate-800
        hover:shadow-lg
        hover:-translate-y-[1px]
        active:translate-y-0
        active:scale-[0.98]
        focus:outline-none
        focus:ring-2 focus:ring-slate-400/40
        focus:ring-offset-2 focus:ring-offset-white
        disabled:opacity-50 disabled:cursor-not-allowed
        mb-2
    "
>
    <span>Submit</span>
    <PaperAirplaneIcon className="
        h-4 w-4
        transition-all duration-200
        group-hover:translate-x-1
    " />
</button>
    );
};