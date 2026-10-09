import React, { useState } from "react";
import { ListChecks, Copy, Check } from "lucide-react";

interface VerbCardProps {
  title: string;
  verbs: string[];
  accentColor?: string;
}

const VerbCard: React.FC<VerbCardProps> = ({ title, verbs, accentColor = "from-indigo-500 to-violet-500" }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (verb: string) => {
    navigator.clipboard.writeText(verb);
    setCopied(verb);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="group w-full mt-4 rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm shadow-xl shadow-black/30 transition-all duration-300 hover:border-slate-600/60 hover:shadow-indigo-500/5 hover:shadow-2xl">
      {/* Card Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-700/40">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${accentColor} shadow-lg`}>
          <ListChecks className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
          {title}
        </h3>
        <span className="ml-auto text-xs text-slate-500 font-medium">{verbs.length} verbs</span>
      </div>

      {/* Verb Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {verbs.map((verb, index) => (
            <button
              key={index}
              onClick={() => handleCopy(verb)}
              title={`Click to copy "${verb}"`}
              className="group/verb relative flex items-center justify-between gap-1 rounded-lg border border-slate-700/60 bg-slate-800/60 px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-indigo-500/50 hover:bg-slate-700/60 hover:text-white hover:shadow-md hover:shadow-indigo-500/10 active:scale-95"
            >
              <span className="truncate">{verb}</span>
              <span className="ml-1 flex-shrink-0 opacity-0 transition-opacity group-hover/verb:opacity-100">
                {copied === verb ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3 text-slate-500" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerbCard;