import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import canvasState from "../store/canvasState";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";

type DrawMsg = {
  method: "draw";
  id: string;
  figure:
    | {
        type: "brush";
        x: number;
        y: number;
      }
    | {
        type: "rect";
        x: number;
        y: number;
        width: number;
        height: number;
      };
};

function Canvas() {
  const [modal, setModal] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvasState.setCanvas(canvas);
  }, []);

  useEffect(() => {
    if (!canvasState.username) return;
    if (!id) return;

    const socket = new WebSocket("ws://localhost:4000");

    canvasState.setSocket(socket);
    canvasState.setSessionId(id ?? null);

    if (!canvasRef.current) return;
    toolState.setTool(new Brush(canvasRef.current, socket, id));

    socket.onopen = () => {
      console.log("Connection established");

      socket.send(
        JSON.stringify({
          id,
          username: canvasState.username,
          method: "connection",
        }),
      );
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data);
        console.log("Received:", msg);

        switch (msg.method) {
          case "connection":
            console.log(`User ${msg.username} joined`);
            break;

          case "draw":
            drawHandler(msg);
            break;

          default:
            console.log("Unknown message type:", msg);
        }
      } catch (err) {
        console.log("Failed to parse JSON:", event.data);
        console.error(err);
      }
    };

    socket.onerror = (e) => {
      console.log("Socket error", e);
    };

    socket.onclose = () => {
      console.log("Socket closed");
    };

    return () => {
      socket.close();
    };
  }, [canvasState.username, id]);

  const drawHandler = (msg: DrawMsg) => {
    const figure = msg.figure;

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    switch (figure.type) {
      case "brush":
        // ctx.beginPath();
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case "rect":
        // ctx.beginPath();
        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height);
        break;
    }
  };

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
