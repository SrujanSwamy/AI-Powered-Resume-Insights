"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import VerbCard from "@/components/Resources/ActionVerbs/VerbCard";
import { Zap, TrendingUp, Info } from "lucide-react";

interface ActionVerbsProps {
  resume_url: string;
}

const ActionVerbs: React.FC<ActionVerbsProps> = ({ resume_url }) => {
  // Strong Accomplishment-driven Verbs
  const strongAccomplishmentVerbs = [
    "Accelerated","Achieved","Attained","Completed","Conceived","Convinced",
    "Discovered","Doubled","Effected","Eliminated","Expanded","Expedited",
    "Founded","Improved","Increased","Initiated","Innovated","Introduced",
    "Invented","Launched","Mastered","Overcame","Overhauled","Pioneered",
    "Reduced","Resolved","Revitalized","Spearheaded","Strengthened",
    "Transformed","Upgraded","Tripled",
  ];

  const communicationSkills = [
    "Addressed","Advised","Arranged","Authored","Co-authored","Co-ordinated",
    "Communicated","Corresponded","Counselled","Developed","Demonstrated",
    "Directed","Drafted","Enlisted","Facilitated","Formulated","Guided",
    "Influenced","Interpreted","Interviewed","Instructed","Lectured","Led",
    "Liaised","Mediated","Moderated","Motivated","Negotiated","Persuaded",
    "Presented","Promoted","Proposed","Publicized","Recommended","Reconciled",
    "Recruited","Resolved","Taught","Trained","Translated",
  ];

  const entrepreneurialSkills = [
    "Composed","Conceived","Created","Designed","Developed","Devised",
    "Established","Founded","Generated","Implemented","Initiated","Instituted",
    "Introduced","Launched","Led","Opened","Originated","Pioneered","Planned",
    "Prepared","Produced","Promoted","Started","Released",
  ];

  const managementSkills = [
    "Administered","Analyzed","Assigned","Chaired","Consolidated","Contracted",
    "Co-ordinated","Delegated","Developed","Directed","Evaluated","Executed",
    "Organized","Planned","Prioritized","Produced","Recommended","Reorganized",
    "Reviewed","Scheduled","Supervised","Managed","Guided",
  ];

  const leadershipSkills = [
    "Advised","Coached","Conducted","Directed","Guided","Demonstrated",
    "Illustrated","Led","Managed","Organized","Performed","Presented","Taught",
    "Trained","Mentored","Spearheaded","Authored","Accelerated","Achieved",
    "Allocated","Completed","Awarded","Persuaded","Revamped","Influenced",
    "Assessed","Clarified","Counseled","Diagnosed","Educated","Facilitated",
    "Familiarized","Motivated","Referred","Rehabilitated","Reinforced",
    "Represented","Moderated","Verified","Adapted","Coordinated","Developed",
    "Enabled","Encouraged","Evaluated","Explained","Informed","Instructed",
    "Lectured","Stimulated",
  ];

  const researchAnalysisSkills = [
    "Analyzed","Assessed","Classified","Collated","Defined","Devised",
    "Established","Evaluated","Forecasted","Identified","Interviewed",
    "Investigated","Researched","Tested","Traced","Designed","Interpreted",
    "Verified","Uncovered","Clarified","Collected","Critiqued","Diagnosed",
    "Examined","Extracted","Inspected","Inspired","Organized","Reviewed",
    "Summarized","Surveyed","Systemized",
  ];

  const problemSolvingSkills = [
    "Arranged","Budgeted","Composed","Conceived","Conducted","Controlled",
    "Co-ordinated","Eliminated","Improved","Investigated","Itemised",
    "Modernised","Operated","Organised","Planned","Prepared","Processed",
    "Produced","Redesigned","Reduced","Refined","Researched","Resolved",
    "Reviewed","Revised","Scheduled","Simplified","Solved","Streamlined",
    "Transformed","Examined","Revamped",
  ];

  const processImprovementSkills = [
    "Combined","Consolidated","Converted","Cut","Decreased","Developed",
    "Devised","Doubled","Tripled","Eliminated","Expanded","Improved",
    "Increased","Innovated","Minimised","Modernised","Recommended","Redesigned",
    "Reduced","Refined","Reorganised","Resolved","Restructured","Revised",
    "Saved","Serviced","Simplified","Solved","Streamlined","Strengthened",
    "Transformed","Trimmed","Unified","Widened","Broadened","Revamped",
  ];

  const financialSkills = [
    "Administered","Allocated","Analyzed","Appraised","Audited","Balanced",
    "Budgeted","Calculated","Computed","Developed","Managed","Planned",
    "Projected","Researched","Restructured","Modelled","Arbitrated",
  ];

  const designCreativeSkills = [
    "Acted","Conceptualized","Created","Customized","Designed","Developed",
    "Directed","Redesigned","Established","Fashioned","Illustrated","Instituted",
    "Integrated","Performed","Planned","Proved","Revised","Revitalized",
    "Set up","Shaped","Streamlined","Structured","Tabulated","Validated",
  ];

  const clericalSkills = [
    "Approved","Arranged","Catalogued","Classified","Collected","Compiled",
    "Dispatched","Executed","Generated","Implemented","Inspected","Monitored",
    "Operated","Ordered","Organized","Prepared","Processed","Purchased",
    "Recorded","Retrieved","Screened","Specified","Systematized",
  ];

  const engineeringSkills = [
    "Conceptualized","Coded","Computed","Extrapolated","Predicted","Installed",
    "Engineered","Calculated","Segmented","Restructured","Arbitrated",
    "Estimated","Overhauled","Devised","Assembled","Unified","Visualized",
    "Debugged","Customized","Standardized","Steered","Validated","Diagnosed",
    "Tested","Automated","Strengthened","Troubleshooted","Architected",
    "Discovered","Deployed",
  ];

  const cardAccents = [
    "from-indigo-500 to-violet-500",
    "from-violet-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
    "from-pink-500 to-rose-500",
    "from-cyan-500 to-sky-500",
    "from-blue-500 to-indigo-500",
    "from-teal-500 to-emerald-500",
    "from-amber-500 to-yellow-500",
    "from-rose-500 to-pink-500",
    "from-sky-500 to-cyan-500",
    "from-purple-500 to-indigo-500",
  ];

  const categories = [
    { title: "Strong Accomplishment-Driven Verbs", verbs: strongAccomplishmentVerbs },
    { title: "Communication Skills", verbs: communicationSkills },
    { title: "Entrepreneurial Skills", verbs: entrepreneurialSkills },
    { title: "Management Skills", verbs: managementSkills },
    { title: "Leadership, Mentorship & Teaching", verbs: leadershipSkills },
    { title: "Research & Analysis Skills", verbs: researchAnalysisSkills },
    { title: "Problem Solving Skills", verbs: problemSolvingSkills },
    { title: "Process Improvement & Consulting", verbs: processImprovementSkills },
    { title: "Financial Skills", verbs: financialSkills },
    { title: "Design & Creative Skills", verbs: designCreativeSkills },
    { title: "Clerical & Detail-Oriented Skills", verbs: clericalSkills },
    { title: "Engineering / Technical Roles", verbs: engineeringSkills },
  ];

  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="overflow-y-auto p-4 [scrollbar-width:none] [-ms-overflow-style:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Heading Section */}
        <div className="mb-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Action Verbs</h2>
              <p className="text-sm text-slate-400">
                Curated by hiring managers at top companies
              </p>
            </div>
          </div>

          {/* Insight Banner */}
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 mb-2">
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 mt-0.5">
                <TrendingUp className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-300 mb-1">
                  💡 Pro Insight: Action Verbs Matter
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Resumes that start bullet points with strong action verbs are{" "}
                  <span className="text-white font-medium">40% more likely</span> to pass
                  ATS screening. Recruiters spend only{" "}
                  <span className="text-white font-medium">6–7 seconds</span> on an initial
                  scan — a powerful verb grabs attention instantly. Click any verb to copy it.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Tips Row */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { icon: "🎯", label: "Use Past Tense", tip: "For previous roles" },
              { icon: "📊", label: "Add Numbers", tip: "Quantify your impact" },
              { icon: "🚫", label: "Avoid Weak Words", tip: "No 'helped' or 'worked'" },
            ].map((tip, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-700/40 bg-slate-800/40 p-2.5 text-center"
              >
                <div className="text-lg mb-1">{tip.icon}</div>
                <p className="text-xs font-semibold text-slate-300">{tip.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col items-center pr-2">
          {categories.map((cat, i) => (
            <VerbCard
              key={i}
              title={cat.title}
              verbs={cat.verbs}
              accentColor={cardAccents[i % cardAccents.length]}
            />
          ))}
        </div>
      </div>

      {/* Right half - PDFCanvas */}
      <div className="sticky top-0 flex justify-end p-4 overflow-hidden w-full h-full">
        <PDFCanvas resume_url={resume_url} />
      </div>
    </div>
  );
};

export default ActionVerbs;
