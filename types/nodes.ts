import { NodeProps } from "reactflow";

export interface CustomNodeData {
  isFirstNode: boolean;
  name: string;
  description: string;
  iconName: string;
  iconColor: string;
  onDelete: () => void;
}

export type CustomNodeProps = NodeProps<CustomNodeData>;
