import type { Tool } from "./tool";

export type DrawMsg = {
  method: "draw";
  id: string;
  figure: Figure;
};

export type BrushStart = Tool & {
  type: "brush-start";
};

export type Brush = Tool & {
  type: "brush";
};

export type Rect = Tool & {
  type: "rect";
  width: number;
  height: number;
};

export type Figure = BrushStart | Brush | Rect;
