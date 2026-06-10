import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Rect from "../tools/Rect";
import Button from "./Button";

export default function Toolbar() {
  const handleBrushClick = () => {
    if (!canvasState.canvas) return;

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

  return (
    <div className="h-[40px] bg-white flex items-center justify-between shadow-lg p-4">
      <div className="space-x-4 flex items-center">
        <Button imageName="brush" onClick={handleBrushClick} />
        <Button imageName="rect" onClick={handleRectClick} />
        <Button imageName="circle" onClick={handleCircleClick} />
        {/* <Button imageName="eraser" /> */}
        {/* <Button imageName="line" /> */}
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
