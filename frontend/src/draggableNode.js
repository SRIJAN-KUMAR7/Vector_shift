import { icons } from './icons';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  const getIcon = (type) => {
    const iconFunc = icons[type];
    return iconFunc ? iconFunc("h-6 w-6") : icons.text("h-6 w-6");
  };

  return (
    <div
      className={`${type} cursor-grab flex flex-col items-center justify-center 
      min-w-[100px] h-[100px] p-4 bg-white border border-slate-200 
      rounded-xl hover:border-black transition-all duration-300 
      active:cursor-grabbing`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <div className="mb-3 text-slate-500 transition-colors duration-300">
        {getIcon(type)}
      </div>

      <span className="text-[12px] font-bold text-slate-500 
        transition-colors duration-300 tracking-tight text-center leading-tight">
        {label}
      </span>
    </div>
  );
};