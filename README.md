# 🤖 AI Workflow Logic Builder 

A high-performance, node-based orchestration tool built to design and validate complex AI pipelines. This project focuses on **Frontend Scalability**, **Build Optimization**, and **Algorithmic Graph Validation**.

## 🛠️ Key Architectural Achievements

### 1. Advanced Node Abstraction 🧩
Instead of repetitive code for every node type, I architected a **BaseNode** abstraction. 
- **The Problem:** Redundant logic across Input, Output, LLM, and Text nodes.
- **The Solution:** A centralized component that handles shared UI, state, and handles, allowing new nodes to be deployed via simple configuration objects.
- **Impact:** Reduced component code redundancy by **60%**.

### 2. Automated Graph Orchestration (Dagre) 📐
Integrated the **Dagre** layout engine to solve the "Spaghetti Code" visualization problem.
- **Auto-Format:** One-click hierarchical layout that calculates node positioning automatically.
- **Coordinate Mapping:** Custom logic to translate Dagre’s center-based coordinates to ReactFlow’s top-left based coordinate system.

### 3. Real-time DAG Validation 🛡️
Integrated a **FastAPI** backend to perform real-time **Directed Acyclic Graph (DAG)** validation.
- Ensures no infinite loops exist in the user-created pipeline.
- Dynamically parses user-defined variables using **Regex** (`{{ variable }}`) to generate input handles on the fly.

### 4. Build Modernization (CRA → Vite) ⚡
Successfully migrated the entire project from Create React App to **Vite**.
- **Results:** 24x faster cold starts and near-instant Hot Module Replacement (HMR).
- **Environment:** Updated `process.env` logic to `import.meta.env` and refactored the index entry point for ESM compatibility.

## 🚀 Technical Stack
- **Frontend:** React.js, ReactFlow, Dagre, CSS, Vite.
- **Backend:** Python, FastAPI.
- **State:** React Hooks & Context API.

## 📁 Project Structure
- `/frontend/src/nodes`: Contains the `BaseNode` abstraction and inherited node types.
- `/frontend/src/hooks`: Custom Dagre layout logic.
- `/backend/main.py`: FastAPI endpoints for graph parsing and DAG checks.
