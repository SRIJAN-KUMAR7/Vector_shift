# VectorShift – Pipeline Workflow Builder

A professional, low-code interface for building and analyzing computational pipelines. This project emphasizes component abstraction, dynamic graph behavior, visual clarity, and mathematical integrity.

## Overview
This application allows me to:
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
- Header rendering & Icon injection
- Delete functionality
- Dynamic handle mapping
- State integration

### Dynamic Handle Re-indexing
React Flow does not automatically recalculate handle positions when handles are added or removed dynamically. To solve this, I used:

```javascript
useEffect(() => {
  updateNodeInternals(id);
}, [id, handles, updateNodeInternals]);
```

**Without this:**
- Newly created variable handles would snap connections to the node center
- Edges would visually break
- React Flow would not re-index correctly

### Handle Stability
Every handle uses a deterministic ID: `id: "${id}-${varName}"`
This prevents cross-node handle confusion and ID collisions. Two nodes both using `{{input}}` become `nodeA-input` and `nodeB-input`, ensuring isolation.

---

## 2. Design Architecture & UX
The UI is built using Tailwind CSS with an emphasis on subtle depth, spatial clarity, and interaction feedback.

### Visual Identity
- **Slate-based background** for depth with blue accents for interaction.
- **Glassmorphic toolbar** (`bg-white/70 backdrop-blur-md`).
- **Custom dotted canvas background** and smooth animated edges.

### Micro-Interactions
- **Grabbing cursor** only when hovering over draggable nodes.
- **Slight scale and shadow elevation** on interaction.
- **Non-blocking toast notifications** and custom confirmation UI for “Clear Workspace”.

---

## 3. Text Node Variable Engine
The `TextNode` transforms templated text into structured graph inputs.

### Regex-Based Variable Detection
I used the pattern: `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`

| Part | Meaning |
| :--- | :--- |
| `\{\{` | Match literal {{ |
| `\s*` | Optional whitespace |
| `[a-zA-Z_$]` | Valid JavaScript identifier start |
| `[a-zA-Z0-9_$]*` | Valid identifier continuation |
| `\s*` | Optional whitespace |
| `\}\}` | Match literal }} |
| `g` | Global search flag |

**Why restrict to JS Identifiers?** To prevent malformed handles, avoid injection risks, and ensure deterministic ID mapping.

### Deduplication & Performance
- **Deduplication Strategy**: Using a `Set` prevents duplicate handles for the same variable.
- **Performance Optimization**: Before updating state, I check if the variables have actually changed to prevent unnecessary re-renders and edge flickering.

### Dynamic Handle Positioning
Handles are evenly spaced: `top: "${((i + 1) / (variables.length + 1)) * 100}%"`. This ensures no overlapping and visual symmetry as the variable count increases.

### Localized Tooltip System
To improve clarity without cluttering the card:
- Tooltips appear when hovering over left-side dynamic handles.
- The tooltip sits outside the card boundary.
- Tooltip logic is isolated within `TextNode` to maintain abstraction cleanliness.

---

## 4. Backend Graph Validation
The backend is implemented using FastAPI and performs structural validation of the pipeline.

### DAG Detection Using Kahn’s Algorithm
A pipeline must form a Directed Acyclic Graph (DAG). I implemented Kahn’s Topological Sort algorithm:
1. Build adjacency list and compute in-degree of each node.
2. Add all nodes with in-degree 0 to a queue.
3. Process the queue: Remove node, decrease in-degree of neighbors, add to queue if in-degree becomes 0.
4. Compare processed count with total nodes.

**Time Complexity**: O(V + E) — optimal for directed graph cycle detection.

### Self-Loop Detection
For an edge `A → A`, the in-degree of A is 1. The queue starts empty, so no node is processed, and a cycle is detected automatically.

### Strict Response Schema
The backend returns a clean API contract:
```json
{
  "num_nodes": int,
  "num_edges": int,
  "is_dag": bool
}
```

---

## Implementation Challenges & Solutions

1. **Center Jump Bug**: Edges snapped to node center after dynamic handle creation. Fixed by forcing `updateNodeInternals(id)`.
2. **Handle ID Collisions**: Two nodes with the same variable name caused connection confusion. Fixed by prefixing handle IDs with parent node ID.
3. **UI Clutter**: Displaying variable names inside the card made it busy. Fixed by moving identification to hover-triggered tooltips outside the card boundary.

---

## Feature Highlights
- **12+ node types** with Undo / Redo via Zustand history stack.
- **Keyboard shortcuts** and auto-resizing textareas.
- **Dynamic variable ingestion** and smart handle spacing.
- **Backend cycle detection** with clean separation of concerns.

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
