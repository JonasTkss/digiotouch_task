import React from "react";
import { Position } from "@/types/canvas";

interface NodeConnectorProps {
  type: "input" | "output";
  nodeId: string;
  position: Position;
  onConnectionStart: (nodeId: string, position: Position) => void;
  onConnectionComplete: (nodeId: string) => void;
  disabled?: boolean;
  active?: boolean;
}

export const NodeConnector: React.FC<NodeConnectorProps> = ({
  type,
  nodeId,
  position,
  onConnectionStart,
  onConnectionComplete,
  disabled,
  active,
}) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (type === "output" && !disabled) {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const startPosition = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      onConnectionStart(nodeId, startPosition);
    }
  };

  const handleMouseUp = () => {
    if (type === "input" && !disabled) {
      onConnectionComplete(nodeId);
    }
  };

  return (
    <div
      className={`w-3 h-3 rounded-full cursor-pointer transition-all absolute top-1/2 transform -translate-y-1/2
        ${
          type === "input"
            ? "left-0 -translate-x-1/2"
            : "right-0 translate-x-1/2"
        }
        ${
          disabled
            ? "bg-gray-300"
            : active
            ? "bg-blue-600 scale-125 ring-4 ring-blue-100"
            : "bg-blue-500 hover:bg-blue-600 hover:scale-110"
        }
      `}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};
