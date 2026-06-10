import getMousePosition from "../utils/canvas";
import Tool from "./Tool";

export default class Circle extends Tool {
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private saved: string | null = null;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
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
    this.ctx.beginPath();

    const { x, y } = getMousePosition(this.canvas, e);

    this.startX = x;
    this.startY = y;

    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: MouseEvent) {
    if (!this.isDrawing) return;

    const { x, y } = getMousePosition(this.canvas, e);

    const radius = Math.hypot(x - this.startX, y - this.startY);

    this.draw(this.startX, this.startY, radius);
  }

  draw(x: number, y: number, r: number) {
    const img = new Image();

    if (!this.saved) return;
    img.src = this.saved;

    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}
