import { WorkflowItem } from "./workflow";

export interface Position {
  x: number;
  y: number;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
}

export interface DragConnection {
  fromId: string;
  fromPosition: Position;
  currentPosition: Position;
}

export interface DroppedItem extends WorkflowItem {
  id: string;
  position: Position;
  iconName: string;
  iconColor: string;
  isFirstNode: boolean;
  connectors: {
    inputs: string[];
    outputs: string[];
  };
}
