export const GRID_SIZE = 24;
export const MAJOR_GRID_SIZE = GRID_SIZE * 4;

export const snapToGrid = (value: number): number => {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
};

export const calculateNodePosition = (
  x: number,
  y: number
): { x: number; y: number } => {
  return {
    x: snapToGrid(x),
    y: snapToGrid(y),
  };
};
