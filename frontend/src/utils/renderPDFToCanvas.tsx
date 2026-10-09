import type { PDFPageProxy } from "pdfjs-dist";

const renderPDFToCanvas = (
  pageDocument: PDFPageProxy,
  canvas: HTMLCanvasElement
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    const viewport = pageDocument.getViewport({ scale: 1 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");
    if (!context) {
      reject(new Error("Canvas context is not available"));
      return;
    }

    const renderTask = pageDocument.render({
      canvasContext: context,
      viewport,
    });

    renderTask.promise
      .then(() => resolve(canvas))
      .catch(reject);
  });
};

export default renderPDFToCanvas;