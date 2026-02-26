// ui.js
import { useState,useCallback,useEffect,useRef } from 'react';
import ReactFlow, { Controls, Background, MiniMap, Panel } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { LogicNode } from './nodes/LogicNode';
import { RequestNode } from './nodes/RequestNode';
import { MarkdownNode } from './nodes/MarkdownNode';
import { NoteNode } from './nodes/NoteNode';
import { MergeNode } from './nodes/MergeNode';
import { StartingGuide } from './components/StartingGuide';
import { ZoomIndicator } from './components/ZoomIndicator';
import { SubmitButton } from './submit';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  logic: LogicNode,
  request: RequestNode,
  markdown: MarkdownNode,
  note: NoteNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  undo: state.undo,
  redo: state.redo,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    undo,
    redo,
  } = useStore(selector, shallow);


  useEffect(() => {
    const handleKeyDown = (event) => {
      const isZ = event.key.toLowerCase() === 'z';
      const isY = event.key.toLowerCase() === 'y';
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const isShift = event.shiftKey;

      if (isCtrlOrCmd && isZ) {
        if (isShift) {
          event.preventDefault();
          redo();
        } else {
          event.preventDefault();
          undo();
        }
      } else if (isCtrlOrCmd && isY) {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;


        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} className="relative bg-slate-50/50" style={{ width: '100vw', height: '75vh' }}>
        <StartingGuide nodesCount={nodes.length} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
        >
          <Background color="#cbd5e1" gap={gridSize} size={1} />
          <Controls className="bg-white border-slate-200 shadow-lg rounded-lg overflow-hidden" />
          <MiniMap className="bg-white border-slate-200 shadow-lg rounded-lg overflow-hidden" />
          <ZoomIndicator />
          <Panel position="bottom-center">
            <SubmitButton />
          </Panel>
        </ReactFlow>
      </div>
    </>
  )
}
