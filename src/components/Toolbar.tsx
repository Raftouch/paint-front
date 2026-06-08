import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Button from "./Button";

export default function Toolbar() {
  const handleClick = () => {
    if (!canvasState.canvas) return;

    toolState.setTool(new Brush(canvasState.canvas));
  };

  return (
    <div className="h-[40px] bg-white flex items-center justify-between shadow-lg p-4">
      <div className="space-x-4 flex items-center">
        <Button imageName="brush" onClick={handleClick} />
        {/* <Button imageName="rect" />
        <Button imageName="circle" />
        <Button imageName="eraser" />
        <Button imageName="line" /> */}
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
