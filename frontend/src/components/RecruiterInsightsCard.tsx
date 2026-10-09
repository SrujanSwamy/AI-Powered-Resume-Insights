import React from "react";
import { Search, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Insights {
  id: number;
  question: string;
  answer: string;
}

interface RecruiterInsightsPageProps {
  faqs: Insights[];
}

const RecruiterInsightsPage: React.FC<RecruiterInsightsPageProps> = ({ faqs }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full mt-10 bg-transparent text-white">
      <div className="w-full mx-auto space-y-8">
        {/* Header Section */}
        <Card className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm w-full text-white shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center space-x-2">
              <Lightbulb className="h-8 w-8 text-indigo-400" />
              <CardTitle className="text-4xl font-bold tracking-tight text-white">
                Recruiter Insights
              </CardTitle>
            </div>
            <p className="text-slate-400 text-lg mx-auto mt-4">
              Discover valuable insights and answers to common recruiting questions
            </p>
          </CardHeader>

          {/* Search Section */}
          <CardContent className="pt-4 pb-6">
            <div className="relative w-full max-w-2xl mx-auto">
              <Search className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search insights..."
                className="pl-11 h-12 bg-slate-800/40 border border-slate-700/60 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQs Section */}
        <Card className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm shadow-xl w-full text-white">
          <CardContent className="p-6">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">No matching insights found</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id.toString()}
                    className="border border-slate-800/80 rounded-lg px-6 bg-slate-900/40 hover:bg-slate-900/70 transition-all"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-start text-left">
                        <span className="text-lg font-medium text-white">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6">
                      <div
                        className="prose prose-sm max-w-none text-slate-300 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_strong]:text-white"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterInsightsPage;