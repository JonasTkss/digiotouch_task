import React from "react";
import { WorkflowItem } from "@/types/workflow";
import { DroppedItem } from "@/types/canvas";
import { useAppDispatch, useAppSelector } from "./redux";
import {
  addNode,
  removeNode,
  updateNodeFirstStatus,
} from "@/store/workflowSlice";
import { RootState } from "@/store/store";

export const useWorkflowCanvas = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state: RootState) => state.workflow.nodes);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    try {
      const data = e.dataTransfer.getData("application/json");
      if (!data) return;

      const item: WorkflowItem = JSON.parse(data);
      const canvas = e.currentTarget.getBoundingClientRect();

      const position = {
        x: e.clientX - canvas.left,
        y: e.clientY - canvas.top,
      };

      const newNodeId = `${item.name}-${Date.now()}`;

      const isFirstNode = nodes.length === 0;

      const newItem: DroppedItem = {
        ...item,
        id: newNodeId,
        icon: item.icon,
        position,
        data: {
          name: item.name,
          description: item.description,
          iconName:
            typeof item.icon.type === "function"
              ? (item.icon.type as any).displayName ||
                (item.icon.type as any).name
              : "",
          iconColor: item.icon.props.className,
          isFirstNode: isFirstNode,
          onDelete: () => handleDelete(newNodeId),
        },
        connectors: {
          inputs: [],
          outputs: [],
        },
      };

      dispatch(addNode(newItem));
    } catch (error) {
      console.error("Error dropping item:", error);
    }
  };

  const handleDelete = (id: string) => {
    const deletedNodeIndex = nodes.findIndex((node) => node.id === id);
    if (deletedNodeIndex === 0 && nodes.length > 1) {
      const nextNode = nodes[1];
      dispatch(removeNode(id));
      dispatch(updateNodeFirstStatus({ id: nextNode.id, isFirstNode: true }));
    } else {
      dispatch(removeNode(id));
    }
  };

  return {
    handleDragOver,
    handleDrop,
    handleDelete,
  };
};
