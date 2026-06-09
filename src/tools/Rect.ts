import getMousePosition from "../utils/canvas";
import Tool from "./Tool";

export default class Rect extends Tool {
  private isDrawing = false;
  private startX = 0;
  private startY = 0;

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

    const { x, y } = getMousePosition(this.canvas, e);

    this.startX = x;
    this.startY = y;

    this.ctx.beginPath();
  }

  mouseMoveHandler(e: MouseEvent) {
    if (!this.isDrawing) return;

    const { x, y } = getMousePosition(this.canvas, e);

    const width = x - this.startX;
    const height = y - this.startY;

    this.draw(this.startX, this.startY, width, height);
  }

  draw(x: number, y: number, w: number, h: number) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.fill();
    this.ctx.stroke();
  }
}
