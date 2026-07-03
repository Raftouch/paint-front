import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  socket: WebSocket | null = null;
  sessionid: string | null = null;
  undoList: string[] = [];
  redoList: string[] = [];
  username: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username: string) {
    this.username = username;
  }

  setSessionId(id: string | null) {
    this.sessionid = id;
  }

  setSocket(socket: WebSocket | null) {
    this.socket = socket;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  pushToUndo(data: string) {
    this.undoList.push(data);
  }

  pushToRedo(data: string) {
    this.redoList.push(data);
  }

  undo() {
    if (!this.canvas) return;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop();
      if (!dataUrl) return;

      this.redoList.push(this.canvas.toDataURL());

      if (!dataUrl) return;

      const img = new Image();

      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);

        ctx.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
      };

      img.src = dataUrl;
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    if (!this.canvas) return;

    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop();
      if (!dataUrl) return;

      this.undoList.push(this.canvas.toDataURL());

      if (!dataUrl) return;

      const img = new Image();

      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);

        ctx.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
      };

      img.src = dataUrl;
    }
  }
}

export default new CanvasState();
