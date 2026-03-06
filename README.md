VectorShift – Pipeline Workflow Builder

A professional, low-code interface for building and analyzing computational pipelines. This project emphasizes component abstraction, dynamic graph behavior, visual clarity, and mathematical integrity.

## Overview
This application allows users to:
- Visually construct directed pipelines
- Dynamically generate input handles from text templates
- Connect logical components using React Flow
- Validate structural correctness via a FastAPI backend
- Detect cycles using graph theory (Kahn’s Algorithm)

The system is architected across four major pillars:
1. Node Abstraction & Handle Dynamics
2. Design Architecture & UX
3. Text Node Variable Engine
4. Backend Graph Validation

---

## 1. Node Abstraction & Handle Dynamics
At the core of the frontend is a reusable **`BaseNode`** abstraction. Instead of duplicating logic across node types, I created a structured foundation that handles:
- **Header Rendering & Icons**: Integrated support for Heroicons and consistent labeling.
- **Node Actions**: Built-in delete functionality tied directly to the Zustand store.
- **Dynamic Handle Mapping**: A system that translates node metadata into interactive handles.

### Dynamic Handle Re-indexing
React Flow does not automatically re-calculate handle positions when handles are added or removed dynamically. To solve this, I used a `useEffect` hook in the `BaseNode`:

```javascript
useEffect(() => {
  // Forces React Flow to refresh its internal geometry when handles change
  updateNodeInternals(id);
}, [id, handles, updateNodeInternals]);
```

### Handle Stability & Uniqueness
Every handle uses a deterministic ID: `id: "${id}-${varName}"`.
This ensures that React Flow avoids ID collisions even when multiple nodes contain variables with identical names.

---

## 2. Design Architecture & UX
The UI is built using Tailwind CSS with an emphasis on subtle depth and responsive feedback.

### Visual Identity
- **Premium Aesthetics**: Slate-800 for depth, blue-500 for interactivity, and glassmorphic effects on the toolbar.
- **Dotted Canvas**: Custom background aesthetics managed via React Flow's `Background` component.

### Micro-Interactions
- **Contextual Cursors**: The "grabbing" hand appears only on interactive elements.
- **Non-blocking Feedback**: I replaced standard browser alerts with `react-hot-toast` for both success notifications and critical clear-workspace confirmations.
- **Active States**: Dynamic scale and shadow elevation when nodes are selected.

---

## 3. Text Node Variable Engine
The `TextNode` transforms templated text into structured graph inputs in real-time.

### Regex-Based Variable Detection
I used a precise regex pattern: `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`

**Features:**
- **Deduplication**: A `Set` prevents the creation of redundant handles for duplicate variables.
- **Performance**: Deep equality checks prevent unnecessary re-renders during typing.
- **Auto-Resize**: The textarea height adjusts dynamically to the content.

### Variable Visualization
To provide immediate feedback, detected variables are displayed as **blue tags** at the bottom of the node.

---

## 4. Backend Graph Validation
The backend is implemented using FastAPI and performs mathematical validation of the pipeline's structure.

### DAG Detection via Kahn’s Algorithm
I implemented Kahn’s Topological Sort algorithm to ensure the pipeline forms a Directed Acyclic Graph (DAG).
- **Adjacency Mapping**: Logic to convert frontend edges into a directed graph structure.
- **Cycle Detection**: The system calculates the in-degree of every node and identifies any logical loops that would break the pipeline flow.

### Clean Contract
The backend return schema is kept minimal and predictable:
```json
{
  "num_nodes": int,
  "num_edges": int,
  "is_dag": bool
}
```

---

## Feature Highlights
- **10 specialized node types** (LLM, Request, Logic, Note, etc.).
- **Undo / Redo** stack for mistake-free editing.
- **Dynamic Handle Spacing**: Automatic vertical distribution of generated input handles.
- **Integrated Submission**: Native React Flow `Panel` for pipeline analysis.

---

## Setup Instructions

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
###
Completed the final assignment by Vector_shift YC 23