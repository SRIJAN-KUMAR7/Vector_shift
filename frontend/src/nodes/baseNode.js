
import { Handle, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { useEffect } from 'react';

const selector = (state) => ({
  deleteNode: state.deleteNode,
});

export const BaseNode = ({ id, label, icon, children, handles = [] }) => {
  const { deleteNode } = useStore(selector, shallow);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, handles, updateNodeInternals]);

  return (
    <div className="relative bg-white border-2 border-slate-200 rounded-lg shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-300 w-56 overflow-visible group">
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          {icon && <div className="text-blue-500">{icon}</div>}
          {!icon && <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-400 transition-colors duration-300"></div>}
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
        </div>
        <button
          onClick={() => deleteNode(id)}
          className="p-1 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-all duration-200 focus:outline-none"
          title="Delete Node"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>


      <div className="p-4 flex flex-col gap-3">
        {children}
      </div>

      {handles.map((handle, idx) => (
        <Handle
          key={handle.id || `${id}-handle-${idx}`}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-${idx}`}
          style={{
            zIndex: 10,
            width: '12px',
            height: '12px',
            background: '#fff',
            border: '2px solid #94a3b8',
            ...handle.style
          }}
          className="hover:!border-blue-500 hover:!bg-blue-50 transition-all duration-200 !w-3.5 !h-3.5"
        />
      ))}
    </div>
  );
};
