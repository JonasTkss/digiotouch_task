import React, { useState } from "react";
import { EdgeProps, getBezierPath } from "reactflow";
import DeleteIcon from "@mui/icons-material/Close";

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  ...props
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const [isHovered, setIsHovered] = useState(false);

  const edgeStyle = {
    ...props.style,
    stroke: isHovered || selected ? "#60a5fa" : "#94a3b8",
    strokeWidth: 2,
    transition: "none",
    cursor: "pointer",
  };

  const handleEdgeClick = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    props.data?.onEdgesDelete?.([{ id }]);
  };

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEdgeClick}
    >
      <path
        data-testid="edge-path"
        className="react-flow__edge-path"
        d={edgePath}
        style={edgeStyle}
      />
      <foreignObject
        width={24}
        height={24}
        x={labelX - 12}
        y={labelY - 12}
        className="cursor-pointer"
        onClick={handleEdgeClick}
        style={{ pointerEvents: "all" }}
      >
        <div className="flex items-center justify-center w-6 h-6">
          <DeleteIcon className="text-red-500" sx={{ fontSize: 16 }} />
        </div>
      </foreignObject>
    </g>
  );
};
