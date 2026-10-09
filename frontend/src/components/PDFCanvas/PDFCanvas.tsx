"use client";

import createPDFPage from "@/utils/CreatePDFPage";
import getPDFDocument from "@/utils/getPDFDocument";
import renderPDFToCanvas from "@/utils/renderPDFToCanvas";
import { useEffect, useRef } from "react";

interface PDFCanvasProps {
  resume_url: string;
}
const PDFCanvas:React.FC<PDFCanvasProps> = ({
  resume_url
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!resume_url) return;

    const renderPDF = async () => {
      try {
        // Proxy through Next.js API to avoid CORS issues
        const proxiedUrl = `/api/proxy-pdf?url=${encodeURIComponent(resume_url)}`;

        const pdfDocument = await getPDFDocument(proxiedUrl);
        const pdfPage = await createPDFPage(pdfDocument, 1);

        const canvas = document.createElement("canvas");
        await renderPDFToCanvas(pdfPage, canvas);
       
        if (containerRef.current) {
          containerRef.current.innerHTML = ""; // Clear previous content
          containerRef.current.appendChild(canvas);
        }
      } catch (error) {
        console.error("Error rendering PDF:", error);
      }
    };

    renderPDF();
  }, [resume_url]);

  return <div ref={containerRef}></div>;
};

export default PDFCanvas;