// icons.js
import React from 'react';
import {
    ArrowLeftOnRectangleIcon,
    ArrowRightOnRectangleIcon,
    SparklesIcon,
    DocumentTextIcon,
    VariableIcon,
    ArrowsRightLeftIcon,
    ArrowsPointingInIcon,
    GlobeAltIcon,
    DocumentIcon,
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

export const icons = {
    customInput: (className = "h-4 w-4") => <ArrowLeftOnRectangleIcon className={className} />,
    customOutput: (className = "h-4 w-4") => <ArrowRightOnRectangleIcon className={className} />,
    llm: (className = "h-4 w-4") => <SparklesIcon className={className} />,
    text: (className = "h-4 w-4") => <DocumentTextIcon className={className} />,
    variable: (className = "h-4 w-4") => <VariableIcon className={className} />,
    logic: (className = "h-4 w-4") => <ArrowsRightLeftIcon className={className} />,
    merge: (className = "h-4 w-4") => <ArrowsPointingInIcon className={className} />,
    request: (className = "h-4 w-4") => <GlobeAltIcon className={className} />,
    markdown: (className = "h-4 w-4") => <DocumentIcon className={className} />,
    note: (className = "h-4 w-4") => <PencilIcon className={className} />,
    undo: (className = "h-4 w-4") => <ArrowUturnLeftIcon className={className} />,
    redo: (className = "h-4 w-4") => <ArrowUturnRightIcon className={className} />,
    trash: (className = "h-4 w-4") => <TrashIcon className={className} />,
};
