import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

const createPDFPage = async (
  document: PDFDocumentProxy,
  page: number
): Promise<PDFPageProxy> => {
  if (!document || !page) throw new Error("Invalid document or page number");
  return document.getPage(page);
};

export default createPDFPage;