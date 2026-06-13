import { makeAutoObservable } from "mobx";
import type Tool from "../tools/Tool";

// type Tool = "brush" | "rectangle" | "circle" | "eraser" | "line";

class ToolState {
  tool: Tool | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool) {
    this.tool = tool;
  }

  setFillColor(color: string) {
    if (!this.tool) return;
    this.tool.fillColor = color;
  }

  setStrokeColor(color: string) {
    if (!this.tool) return;
    this.tool.strokeColor = color;
  }

  setLineWidth(width: number) {
    if (!this.tool) return;
    this.tool.lineWidth = width;
  }
}

export default new ToolState();
