import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvasState.setCanvas(canvas);
    toolState.setTool(new Brush(canvas));
  }, []);

  return (
    <div className="mt-5 flex justify-center p-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full max-w-6xl bg-white border border-black"
      />
    </div>
  );
}

export default observer(Canvas);
