import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, SplitSquareVertical, Lightbulb, TrendingUp } from "lucide-react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";

interface CoverLetterGenerationProps {
  resume_url: string;
  cover_letter: string;
}

const CoverLetterGeneration: React.FC<CoverLetterGenerationProps> = ({
  resume_url,
  cover_letter,
}) => {
  // Guard against null/undefined cover letter
  const safeContent = cover_letter || "";
  const paragraphs = safeContent ? safeContent.split("\n").filter(Boolean) : [];

  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Left half */}
      <div className="flex-1 p-6 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="h-full flex flex-col max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Cover Letter</h1>
              <p className="text-sm text-slate-400">AI-generated from your resume</p>
            </div>
          </div>

          {/* Insight Banner */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/20 mt-0.5">
                <Lightbulb className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-300 mb-1">
                  ✍️ Cover Letter Pro Tips
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A tailored cover letter increases your callback rate by up to{" "}
                  <span className="text-white font-medium">50%</span>. Address the hiring manager
                  by name if possible, mirror keywords from the job description, and keep it under
                  one page. Your first sentence should immediately communicate your strongest value.
                </p>
              </div>
            </div>
          </div>

          {/* Quick tips */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { icon: "🎯", label: "Be Specific", tip: "Reference the company by name" },
              { icon: "📏", label: "Keep it Short", tip: "Aim for 3-4 paragraphs" },
              { icon: "💡", label: "Show Value", tip: "Lead with your top achievement" },
              { icon: "🔗", label: "Connect Dots", tip: "Link your skills to their needs" },
            ].map((tip, i) => (
              <div key={i} className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-2.5 flex items-start gap-2">
                <span className="text-base">{tip.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-slate-300">{tip.label}</p>
                  <p className="text-[10px] text-slate-500">{tip.tip}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Card */}
          <Card className="flex-1 shadow-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Generated Content</CardTitle>
                <SplitSquareVertical className="h-4 w-4 text-slate-400" />
              </div>
              <Separator className="mt-2 border-slate-800" />
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-480px)] pr-4">
                <div className="space-y-6">
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-slate-300 first-letter:text-lg first-letter:font-medium first-letter:text-white"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right half - PDFCanvas */}
      <div className="sticky top-0 flex justify-end p-4 overflow-hidden w-full h-full">
        <PDFCanvas resume_url={resume_url} />
      </div>
    </div>
  );
};

export default CoverLetterGeneration;
