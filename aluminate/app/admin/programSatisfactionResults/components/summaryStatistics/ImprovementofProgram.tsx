"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import SuggestionEntryModal from "../modals/suggestToPrep";
import SuggestImprovement from "../modals/suggestImprovement";
import WhyWhyNotModal from "../modals/whyWhyNot";
import SuggestOverallModal from "../modals/suggestOverall";
import AdditionalCommentsModal from "../modals/additionalComments";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

interface Props {
  program?: string;
}

interface Response {
  name: string;
  classOf: string;
  answer: string;
  program: string;
}

interface suggestionEntry {
  category: string;
  label: string;
  count?: number;
}

//  Chart data labels
const STRENGTHS_LABELS = [
  { key: "p5q1c1", label: "Curriculum structure" },
  { key: "p5q1c2", label: "Facilities and equipment are adequate (classrooms, library, projectors)" },
  { key: "p5q1c3", label: "Resources are sufficient (wifi, reading materials, books)" },
  { key: "p5q1c4", label: "Expertise of the faculty members" },
  { key: "p5q1c5", label: "Supportive faculty members" },
  { key: "p5q1c6", label: "Supportive non-teaching staff" },
  { key: "p5q1c7", label: "Others" },
];

const WEAKNESSES_LABELS = [
  { key: "p5q3c1", label: "Some courses are irrelevant" },
  { key: "p5q3c2", label: "Facilities and equipment are not adequate (classrooms, library, projectors)" },
  { key: "p5q3c3", label: "Resources are not sufficient (wifi, reading materials, books)" },
  { key: "p5q3c4", label: "Lack of expertise of some faculty members" },
  { key: "p5q3c5", label: "Lack of support from some faculty members" },
  { key: "p5q3c6", label: "Lack of support from non-teaching staff" },
  { key: "p5q3c7", label: "Others" },
];

const DONUT_COLORS = ["#9b1d2a", "#f5dede"];

//  Custom donut center label 
const renderDonutLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  // Only render label for the first (Yes) segment
  if (props.payload.name === "Yes") {
    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={24} fontWeight={700} fill="#333">
        {(percent * 100).toFixed(0)}%
      </text>
    );
  }
  return null;
};

//  Reusable response card 
function ResponseCard({
  question,
  isHighlighted = false,
  responses,
  onViewAll,
}: {
  question: string;
  isHighlighted?: boolean;
  responses: Response[];
  onViewAll?: () => void;
}) {
  const visible = responses.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm">
      <p className={isHighlighted ? "text-xs font-semibold text-red-900 mb-4" : "text-xs font-semibold text-gray-800 mb-4"}>
        {question}
      </p>
      <div className="flex flex-col gap-5">
        {visible.length > 0 ? visible.map((r, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <p className="font-bold text-gray-900 text-sm">{r.name}</p>
            <p className="text-xs text-gray-500">{r.classOf}</p>
            <p className="text-sm text-gray-700">{r.answer}</p>
            <span className="inline-block px-2.5 py-0.75 bg-red-50 text-red-900 rounded-full text-xs font-bold tracking-wide self-start">{r.program}</span>
          </div>
        )) : <p className="text-sm text-gray-500">No responses yet.</p>}
      </div>
      {onViewAll && (
        <div className="flex justify-center mt-6 border-t border-gray-100 pt-4">
          <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={onViewAll}>
            View Responses
          </button>
        </div>
      )}
    </div>
  );
}

export default function ImprovementofProgram({ program }: Props) {
  const supabase = getSupabaseBrowserClient();
  const [loading, setLoading] = useState(true);
  
  const [strengthsData, setStrengthsData] = useState<any[]>([]);
  const [weaknessesData, setWeaknessesData] = useState<any[]>([]);
  const [recommendData, setRecommendData] = useState<any[]>([]);

  const [strengthsOtherResponses, setStrengthsOtherResponses] = useState<Response[]>([]);
  const [weaknessesOtherResponses, setWeaknessesOtherResponses] = useState<Response[]>([]);
  const [suggestionResponses, setSuggestionResponses] = useState<Response[]>([]);
  const [recommendWhyResponses, setRecommendWhyResponses] = useState<Response[]>([]);
  const [overallImprovementResponses, setOverallImprovementResponses] = useState<Response[]>([]);
  const [additionalCommentsResponses, setAdditionalCommentsResponses] = useState<Response[]>([]);

  const [isSuggestionsEntryModalOpen, setIsSuggestionsEntryModalOpen] = useState(false);
  const [isSuggestImprovementModalOpen, setIsSuggestImprovementModalOpen] = useState(false);
  const [isWhyWhyNotModalOpen, setIsWhyWhyNotModalOpen] = useState(false);
  const [isSuggestOverallModalOpen, setIsSuggestOverallModalOpen] = useState(false);
  const [isAdditionalCommentsModalOpen, setIsAdditionalCommentsModalOpen] = useState(false);
  
  const [modalData, setModalData] = useState<suggestionEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = supabase
          .from("satisfaction_survey_response")
          .select(`
            p5q1c1, p5q1c2, p5q1c3, p5q1c4, p5q1c5, p5q1c6, p5q1c7,
            p5q2, p5q3c1, p5q3c2, p5q3c3, p5q3c4, p5q3c5, p5q3c6, p5q3c7,
            p5q4, p5q5, p5q6, p5q7, p5q8, p5q9,
            alumni(
              graduation_year,
              program(program_name),
              users(fname, lname)
            )
          `);

        const { data: rawData, error } = await query;
        if (error) throw error;

        if (rawData) {
          const data = program 
            ? rawData.filter((row) => (row.alumni as any)?.program?.program_name === program)
            : rawData;

          // Process Strengths/Weaknesses Data
          const processChecks = (labels: any[]) => labels.map(l => ({
            factor: l.label,
            count: data.filter(row => (row as any)[l.key] === true).length
          }));
          
          setStrengthsData(processChecks(STRENGTHS_LABELS));
          setWeaknessesData(processChecks(WEAKNESSES_LABELS));

          // Process Recommendation Data (p5q6)
          const yesCount = data.filter(row => (row as any).p5q6 === "Yes").length;
          const noCount = data.filter(row => (row as any).p5q6 === "No").length;
          const total = yesCount + noCount || 1;
          setRecommendData([
            { name: "Yes", value: parseFloat(((yesCount / total) * 100).toFixed(2)) },
            { name: "No", value: parseFloat(((noCount / total) * 100).toFixed(2)) },
          ]);

          // Map Responses
          const mapResponse = (key: string) => data
            .filter(row => (row as any)[key] && (row as any)[key].trim() !== "")
            .map(row => ({
              name: `${(row as any).alumni?.users?.fname} ${(row as any).alumni?.users?.lname}` || "Anonymous",
              classOf: `Class of ${(row as any).alumni?.graduation_year}` || "Unknown Year",
              answer: (row as any)[key],
              program: (row as any).alumni?.program?.program_name || "Unknown Program"
            }));

          setStrengthsOtherResponses(mapResponse("p5q2"));
          setWeaknessesOtherResponses(mapResponse("p5q4"));
          setSuggestionResponses(mapResponse("p5q5"));
          setRecommendWhyResponses(mapResponse("p5q7")); 
          setOverallImprovementResponses(mapResponse("p5q8"));
          setAdditionalCommentsResponses(mapResponse("p5q9"));
        }
      } catch (err) {
        console.error("Error fetching improvement data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [program, supabase]);

  const openModal = (responses: Response[], setOpen: (open: boolean) => void) => {
    setModalData(responses.map(r => ({ label: r.name, category: r.answer })));
    setOpen(true);
  };

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Other questions for the improvement of the program</h2>

      <div className="flex flex-col gap-4">
        {/* Strengths Chart */}
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0 flex flex-col">
          <p className="text-xs font-semibold text-gray-800 mb-4">
            Based on your experience, what do you think are the strengths of the program? (Please check all that apply)
          </p>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={strengthsData} layout="vertical" margin={{ top: 10, right: 30, left: 150, bottom: 10 }}>
                <CartesianGrid horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#aaa" }} allowDecimals={false} />
                <YAxis type="category" dataKey="factor" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#555" }} width={140} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "11px" }} labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
              itemStyle={{ color: "#333" }}/>
                <Bar dataKey="count" fill="#E8C4C4" radius={[0, 4, 4, 0]} maxBarSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 border-t border-gray-100 pt-4">
            <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={() => openModal(strengthsOtherResponses, setIsSuggestionsEntryModalOpen)}>
              View Responses
            </button>
          </div>
        </div>

        {/* Weaknesses Chart */}
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0 flex flex-col">
          <p className="text-xs font-semibold text-gray-800 mb-4">
            Based on your experience, what do you think are the weaknesses of the program? (Please check all that apply)
          </p>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={weaknessesData} layout="vertical" margin={{ top: 10, right: 30, left: 150, bottom: 10 }}>
                <CartesianGrid horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#aaa" }} allowDecimals={false} />
                <YAxis type="category" dataKey="factor" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#555" }} width={140} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "11px" }} labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
              itemStyle={{ color: "#333" }}/>
                <Bar dataKey="count" fill="#D89A9A" radius={[0, 4, 4, 0]} maxBarSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 border-t border-gray-100 pt-4">
            <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={() => openModal(weaknessesOtherResponses, setIsSuggestImprovementModalOpen)}>
              View Responses
            </button>
          </div>
        </div>
      </div>

      <ResponseCard
        question="What can you suggest to improve your overall BSAM student experience?"
        responses={suggestionResponses}
        onViewAll={() => openModal(suggestionResponses, setIsSuggestionsEntryModalOpen)}
      />

      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">Will you recommend the BSAM program?</p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={recommendData}
              cx="40%"
              cy="50%"
              innerRadius={52}
              outerRadius={75}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              labelLine={false}
              label={renderDonutLabel}
            >
              {recommendData.map((_, i) => (
                <Cell key={i} fill={DONUT_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => `${value}%`}
              contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
              labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
              itemStyle={{ color: "#333" }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ fontSize: "12px", color: "#555" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center mt-4 border-t border-gray-100 pt-4">
          <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={() => openModal(recommendWhyResponses, setIsWhyWhyNotModalOpen)}>
            View Why or Why Not
          </button>
        </div>
      </div>

      <ResponseCard
        question="What can you suggest for the overall improvement of the BSAM program?"
        responses={overallImprovementResponses}
        onViewAll={() => openModal(overallImprovementResponses, setIsSuggestOverallModalOpen)}
      />

      <ResponseCard
        question="Please write here any additional comment/s or suggestion/s you may have..."
        responses={additionalCommentsResponses}
        onViewAll={() => openModal(additionalCommentsResponses, setIsAdditionalCommentsModalOpen)}
      />

      {/* Modals */}
      <SuggestionEntryModal isOpen={isSuggestionsEntryModalOpen} onClose={() => setIsSuggestionsEntryModalOpen(false)} data={modalData} />
      <SuggestImprovement isOpen={isSuggestImprovementModalOpen} onClose={() => setIsSuggestImprovementModalOpen(false)} data={modalData} />
      <WhyWhyNotModal isOpen={isWhyWhyNotModalOpen} onClose={() => setIsWhyWhyNotModalOpen(false)} data={modalData} />
      <SuggestOverallModal isOpen={isSuggestOverallModalOpen} onClose={() => setIsSuggestOverallModalOpen(false)} data={modalData} />
      <AdditionalCommentsModal isOpen={isAdditionalCommentsModalOpen} onClose={() => setIsAdditionalCommentsModalOpen(false)} data={modalData} />

    </section>
  );
}
