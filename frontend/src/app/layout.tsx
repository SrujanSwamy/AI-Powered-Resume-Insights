import "./styles/style.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import Providers from "./Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Resume Insights",
  description: "Elevate Your Resume, Unlock Your Career Potential",
  icons: {
    icon: "/favicon1.ico", // Ensure this is in your public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        {/* Other head tags if needed */}
      </head>
      <body
        className={`${inter.variable} bg-[#050816] font-inter tracking-tight text-white antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
          {/* Render the Toaster so that toast notifications can appear */}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}

