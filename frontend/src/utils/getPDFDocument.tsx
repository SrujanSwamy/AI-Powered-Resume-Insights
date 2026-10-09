import * as pdfjs from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";

const getPDFDocument = async (path: string): Promise<PDFDocumentProxy> => {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  return pdfjs.getDocument(path).promise;
};

export default getPDFDocument;