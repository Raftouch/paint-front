import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import canvasState from "../store/canvasState";
import Modal from "./Modal";
import { useParams } from "react-router-dom";

function Canvas() {
  const [modal, setModal] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const { sessionId } = params;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvasState.setCanvas(canvas);
  }, []);

  useEffect(() => {
    if (!canvasState.username) return;

    const socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => {
      console.log("Connection established");
      socket.send(
        JSON.stringify({
          id: sessionId,
          username: canvasState.username,
          method: "connection",
        }),
      );
    };

    socket.onerror = (e) => {
      console.log("Socket error", e);
    };
  }, [canvasState.username]);

  const mouseDownHandler = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvasState.pushToUndo(canvas.toDataURL());
  };

  const connectHandler = () => {
    const username = usernameRef.current?.value;
    if (!username) return;
    canvasState.setUsername(username);
    console.log(username);

    setModal(false);
  };

  return (
    <div className="mt-5 flex justify-center p-4">
      {modal && (
        <Modal
          onConnect={connectHandler}
          username={usernameRef}
          onClose={() => setModal(false)}
        />
      )}

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
