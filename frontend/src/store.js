// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

const MAX_HISTORY = 50;

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  past: [],
  future: [],


  recordHistory: () => {
    const { nodes, edges, past } = get();
    const newState = { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) };


    if (past.length > 0) {
      const last = past[past.length - 1];
      if (JSON.stringify(last.nodes) === JSON.stringify(newState.nodes) &&
        JSON.stringify(last.edges) === JSON.stringify(newState.edges)) {
        return;
      }
    }

    set({
      past: [...past.slice(-MAX_HISTORY + 1), newState],
      future: [],
    });
  },

  undo: () => {
    const { past, future, nodes, edges } = get();
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    const current = { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) };

    set({
      nodes: previous.nodes,
      edges: previous.edges,
      past: newPast,
      future: [current, ...future.slice(0, MAX_HISTORY - 1)],
    });
  },

  redo: () => {
    const { past, future, nodes, edges } = get();
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);
    const current = { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) };

    set({
      nodes: next.nodes,
      edges: next.edges,
      past: [...past.slice(-MAX_HISTORY + 1), current],
      future: newFuture,
    });
  },

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    get().recordHistory();
    set({
      nodes: [...get().nodes, node]
    });
  },

  deleteNode: (nodeId) => {
    get().recordHistory();
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    get().recordHistory();
    set({
      edges: addEdge({
        ...connection,
        type: 'smoothstep',
        animated: true,
        markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' }
      }, get().edges),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    get().recordHistory();
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      }),
    });
  },

  clearWorkspace: () => {
    get().recordHistory();
    set({
      nodes: [],
      edges: [],
    });
  },
}));
