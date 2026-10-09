"use client";

import React from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import RecruiterInsightsCard from "../../RecruiterInsightsCard";
import { AlertCircle, Check, ChevronRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

/** Converts basic markdown (**bold**, *italic*, newlines) to HTML */
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}

const THRESHOLD: number = 5.9;

const faqs = [
  {
    id: 1,
    question: "How can I effectively demonstrate soft skills on my resume?",
    answer: `
      Here are key ways to showcase your soft skills:
      <ul>
        <li><strong>Use action verbs:</strong> Instead of just listing skills, demonstrate them through actions. e.g., "Collaborated with 5 team members" instead of just "Good team player"</li>
        <li><strong>Provide specific examples:</strong> Share situations where you used these skills. e.g., "Led a team of 4 to complete project ahead of schedule" shows leadership and time management</li>
        <li><strong>Quantify achievements:</strong> Where possible, add numbers to your soft skill achievements. e.g., "Mentored 3 junior team members, improving their productivity by 40%"</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "Which soft skills are most valued by employers?",
    answer: `
      While specific soft skills may vary by industry, these are consistently highly valued:
      <br /><br />
      Here's how to highlight them:
      <ul>
        <li><strong>Communication:</strong> Show how you've presented ideas, written reports, or facilitated discussions</li>
        <li><strong>Leadership:</strong> Highlight instances where you've led projects, mentored others, or taken initiative</li>
        <li><strong>Problem-solving:</strong> Describe specific challenges you've overcome and how you approached them</li>
        <li><strong>Teamwork:</strong> Demonstrate collaboration experiences and successful team outcomes</li>
        <li><strong>Adaptability:</strong> Show how you've handled change or learned new skills quickly</li>
      </ul>
    `,
  },
  {
    id: 3,
    question: "How do I balance technical and soft skills on my resume?",
    answer: `<p>
A strong resume needs both technical and soft skills. Here's how to achieve the right balance:
<br><br>
1. Integrate soft skills naturally into your experience descriptions rather than just listing them
<br><br>
2. Use specific examples that show both technical and soft skills in action
<br><br>
3. Choose soft skills that are particularly relevant to your target role and industry</p>`,
  },
  {
    id: 4,
    question: "How can I prove my soft skills in my resume?",
    answer: `<p>
Here are effective ways to validate your soft skills:
<br><br>
1) Use the STAR method (Situation, Task, Action, Result) to describe situations where you demonstrated these skills
<br><br>
2) Include measurable achievements. For example:
- "Improved team communication efficiency by implementing weekly stand-ups, reducing project delays by 30%"
- "Led cross-functional team of 8 members to deliver project under budget"
- "Resolved average of 15 customer conflicts per week with 95% satisfaction rate"
<br><br>
3) Incorporate feedback or recognition you've received that validates these skills, such as awards or commendations
<br><br>
Remember, the key is to show, not tell. Instead of saying "excellent communicator," demonstrate it through your achievements and experiences.</p>`,
  },
];


interface SoftSkillsProps {
  resume_url: string;
  soft_skills_score: number;
  soft_skills_feedback: string;
  communication_score: number;
  leadership_score: number;
  analytical_score: number;
  teamwork_score: number;
  drive_score: number;
}


interface ScoreItem {
  id: string;
  title: string;
  description: string;
  path: string;
  status: "success" | "error" | "locked";
  action: "FIX" | "MORE";
}

const scoreItems = (
  communication_score: number,
  leadership_score: number,
  analytical_score: number,
  teamwork_score: number,
  drive_score: number,
): ScoreItem[] => [
  {
    id: "1",
    title: "Communication",
    description:
      communication_score > THRESHOLD
        ? "Excellent! Your resume demonstrates strong communication skills."
        : "Improve your communication details. Use clear, active phrasing.",
    status: communication_score > THRESHOLD ? "success" : "error",
    action: communication_score > THRESHOLD ? "MORE" : "FIX",
    path: "/skills/soft-skills/communication",
  },
  {
    id: "2",
    title: "Leadership",
    description:
      leadership_score > THRESHOLD
        ? "Strong leadership presence. You demonstrate clear project and team guidance."
        : "Leadership signs are low. Showcase initiative, mentoring, or leading tasks.",
    status: leadership_score > THRESHOLD ? "success" : "error",
    action: leadership_score > THRESHOLD ? "MORE" : "FIX",
    path: "/skills/soft-skills/leadership",
  },
  {
    id: "3",
    title: "Analytical",
    description:
      analytical_score > THRESHOLD
        ? "Great analytical framing. You clearly show problem-solving and critical thinking."
        : "Show more analytical depth. Mention problem solving, data analysis, or critical insights.",
    status: analytical_score > THRESHOLD ? "success" : "error",
    action: analytical_score > THRESHOLD ? "MORE" : "FIX",
    path: "/skills/soft-skills/analytical",
  },
  {
    id: "4",
    title: "Team Work",
    description:
      teamwork_score > THRESHOLD
        ? "Excellent collaboration. Your accomplishments highlight teamwork."
        : "Teamwork indicators are low. Mention cross-functional work or team achievements.",
    status: teamwork_score > THRESHOLD ? "success" : "error",
    action: teamwork_score > THRESHOLD ? "MORE" : "FIX",
    path: "/skills/soft-skills/teamwork",
  },
  {
    id: "5",
    title: "Drive",
    description:
      drive_score > THRESHOLD
        ? "High drive and motivation. You clearly show project ownership."
        : "Show more drive. Emphasize self-started projects or proactive solutions.",
    status: drive_score > THRESHOLD ? "success" : "error",
    action: drive_score > THRESHOLD ? "MORE" : "FIX",
    path: "/skills/soft-skills/drive",
  },
];

const SoftSkills: React.FC<SoftSkillsProps> = ({
  resume_url,
  soft_skills_score,
  soft_skills_feedback,
  communication_score,
  leadership_score,
  analytical_score,
  teamwork_score,
  drive_score,
}) => {
  const router = useRouter();
  return (
    <div className="grid h-screen grid-cols-2">
      {/* Left half */}
      <div className="flex h-full flex-col justify-start overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] hover:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-sm backdrop-blur-sm text-white">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Soft Skills</h2>
            <div
              className={`rounded-full px-4 py-2 ${soft_skills_score >= 10 ? "bg-green-500/10 text-green-400" : ""} ${soft_skills_score >= 7 && soft_skills_score < 10 ? "bg-green-500/10 text-green-400" : ""} ${soft_skills_score >= 5 && soft_skills_score < 7 ? "bg-orange-500/10 text-orange-400" : ""} ${soft_skills_score < 5 ? "bg-red-500/10 text-red-400" : ""} `}
            >
              <span className="font-semibold">{soft_skills_score}</span>
              <span className="text-sm opacity-70">/10</span>
            </div>
          </div>

          <p
            className="mb-8 text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(soft_skills_feedback || "") }}
          />

          {scoreItems(
            communication_score,
            leadership_score,
            analytical_score,
            teamwork_score,
            drive_score,
          ).map((item: ScoreItem) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 p-4 transition-colors hover:border-slate-700/80 mb-4 last:mb-0"
            >
              <div className="flex items-start gap-3">
                {item.status === "success" && (
                  <div className="mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
                {item.status === "error" && (
                  <div className="mt-1">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
                {item.status === "locked" && (
                  <div className="mt-1">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="mb-1 font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
              </div>
              <button
                className="flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors text-indigo-400 hover:bg-indigo-500/15"
                onClick={() => {
                  router.push(item.path);
                }}
              >
                {item.action}
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <br />
        <RecruiterInsightsCard faqs={faqs} />
      </div>

      {/* Right half - PDFCanvas */}
      <div className="flex h-full w-full justify-end overflow-hidden">
        <PDFCanvas resume_url={resume_url} />
      </div>
    </div>
  );
};

export default SoftSkills;
