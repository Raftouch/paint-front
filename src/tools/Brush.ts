import getMousePosition from "../utils/canvas";
import Tool from "./Tool";

export default class Brush extends Tool {
  private isDrawing = false;

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

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  mouseMoveHandler(e: MouseEvent) {
    if (!this.isDrawing) return;

    const { x, y } = getMousePosition(this.canvas, e);

    this.draw(x, y);
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
