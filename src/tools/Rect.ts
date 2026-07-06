import getMousePosition from "../utils/canvas";
import Tool from "./Tool";

export default class Rect extends Tool {
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private saved: string | null = null;

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

  mouseUpHandler(e: MouseEvent) {
    this.isDrawing = false;

    const { x, y } = getMousePosition(this.canvas, e);

    const width = x - this.startX;
    const height = y - this.startY;

    this.socket?.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "rect",
          x: this.startX,
          y: this.startY,
          width,
          height,
        },
      }),
    );
  }

  mouseDownHandler(e: MouseEvent) {
    this.isDrawing = true;
    // this.ctx.beginPath();

    const { x, y } = getMousePosition(this.canvas, e);

    this.startX = x;
    this.startY = y;

    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: MouseEvent) {
    if (!this.isDrawing) return;

    const { x, y } = getMousePosition(this.canvas, e);

    const width = x - this.startX;
    const height = y - this.startY;

    this.draw(this.startX, this.startY, width, height);
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image();

    if (!this.saved) return;
    img.src = this.saved;

    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
  ) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
  }
}
