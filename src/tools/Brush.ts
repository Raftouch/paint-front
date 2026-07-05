import getMousePosition from "../utils/canvas";
import Tool from "./Tool";

export default class Brush extends Tool {
  private isDrawing = false;

  constructor(
    canvas: HTMLCanvasElement,
    socket: WebSocket | null,
    id: string | null,
  ) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler() {
    this.isDrawing = false;
  }

  mouseDownHandler(e: MouseEvent) {
    this.isDrawing = true;

    const { x, y } = getMousePosition(this.canvas, e);

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  mouseMoveHandler(e: MouseEvent) {
    if (!this.isDrawing) return;

    const { x, y } = getMousePosition(this.canvas, e);

    // this.draw(x, y);

    this.socket?.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "brush",
          x: x,
          y: y,
        },
      }),
    );
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
