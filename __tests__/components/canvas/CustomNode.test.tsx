import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomNode } from "@/components/canvas/CustomNode";
import { CustomNodeProps } from "@/types/nodes";
import { ReactFlowProvider } from "reactflow";

describe("CustomNode", () => {
  const mockOnDelete = jest.fn();
  const defaultProps: CustomNodeProps = {
    id: "node-1",
    selected: false,
    type: "custom",
    zIndex: 0,
    dragging: false,
    xPos: 0,
    yPos: 0,
    isConnectable: true,
    data: {
      name: "YouTube",
      description: "Video content platform",
      onDelete: mockOnDelete,
      isFirstNode: false,
      iconName: "YouTube",
      iconColor: "red-600",
    },
  };

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it("renders the node with correct content", () => {
    render(
      <ReactFlowProvider>
        <CustomNode {...defaultProps} />
      </ReactFlowProvider>
    );
    expect(screen.getByText("YouTube")).toBeInTheDocument();
    expect(screen.getByText("Video content platform")).toBeInTheDocument();
  });

  it("calls onDelete when close icon is clicked", () => {
    render(
      <ReactFlowProvider>
        <CustomNode {...defaultProps} />
      </ReactFlowProvider>
    );
    const closeButton = screen.getByRole("button", { name: /delete node/i });
    fireEvent.click(closeButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("renders handles based on isFirstNode prop", () => {
    const { rerender } = render(
      <ReactFlowProvider>
        <CustomNode {...defaultProps} />
      </ReactFlowProvider>
    );

    expect(
      screen.getByRole("button", { name: "Input handle" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Output handle" })
    ).toBeInTheDocument();

    rerender(
      <ReactFlowProvider>
        <CustomNode
          {...defaultProps}
          data={{ ...defaultProps.data, isFirstNode: true }}
        />
      </ReactFlowProvider>
    );

    expect(
      screen.queryByRole("button", { name: "Input handle" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Output handle" })
    ).toBeInTheDocument();
  });
});
