"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import ReasonsForRatingModal from "../modals/levelOfDifficulty";
import SuggestionEntryModal from "../modals/suggestToPrep";


interface Props {
  program?: string;
}

interface ChartDataPoint {
  category: string;
  label: string;
  count: number;
}

interface SurveyResponseRow {
  p1q1: string;
}

//  Sub-components 
function ResponseCard({
  question,
  questionHighlight,
  responses,
  onViewAll,
}: {
  question: string;
  questionHighlight?: string;
  responses: Response[];
  onViewAll: () => void;
}) {
  const visible = responses.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm">
      <p className="text-xs font-semibold text-gray-800 mb-4">
        {question}
        {questionHighlight && (
          <span className="font-bold text-red-900">{questionHighlight}</span>
        )}
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

      <div className="flex justify-center mt-6 border-t border-gray-100 pt-4">
        <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={onViewAll}>
          View Responses
        </button>
      </div>
    </div>
  );
}

const DIFFICULTY_LABELS: Record<string, string> = {
  "1": "1-Very Easy",
  "2": "2-Easy",
  "3": "3-Neutral",
  "4": "4-Difficult",
  "5": "5-Very Difficult",
};

//  Main component 
export default function TransitiontoProgram({ program }: Props) {
  const supabase = getSupabaseBrowserClient();
  const [difficultyData, setDifficultyData] = useState<{ rating: string; "Count": number }[]>([]);
  const [transitionData, setTransitionData] = useState<{ category: string; "Count": number }[]>([]);
  const [difficultyResponses, setDifficultyResponses] = useState<Response[]>([]);
  const [suggestResponses, setSuggestResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ReasonEntry[]>([]);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [suggestionData, setSuggestionData] = useState<ReasonEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = supabase
          .from("satisfaction_survey_response")
          .select(`
            p1q3, p1q4, p1q4c1, p1q4c2, p1q4c3, p1q4t1, p1q5,
            alumni(
              graduation_year,
              program(program_name),
              users(fname, lname)
            )
          `);

        const { data: rawData, error } = await query;

        if (error) throw error;

        if (rawData) {
          // Filter data by program if specified
          const data = program 
            ? rawData.filter((row: any) => row.alumni?.program?.program_name === program)
            : rawData;

          // Difficulty Level
          const difficultyCounts: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
          data.forEach(row => {
            const val = String(row.p1q3);
            if (val in difficultyCounts) difficultyCounts[val]++;
          });
          setDifficultyData(Object.keys(difficultyCounts).map(k => ({ 
            rating: DIFFICULTY_LABELS[k] || k, 
            "Count": difficultyCounts[k] 
          })));

          // Transition Help
          const transitionCounts: Record<string, number> = { "Bridging Program": 0, "Refresher course": 0, "Other": 0 };
          data.forEach(row => {
            if (row.p1q4c1) transitionCounts["Bridging Program"]++;
            if (row.p1q4c2) transitionCounts["Refresher course"]++;
            if (row.p1q4c3 || (row.p1q4t1 && row.p1q4t1.trim() !== "")) transitionCounts["Other"]++;
          });
          setTransitionData([
            { category: "Bridging\nProgram", "Count": transitionCounts["Bridging Program"] },
            { category: "Refresher course\nfor certain topics", "Count": transitionCounts["Refresher course"] },
            { category: "Other", "Count": transitionCounts["Other"] }
          ]);

          // Responses
          const diffRes: Response[] = data
            .filter(row => row.p1q4 && row.p1q4.trim() !== "")
            .map(row => ({
              name: `${row.alumni?.users?.fname} ${row.alumni?.users?.lname}` || "Anonymous",
              classOf: `Class of ${row.alumni?.graduation_year}` || "Unknown Year",
              answer: row.p1q4,
              program: row.alumni?.program?.program_name || "Unknown Program"
            }));
          setDifficultyResponses(diffRes);

          const sugRes: Response[] = data
            .filter(row => row.p1q5 && row.p1q5.trim() !== "")
            .map(row => ({
              name: `${row.alumni?.users?.fname} ${row.alumni?.users?.lname}` || "Anonymous",
              classOf: `Class of ${row.alumni?.graduation_year}` || "Unknown Year",
              answer: row.p1q5,
              program: row.alumni?.program?.program_name || "Unknown Program"
            }));
          setSuggestResponses(sugRes);
        }
      } catch (err) {
        console.error("Error fetching transition data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [program, supabase]);

  const openDifficultyModal = () => {
    const reasonData: ReasonEntry[] = difficultyResponses.map((r) => ({
      label: r.name,
      category: r.answer,
    }));
    setModalData(reasonData);
    setIsModalOpen(true);
  };

  const openSuggestModal = () => {
    const reasonData: ReasonEntry[] = suggestResponses.map((r) => ({
      label: r.name,
      category: r.answer,
    }));
    setSuggestionData(reasonData);
    setIsSuggestionModalOpen(true);
  };

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Transition to the Program</h2>

      <div className="flex gap-4">
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0 flex flex-col">
          <p className="text-xs font-semibold text-gray-800 mb-4">
            What is the level of difficulty of your adjustment to the BSAM program?
          </p>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={difficultyData}
                margin={{ top: 10, right: 10, left: -10, bottom: 45 }}
                barCategoryGap="30%"
              >
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="rating"
                  tick={{ fontSize: 10, fill: "#888" }}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#888" }}
                  allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: "rgba(216,154,154,0.10)" }} contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
                  labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
                  itemStyle={{ color: "#333" }} />
                <Bar 
                  dataKey="Count" 
                  fill="#D89A9A" 
                  radius={[8, 8, 0, 0]} 
                  maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 border-t border-gray-100 pt-4">
            <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={openDifficultyModal}>
              View Reasons
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0">
          <p className="text-xs font-semibold text-gray-800 mb-4">What will make the transition easier for you?</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={transitionData}
              margin={{ top: 10, right: 10, left: -10, bottom: 40 }}
              barCategoryGap="35%"
            >
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 10, fill: "#888" }} />
              <YAxis
                tick={{ fontSize: 11, fill: "#888" }}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(216,154,154,0.10)" }} contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
                labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
                itemStyle={{ color: "#333" }}
              />
              <Legend
                iconType="square"
                iconSize={10}
                wrapperStyle={{ fontSize: "11px", color: "#555" }}
              />
              <Bar
                dataKey="Count"
                fill="#E8C4C4"
                radius={[8, 8, 0, 0]}
                maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ResponseCard
        question="What can you suggest to prepare you for the course requirements of the whole BSAM program?"
        responses={suggestResponses}
        onViewAll={openSuggestModal}
      />

      <ReasonsForRatingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={modalData} />
      <SuggestionEntryModal isOpen={isSuggestionModalOpen} onClose={() => setIsSuggestionModalOpen(false)} data={suggestionData} />
    </section>
  );
}



