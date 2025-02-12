import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DroppedItem, Connection } from "@/types/canvas";

interface WorkflowState {
  nodes: DroppedItem[];
  connections: Connection[];
}

const initialState: WorkflowState = {
  nodes: [],
  connections: [],
};

export const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<DroppedItem>) => {
      state.nodes.push(action.payload);
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: Position }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.position = action.payload.position;
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
      state.connections = state.connections.filter(
        (conn) => conn.from !== action.payload && conn.to !== action.payload
      );
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
        }
      }
    },
    removeConnection: (state, action: PayloadAction<string>) => {
      state.connections = state.connections.filter(
        (conn) => conn.id !== action.payload
      );
    },
  },
});

export const {
  addNode,
  updateNodePosition,
  removeNode,
  addConnection,
  removeConnection,
} = workflowSlice.actions;

export default workflowSlice.reducer;
