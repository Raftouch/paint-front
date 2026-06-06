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
}

export default new ToolState();
