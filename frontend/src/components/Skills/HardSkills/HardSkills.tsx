"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wrench, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";


interface HardSkillsProps {
  resume_url: string;
  skills: string[];
}

const HardSkills: React.FC<HardSkillsProps> = ({ resume_url, skills }) => {
  const router = useRouter();

  const handleSkillClick = (skill: string) => {
    // Navigate to the skill details page
    router.push(`/skills/${encodeURIComponent(skill.toLowerCase())}`);
  };

  return (
    <div className="flex h-screen bg-[#050816]">
      {/* Left Panel - Skills Grid */}
      <div className="flex-1 p-6">
        <Card className="w-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm shadow-xl text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-indigo-400" />
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Hard Skills</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-180px)] pr-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {skills.map((skill, index) => (
                  <Button
                  key={index}
                  variant="secondary"
                  className={cn(
                    "h-auto py-4 px-4 group relative bg-slate-800/40 text-slate-200 border border-slate-700/60 rounded-xl",
                    "hover:bg-slate-700/60 hover:text-white hover:border-indigo-500/50",
                    "transition-all duration-200"
                  )}
                  onClick={() => handleSkillClick(skill)}
                >
                  <span className="text-sm font-medium">{skill}</span>
                  <ChevronRight className={cn(
                    "h-4 w-4 absolute right-2 opacity-0 text-slate-400",
                    "group-hover:opacity-100 group-hover:text-white transition-opacity duration-200"
                  )} />
                </Button>
                
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Resume Preview */}
      <div className="w-1/2 h-full bg-transparent p-6">
        <Card className="h-full border-0 shadow-none bg-transparent">
          <CardContent className="p-0">
            <div className="h-[calc(100vh-140px)] w-full">
              <PDFCanvas resume_url={resume_url} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HardSkills;