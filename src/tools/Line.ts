import getMousePosition from "../utils/canvas";
import Tool from "./Tool";

export default class Line extends Tool {
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

    this.draw(this.startX, this.startY, x, y);
  }

  draw(startX: number, startY: number, endX: number, endY: number) {
    const img = new Image();

    if (!this.saved) return;
    img.src = this.saved;

    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0);
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
    };
  }
}
