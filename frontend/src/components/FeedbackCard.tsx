import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";


interface FeedbackCardProps {
  explanation: string;
  question: string;
  feedback: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ explanation, question, feedback }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card className="w-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg text-white">

      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-indigo-400" />
          <CardTitle className="text-xl text-white font-semibold">Feedback</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Feedback Section */}
        <div className="rounded-lg bg-slate-950/40 border border-slate-800/80 p-4">
          <p className="text-base leading-relaxed text-slate-200">{feedback}</p>
        </div>

        {/* Question Button */}
        <button
          className="w-full justify-between flex items-center rounded-lg border border-slate-700 bg-slate-800/30 px-4 py-2.5 hover:bg-slate-800/60 hover:text-white transition-all text-slate-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-sm font-medium">{question}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 ml-2 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2 text-slate-400" />
          )}
        </button>

        {/* Explanation Section */}
        <div
          className={cn(
            "grid transition-all duration-300",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className={cn(
              "rounded-lg bg-slate-900/40 border border-slate-800/40 p-4 text-sm leading-relaxed text-slate-300",
              isExpanded ? "opacity-100" : "opacity-0",
              "transition-opacity duration-300"
            )}>
              {explanation}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;