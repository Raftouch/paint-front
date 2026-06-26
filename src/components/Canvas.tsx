import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import canvasState from "../store/canvasState";
import Modal from "./Modal";

function Canvas() {
  const [modal, setModal] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvasState.setCanvas(canvas);
  }, []);

  const mouseDownHandler = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvasState.pushToUndo(canvas.toDataURL());
  };

  return (
    <div className="mt-5 flex justify-center p-4">
      {modal && <Modal onClose={() => setModal(false)} />}

      <canvas
        ref={canvasRef}
        onMouseDown={mouseDownHandler}
        width={800}
        height={600}
        className="w-full max-w-6xl bg-white border border-black"
      />
    </div>
  );
}

export default observer(Canvas);
