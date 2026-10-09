"use client";

import React, { useState } from "react";
import PDFCanvas from "@/components/PDFCanvas/PDFCanvas";
import RecruiterInsightsCard from "../RecruiterInsightsCard";
import { Star, History } from "lucide-react";
import { Card } from "../ui/card";
import { AlertCircle, Check, ChevronRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import ResumePlot from "../ResumePlot";
const THRESHOLD: number = 6;
const faqs = [
  {
    id: 1,
    question: "I'm a student or recent graduate. What metrics should I use?",
    answer: `
      If you're a student and you are struggling to come up with metrics and numbers, here are a few ideas:
      <ul>
        <li><strong>Team size:</strong> e.g. how many people have you worked with for specific projects or extracurricular activities? e.g. Teamed with x people to deliver y...</li>
        <li><strong>Industry-specific metrics:</strong> Depending on the industry you're looking to apply to, there are specific metrics. e.g. have you worked with large amounts of data? For example, you could explain how you "analyzed 10,000 data points to do x" or "Collected 1,000 survey responses to do y".</li>
        <li><strong>Extra-curricular activities:</strong> Think about any other extra-curricular activities you may have participated in. e.g. you could discuss the # of participants at an event you may have organized, etc.</li>
      </ul>
    `,
  },
  {
    id: 2,
    question: "What if I'm not in a numbers-focused role?",
    answer: `
      A common misconception is that only people in financial or sales roles have access to numbers they can use on their resume. That's not true. Every role or project has something you can quantify. You just need to think about the impact of your work in a non-financial context.
      <br /><br />
      Let's go through a few examples:
      <ul>
        <li><strong>Time savings:</strong> Did you introduce a new process, template, or tool that saved your company time? e.g. in terms of hours per week.</li>
        <li><strong>Scope:</strong> You can highlight the complexity of work you did by mentioning how many customers or users your team served.</li>
        <li><strong>Industry-specific metrics:</strong> Depending on the industry you're looking to apply to, there are specific metrics. e.g. have you worked with large amounts of data? For example, you could explain how you "analyzed 10,000 data points to do x" or "Collected 1,000 survey responses to do y".</li>
      </ul>
      Don't be afraid to estimate if you don't have an exact number available. Most resumes use estimates. For example, if you upgraded some machinery and made your company’s operations more efficient, you could estimate how many hours of labor those new machines saved per week.
      <br /><br />
      To take it a step further, you could multiply these weekly labor hours by the average hourly employee pay to give a rough idea of how much money the machines saved.
    `,
  },
  {
    id: 3,
    question: "How do you add numbers and metrics to your bullet points?",
    answer: `<p>
Expand the image next to the question for a real example of how to add numbers to your bullet points. This is called quantifying your bullet points.
<br><br>
This is one of the best things you can do to separate your resume from other applicants.
<br><br>								In the examples, notice how we explicitly describe the <em>impact</em> of our work. You want to always talk about the <em>result</em> of your work —&nbsp;did you help your company get more sales? Did you save your company time? Doing this makes your achievements more meaningful and helps employers know what kind of impact you can have at their company.					</p>`,
  },
  {
    id: 4,
    question: "What numbers can I use to quantify my resume?",
    answer: `<p>
Employers love to see achievements that directly contribute to the company’s bottom line (i.e. revenues and costs). Thus, quantifying your impact in dollars will be most impressive to employers.
<br><br>
However, not all of us work in sales or finance roles where our performance can be easily converted into dollar figures. What should you do in that case? Here are a few options:
<br><br>
1) Use any metric that is relevant to your job, and then make an educated estimate to convert that metric into dollars. For example, improvements you made to a process may have cut the process’s time by 20 hours a week. Twenty hours is equivalent to half of one full-time employee’s workweek, so you can convert your time savings into an estimated financial impact of half the average full-time employee’s salary — say, $30,000 a year.
										<br><br>
										2) There are also other metrics you can use to quantify your results!
										For example, how many people or departments did you work with? Did a change you made result in fewer customer support queries? You can even quantify your achievements based on the size of a project you ran or the time you saved your team on a weekly basis. 
										<br><br>
										3. Keep in mind that quantifying a bullet point is not just about the amount (i.e. how much, or a dollar or percentage value) but also the frequency (i.e. how often) and length (i.e. how long a project was).

<br><br>

There are hundreds of other metrics you can use depending on your industry. If you're in marketing, metrics include things like marketing spend, total subscribers, change in conversion rates and changes in customer acquisition costs. If you're in a technical field like software engineering, metrics could include reduction in execution speed, size of data you worked with and time you saved your team.</p>`,
  },
];

const explanation = `
    Recruiters are looking for evidence of impact on your resume, and hard numbers help with this. To explain this, let's compare these two lines from a sample resume (don't worry, we'll rewrite lines on your own resume in a second) Notice how using hard numbers emphasizes the impact of your work — this is what recruiters look for on your resume. Let's now work through your own resume, including giving you ideas of numbers even if you're not in a numbers-heavy role.

Our data has shown that the best performing resumes quantify the majority of their bullet points (75%+)..
  `;

const question = "What do hard numbers and quantifying impact mean?";

interface MainProps {
  resume_url: string;
  impact_score: number;
  brevity_score: number;
  style_score: number;
  sections_score: number;
  soft_skills_score: number;
  overall_score: number;
  overall_feedback: string;
  userName: string;
  previousScore: number | null;
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
  impact_score: number,
  brevity_score: number,
  style_score: number,
  sections_score: number,
  soft_skills_score: number,
): ScoreItem[] => [
  {
    id: "1",
    title: "Impact",
    description:
      impact_score > THRESHOLD
        ? "Strong metrics showcase achievements."
        : "Add more numbers and metrics",
    status: impact_score > THRESHOLD ? "success" : "error",
    action: impact_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/impact",
  },
  {
    id: "2",
    title: "Brevity",
    description:
      brevity_score > THRESHOLD
        ? "No verbs were overused"
        : "Wordy—trim unnecessary details.",
    status: brevity_score > THRESHOLD ? "success" : "error",
    action: brevity_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/brevity",
  },
  {
    id: "3",
    title: "Style",
    description:
      style_score > THRESHOLD
        ? "Well-formatted, consistent, and professional"
        : "We found weak action verbs that you should remove from your resume.",
    status: style_score > THRESHOLD ? "success" : "error",
    action: style_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/style",
  },
  {
    id: "4",
    title: "Sections",
    description:
      soft_skills_score > THRESHOLD
        ? "Well-structured with key sections."
        : "Missing sections—add for completeness.",
    status: sections_score > THRESHOLD ? "success" : "error",
    action: sections_score > THRESHOLD ? "MORE" : "FIX",
    path: "/factors/sections",
  },
  {
    id: "5",
    title: "Soft Skills",
    description:
      soft_skills_score > THRESHOLD
        ? "Highlights interpersonal strengths."
        : "Highlights interpersonal strengths.",
    status: soft_skills_score > THRESHOLD ? "success" : "error",
    action: soft_skills_score > THRESHOLD ? "MORE" : "FIX",
    path: "/skills/soft-skills",
  },
];

const Main: React.FC<MainProps> = ({
  resume_url,
  overall_feedback,
  userName,
  overall_score,
  previousScore,
  impact_score,
  brevity_score,
  style_score,
  sections_score,
  soft_skills_score,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"latest" | "previous">("latest");

  const hasPreviousScore = previousScore !== null && previousScore !== undefined;
  const displayedScore = activeTab === "latest" ? overall_score : (hasPreviousScore ? previousScore : 0);
  const scoreDiff = (hasPreviousScore && overall_score !== null && overall_score !== undefined)
    ? (overall_score - previousScore)
    : null;

  return (
    <>
      <div className="grid h-screen grid-cols-2">
        {/* Left half */}
        <div className="h-screen overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-2">
          <Card className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm p-6 md:p-8 text-white">
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-white">
                    Greetings, {userName}.
                  </h1>
                  <p className="mt-1 text-slate-400">
                    Welcome to your resume review.
                  </p>
                </div>
                <button className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
                  HOW IT WORKS
                </button>
              </div>

              {/* Score Tabs */}
              <div className="flex space-x-4 border-b border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab("latest")}
                  className={`flex items-center space-x-2 px-4 py-2 font-medium transition-colors ${
                    activeTab === "latest"
                      ? "border-b-2 border-indigo-500 text-indigo-400"
                      : "border-b-2 border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Star className="h-4 w-4" />
                  <span>LATEST SCORE</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("previous")}
                  className={`flex items-center space-x-2 px-4 py-2 font-medium transition-colors ${
                    activeTab === "previous"
                      ? "border-b-2 border-indigo-500 text-indigo-400"
                      : "border-b-2 border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <History className="h-4 w-4" />
                  <span>PREVIOUS SCORE</span>
                </button>
              </div>

              {/* Score Content */}
              <div className="space-y-6">
                {activeTab === "latest" ? (
                  <>
                    <h2 className="text-xl text-slate-200">
                      Your resume scored {overall_score} out of 10.
                    </h2>
                    <p className="leading-relaxed text-slate-300">
                      {overall_feedback}
                    </p>
                  </>
                ) : (
                  <>
                    {hasPreviousScore ? (
                      <div>
                        <div className="flex items-center space-x-3">
                          <h2 className="text-xl text-slate-200">
                            Your previous resume scored {previousScore} out of 10.
                          </h2>
                          {scoreDiff !== null && (
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                scoreDiff > 0
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : scoreDiff < 0
                                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                  : "bg-slate-700 text-slate-300"
                              }`}
                            >
                              {scoreDiff > 0
                                ? `+${scoreDiff.toFixed(1)} in latest`
                                : scoreDiff < 0
                                ? `${scoreDiff.toFixed(1)} in latest`
                                : "No change"}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 leading-relaxed text-slate-300">
                          This was the overall score from your previous resume evaluation.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-xl text-slate-200">
                          No previous score recorded.
                        </h2>
                        <p className="mt-2 leading-relaxed text-slate-300">
                          You currently have only one resume analysis on record. Upload a new resume to track your progress and score improvements over time.
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Score Bar */}
                <div className="relative pb-4 pt-8">
                  {/* Progress Bar */}
                  <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />

                  {/* Movable Label and Indicator */}
                  <div
                    className="absolute -top-5 -translate-x-1/2 text-sm font-semibold text-indigo-400"
                    style={{
                      left: `${(Math.min(displayedScore, 10) / 10) * 100}%`,
                    }}
                  >
                    {activeTab === "latest" ? "YOUR RESUME" : "PREVIOUS RESUME"}
                  </div>
                  <div
                    className="top-1/6 absolute -translate-y-1/2 transform"
                    style={{
                      left: `${(Math.min(displayedScore, 10) / 10) * 100}%`,
                    }}
                  >
                    <div className="h-4 w-4 -translate-x-1/2 transform rounded-full bg-indigo-500 shadow-lg" />
                  </div>

                  {/* Scale Labels */}
                  <div className="relative mt-2 flex justify-between text-sm text-slate-400">
                    <span>0</span>
                    <span
                      className="absolute -translate-x-1/2"
                      style={{ left: "90%" }}
                    >
                      TOP RESUMES
                    </span>
                    <span>10</span>
                  </div>
                </div>

                {/* Info Box */}
                <div className="flex items-start space-x-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-4">
                  <div className="mt-1 h-5 w-5 flex-shrink-0">💡</div>
                  <p className="text-sm leading-relaxed text-indigo-300">
                    Your score is benchmarked against 1m+ resumes at your career
                    level, and is based on 20+ key recruiter checks. The higher
                    your resume score, the stronger your resume is and the more
                    interviews you are likely to get.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          <div className="flex h-full w-full flex-col justify-start pt-8">
            <div className="mx-auto w-full max-w-6xl mt-4">
              <ResumePlot impact={impact_score} brevity={brevity_score} style={style_score} sections={sections_score} total_score={overall_score}/>
            </div>

            <div className="mt-6 w-full max-w-3xl rounded-xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-sm backdrop-blur-sm text-white">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Steps to increase your score
                </h2>
              </div>

              <p className="mb-8 text-slate-300">
                Your score is made up of five categories: Impact, Brevity,
                Style, Sections and Soft Skills. Let's show you how to increase
                your score in each, and thus your overall resume score so you
                get more interviews.
              </p>

              <div className="space-y-4">
                {scoreItems(
                  impact_score,
                  brevity_score,
                  style_score,
                  sections_score,
                  soft_skills_score,
                ).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 p-4 transition-colors hover:border-slate-700/80"
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
                        <p className="text-sm text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        router.push(item.path);
                      }}
                      className="flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors text-indigo-400 hover:bg-indigo-500/15"
                    >
                      {item.action}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="mx-auto w-full max-w-6xl">
              <RecruiterInsightsCard faqs={faqs} />
            </div>
          </div>
        </div>

        {/* Right half - PDFCanvas */}
        <div className="flex justify-end">
          <PDFCanvas resume_url={resume_url} />
        </div>
      </div>
    </>
  );
};

export default Main;
