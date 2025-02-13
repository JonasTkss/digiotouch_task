import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import SideBar from "@/components/sidebar/SideBar";
import { workflowElements } from "@/utils/workflowData";
import { createMockDragEvent, render } from "@/__tests__/utils/test-utils";

describe("SideBar Component", () => {
  it("renders workflow elements title", async () => {
    await render(<SideBar />);
    expect(screen.getByText("Workflow Elements")).toBeDefined();
  });

  it("renders all workflow categories", async () => {
    await render(<SideBar />);
    workflowElements.forEach((category) => {
      expect(screen.getByText(category.category)).toBeDefined();
    });
  });

  it("renders all workflow items with their names and descriptions", async () => {
    await render(<SideBar />);
    workflowElements.forEach((category) => {
      category.items.forEach((item) => {
        expect(screen.getByText(item.name)).toBeDefined();
        expect(screen.getByText(item.description)).toBeDefined();
      });
    });
  });

  it("sets drag data when dragging an item", async () => {
    await render(<SideBar />);
    const firstItem = workflowElements[0].items[0];
    const itemElement = screen.getByText(firstItem.name);
    const dragStartEvent = createMockDragEvent();

    fireEvent.dragStart(
      itemElement.closest('div[draggable="true"]')!,
      dragStartEvent
    );

    expect(dragStartEvent.dataTransfer?.setData).toHaveBeenCalledWith(
      "application/json",
      JSON.stringify(firstItem)
    );
  });
});
