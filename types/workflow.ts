import { ReactElement } from "react";

export interface WorkflowItem {
  name: string;
  description: string;
  icon: ReactElement;
}

export interface WorkflowCategory {
  category: string;
  items: WorkflowItem[];
}
