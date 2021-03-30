export const CreateCanvas = (): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.id = "renderCanvas";
  const container = document.getElementById("content");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  container.appendChild(canvas);
  return canvas;
};
