import { makeAutoObservable } from "mobx";

type Tool = "brush" | "rectangle" | "circle" | "eraser" | "line";

class ToolState {
  tool: Tool = "brush";

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool) {
    this.tool = tool;
  }
}

export default new ToolState();
