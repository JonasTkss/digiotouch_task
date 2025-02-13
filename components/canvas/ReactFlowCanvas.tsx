import React from "react";
import ReactFlow, { ConnectionMode } from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "./CustomNode";
import { useWorkflowCanvas } from "@/hooks/useWorkflowCanvas";
import { useReactFlow } from "@/hooks/useReactFlow";
import { CustomEdge } from "./CustomEdge";

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

export const ReactFlowCanvas = () => {
  const { handleDragOver, handleDrop } = useWorkflowCanvas();
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeDragStop,
    onEdgesDelete,
  } = useReactFlow();

  return (
    <div
      className="h-screen w-full"
      data-testid="react-flow-canvas"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Strict}
        maxZoom={1}
        minZoom={1}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={false}
        panOnDrag={false}
        edgesFocusable={true}
        edgesUpdatable={true}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        deleteKeyCode={"Backspace"}
        defaultEdgeOptions={{
          type: "custom",
          animated: false,
        }}
      />
    </div>
  );
};
