import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DroppedItem, Position } from "@/types/canvas";
import { renderIcon } from "@/utils/iconUtils";
import { NodeConnector } from "./NodeConnector";

interface WorkflowNodeProps {
  item: DroppedItem;
  isFirst: boolean;
  onDelete: () => void;
  onStartConnection: () => void;
  onCompleteConnection: () => void;
  isConnecting: boolean;
  isConnectingNode: boolean;
  onDrag: (position: Position) => void;
}

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  item,
  isFirst,
  onDelete,
  onStartConnection,
  onCompleteConnection,
  isConnecting,
  isConnectingNode,
  onDrag,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    const rect = nodeRef.current?.getBoundingClientRect();
    if (rect) {
      dragStartPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const rect = nodeRef.current?.parentElement?.getBoundingClientRect();
    if (rect) {
      onDrag({
        x: e.clientX - rect.left - dragStartPos.current.x,
        y: e.clientY - rect.top - dragStartPos.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <Box
      ref={nodeRef}
      className={`absolute p-3 bg-white rounded-lg shadow-lg border border-gray-200 cursor-move group min-w-[160px]
        hover:shadow-xl transition-shadow ${
          isDragging ? "pointer-events-none" : ""
        }`}
      sx={{
        left: item.position.x,
        top: item.position.y,
        transform: "translate(-50%, -50%)",
      }}
      onMouseDown={handleMouseDown}
    >
      <IconButton
        size="small"
        className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2 bg-white shadow-md hover:bg-red-50"
        onClick={onDelete}
      >
        <CloseIcon className="text-red-500" sx={{ fontSize: 16 }} />
      </IconButton>

      <Box className="flex items-center gap-3 relative">
        {!isFirst && (
          <NodeConnector
            type="input"
            nodeId={item.id}
            position={item.position}
            onConnectionStart={onStartConnection}
            onConnectionComplete={onCompleteConnection}
            disabled={!isConnecting || isConnectingNode}
            active={isConnectingNode}
          />
        )}

        <div className="flex items-center gap-2 px-1">
          {renderIcon(item.iconName, item.iconColor)}
          <span className="text-sm font-medium">{item.name}</span>
        </div>

        <NodeConnector
          type="output"
          nodeId={item.id}
          position={item.position}
          onConnectionStart={onStartConnection}
          onConnectionComplete={onCompleteConnection}
          disabled={isConnecting && !isConnectingNode}
          active={isConnectingNode}
        />
      </Box>

      <div className="text-xs text-gray-500 mt-1">{item.description}</div>
    </Box>
  );
};
