export function setCanvasMode(
  canvas: HTMLCanvasElement,
  mode: "draw" | "erase",
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.globalCompositeOperation =
    mode === "erase" ? "destination-out" : "source-over";
}
