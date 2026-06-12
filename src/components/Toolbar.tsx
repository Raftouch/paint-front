import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Rect from "../tools/Rect";
import { setCanvasMode } from "../utils/mode";
import Button from "./Button";

export default function Toolbar() {
  const handleBrushClick = () => {
    if (!canvasState.canvas) return;

    setCanvasMode(canvasState.canvas, "draw");

    toolState.setTool(new Brush(canvasState.canvas));
  };

  const handleRectClick = () => {
    if (!canvasState.canvas) return;

    toolState.setTool(new Rect(canvasState.canvas));
  };

  const handleCircleClick = () => {
    if (!canvasState.canvas) return;

    toolState.setTool(new Circle(canvasState.canvas));
  };

  const handleLineClick = () => {
    if (!canvasState.canvas) return;

    toolState.setTool(new Line(canvasState.canvas));
  };

  const handleEraserClick = () => {
    if (!canvasState.canvas) return;

    setCanvasMode(canvasState.canvas, "erase");

    toolState.setTool(new Eraser(canvasState.canvas));
  };

  return (
    <div className="h-[40px] bg-white flex items-center justify-between shadow-lg p-4">
      <div className="space-x-4 flex items-center">
        <Button imageName="brush" onClick={handleBrushClick} />
        <Button imageName="rect" onClick={handleRectClick} />
        <Button imageName="circle" onClick={handleCircleClick} />
        <Button imageName="eraser" onClick={handleEraserClick} />
        <Button imageName="line" onClick={handleLineClick} />
        <input type="color" />
      </div>

      <div className="space-x-4 flex items-center">
        {/* <Button imageName="undo" />
        <Button imageName="redo" />
        <Button imageName="save" /> */}
      </div>
    </div>
  );
}
