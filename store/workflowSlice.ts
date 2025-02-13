import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DroppedItem, Connection, Position } from "@/types/canvas";

interface WorkflowState {
  nodes: DroppedItem[];
  connections: Connection[];
}

const loadState = (): WorkflowState => {
  try {
    const serializedState = localStorage.getItem("workflowState");
    if (serializedState === null) {
      return {
        nodes: [],
        connections: [],
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading workflow state:", err);
    return {
      nodes: [],
      connections: [],
    };
  }
};

const initialState: WorkflowState = loadState();

const saveState = (state: WorkflowState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("workflowState", serializedState);
  } catch (err) {
    console.error("Error saving workflow state:", err);
  }
};

export const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<DroppedItem>) => {
      const isFirst = state.nodes.length === 0;

      if (!isFirst) {
        state.nodes.forEach((node, index) => {
          node.data.isFirstNode = index === 0;
        });
      }

      const newNode = {
        ...action.payload,
        data: {
          ...action.payload.data,
          isFirstNode: isFirst,
        },
      };

      state.nodes.push(newNode);
      saveState(state);
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: Position }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.position = action.payload.position;
        saveState(state);
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      const removedNodeIndex = state.nodes.findIndex(
        (node) => node.id === action.payload
      );

      state.nodes = state.nodes.filter((node) => node.id !== action.payload);

      if (removedNodeIndex === 0 && state.nodes.length > 0) {
        state.nodes[0].data.isFirstNode = true;
      }

      state.connections = state.connections.filter(
        (conn) => conn.from !== action.payload && conn.to !== action.payload
      );

      saveState(state);
    },
    addConnection: (
      state,
      action: PayloadAction<{ from: string; to: string }>
    ) => {
      const { from, to } = action.payload;
      if (from !== to) {
        const connectionExists = state.connections.some(
          (conn) => conn.from === from && conn.to === to
        );

        if (!connectionExists) {
          state.connections.push({
            id: `${from}-${to}`,
            from,
            to,
          });
          saveState(state);
        }
      }
    },
    removeConnection: (state, action: PayloadAction<string>) => {
      state.connections = state.connections.filter(
        (conn) => conn.id !== action.payload
      );
      saveState(state);
    },
    updateNodeFirstStatus: (
      state,
      action: PayloadAction<{ id: string; isFirstNode: boolean }>
    ) => {
      if (action.payload.isFirstNode) {
        state.nodes.forEach((node) => {
          node.data.isFirstNode = false;
        });
      }

      const node = state.nodes.find((node) => node.id === action.payload.id);
      if (node) {
        node.data.isFirstNode = action.payload.isFirstNode;
        saveState(state);
      }
    },
    clearState: (state) => {
      state.nodes = [];
      state.connections = [];
      localStorage.removeItem("workflowState");
    },
  },
});

export const {
  addNode,
  updateNodePosition,
  removeNode,
  addConnection,
  removeConnection,
  updateNodeFirstStatus,
  clearState,
} = workflowSlice.actions;

export default workflowSlice.reducer;
