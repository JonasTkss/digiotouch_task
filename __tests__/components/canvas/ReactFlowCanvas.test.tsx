import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { ReactFlowCanvas } from "@/components/canvas/ReactFlowCanvas";
import { render } from "@/__tests__/utils/test-utils";
import { useWorkflowCanvas } from "@/hooks/useWorkflowCanvas";
import { useReactFlow } from "@/hooks/useReactFlow";

jest.mock("@/hooks/useWorkflowCanvas");
jest.mock("@/hooks/useReactFlow");

describe("ReactFlowCanvas", () => {
  const mockHandleDragOver = jest.fn();
  const mockHandleDrop = jest.fn();

  beforeEach(() => {
    (useWorkflowCanvas as jest.Mock).mockReturnValue({
      handleDragOver: mockHandleDragOver,
      handleDrop: mockHandleDrop,
    });

    (useReactFlow as jest.Mock).mockReturnValue({
      nodes: [],
      edges: [],
      onNodesChange: jest.fn(),
      onEdgesChange: jest.fn(),
      onConnect: jest.fn(),
      onNodeDragStop: jest.fn(),
      onEdgesDelete: jest.fn(),
    });
  });

  it("handles drag and drop events", async () => {
    await render(<ReactFlowCanvas />);

    const canvas = screen.getByTestId("react-flow-canvas");
    fireEvent.dragOver(canvas);
    expect(mockHandleDragOver).toHaveBeenCalled();

    fireEvent.drop(canvas);
    expect(mockHandleDrop).toHaveBeenCalled();
  });
});
