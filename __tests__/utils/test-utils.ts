import { act } from "react";
import { render } from "@testing-library/react";

const customRender = async (ui: React.ReactElement) => {
  let result;
  await act(async () => {
    result = render(ui);
  });
  return result!;
};

export * from "@testing-library/react";
export { customRender as render };

export const createMockDragEvent = () =>
  ({
    dataTransfer: {
      setData: jest.fn(),
    },
  }) as unknown as DragEvent;
