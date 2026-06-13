export default class Tool {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No 2D context");

    this.ctx = ctx;
  }

  set fillColor(color: string) {
    this.ctx.fillStyle = color;
  }

  set strokeColor(color: string) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.ctx.lineWidth = width;
  }
}
