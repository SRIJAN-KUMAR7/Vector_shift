# Vector Shift - Pipeline Workflow Builder

A professional, low-code interface for building and analyzing computational pipelines. This project focuses on developer experience, visual clarity, and logical integrity.

## Table of Contents
- [Part 1: Node Abstraction](#part-1-node-abstraction)
- [Part 2: Styling](#part-2-styling)
- [Part 3: Text Node Logic](#part-3-text-node-logic)
- [Part 4: Backend Integration](#part-4-backend-integration)
- [Project Features](#project-features)

---

## Part 1: Node Abstraction
The core of this application is a highly flexible **`BaseNode`** abstraction. Instead of reinventing the wheel for every node, we built a foundation that handles:
- **Consistent Layout**: A unified header with icons, titles, and a dedicated delete action.
- **Handle Management**: A dynamic system that maps an array of handle definitions to React Flow's connection points.
- **Zustand Integration**: Direct connection to the application state for node deletion and lifecycle management.
- **Visual Feedback**: Hover states and focus rings that make the interface feel responsive and modern.

This abstraction allowed us to rapidly scale from 4 basic nodes to 12+ specialized nodes (LLM, Logic, Merge, Request, etc.) without duplicating logic.

## Part 2: Styling
We prioritized a **"Wow" factor** using a clean, modern aesthetic powered by Tailwind CSS:
- **Glassmorphism**: The toolbar utilizes a `backdrop-blur` effect with white opacity, making it feel grounded yet lightweight.
- **Micro-animations**: Smooth transitions on node placement, subtle scale effects on button clicks, and "grabbing" cursor icons enhance the tactile feel.
- **Visual Polish**: 
    - A custom slate-themed dot background for the canvas.
    - Shadow-elevation logic for active vs. inactive nodes.
    - Integrated React Flow `Panel` for the Submit action, giving it a native, anchored feel within the workspace.
- **Premium Components**: Custom Zoom Indicators and a Starting Guide that appears when the workspace is empty, helping new users find their way.

## Part 3: Text Node Logic
The **`TextNode`** is more than just a label—it's a dynamic data-entry point.
- **Auto-resize**: The textarea intelligently expands as you type, ensuring your content is never truncated.
- **Dynamic Variable Ingestion**: Using a custom Regex engine (`/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`), the node identifies variables on the fly.
- **Adaptive Interface**: As variables are detected (e.g., `{{user_name}}`), the node automatically spawns a new target handle on the left, turning the text node into a logical connector.
- **Variable Visualizer**: Detected variables are instantly highlighted in blue tags at the bottom of the node for immediate feedback.

## Part 4: Backend Integration
The frontend connects to a robust **FastAPI** backend to validate the mathematical and logical structure of the pipeline.
- **Kahn's Algorithm**: We implemented a topological sort algorithm to accurately detect cycles. If your pipeline loops back on itself incorrectly, the system will flag it.
- **Strict Response Schema**: The backend provides precise metadata including the total number of nodes, total edges, and a boolean `is_dag` status.
- **Toast Feedback**: Instead of intrusive popups, we integrated `react-hot-toast` to deliver analysis results in beautiful, non-blocking notification cards.
- **Error Resilience**: The submission logic includes full error handling to catch network issues or malformed data gracefully.

---

## Project Features
- **Undo/Redo History**: A full history stack with keyboard shortcuts (Ctrl+Z / Ctrl+Y).
- **Clear Workspace**: One-click reset with a safety confirmation dialog.
- **Smooth Connections**: Animated `smoothstep` edges for a professional look.
- **Toolbox Diversity**: 12+ draggable node types covering Input, Output, Logic, and AI modules.
- **Integrated UI**: Minimap and Controls are custom-styled to match the application's slate/blue theme.

---

### Getting Started
1. **Frontend**: `cd frontend && npm install && npm start`
2. **Backend**: `cd backend && pip install -r requirements.txt && uvicorn main:app --reload`
