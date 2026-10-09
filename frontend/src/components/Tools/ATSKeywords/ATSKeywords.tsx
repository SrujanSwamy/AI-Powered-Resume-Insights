import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, SplitSquareVertical, Target, TrendingUp } from "lucide-react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";

interface ATSKeywordsProps {
  resume_url: string;
  job_matches: string;
}

const ATSKeywords: React.FC<ATSKeywordsProps> = ({ resume_url, job_matches }) => {
  // Guard against null/undefined job matches
  const safeContent = job_matches || "";
  const paragraphs = safeContent ? safeContent.split("\n").filter(Boolean) : [];


  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Left half */}
      <div className="flex-1 p-6 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="h-full flex flex-col max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Job Matches</h1>
              <p className="text-sm text-slate-400">AI-matched roles based on your resume</p>
            </div>
          </div>

          {/* Insight Banner */}
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 mt-0.5">
                <Target className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-300 mb-1">
                  🎯 Maximize Your Job Match Rate
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Candidates who tailor their resume to each specific role are{" "}
                  <span className="text-white font-medium">3× more likely</span> to receive an
                  interview. Use these job matches to understand which roles align best with your
                  experience — then mirror the job description's language in your resume for
                  maximum ATS compatibility.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { icon: "📊", label: "ATS Filtering", tip: "75% of resumes never reach humans" },
              { icon: "🔑", label: "Keywords Win", tip: "Match their exact language" },
              { icon: "🚀", label: "Tailor Each App", tip: "1 resume ≠ all jobs" },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-2.5 text-center">
                <span className="text-xl">{item.icon}</span>
                <p className="text-xs font-semibold text-slate-300 mt-1">{item.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.tip}</p>
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

export default ATSKeywords;
