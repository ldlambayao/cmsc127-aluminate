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
import ExplainEntryModal from "../modals/cultureEnvironment";
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

interface ReasonEntry {
  label: string;
  category: string;
}

// Factors & colors 
const FACTORS = [
  { key: "p3q1", label: "Inclusivity (individuals with diverse backgrounds)", color: "#f5dede" },
  { key: "p3q2", label: "Faculty members serve as exemplars of 'honor and excellence'", color: "#e8b4b4" },
  { key: "p3q3", label: "Students are encouraged to participate", color: "#d07878" },
  { key: "p3q4", label: "The expertise of the faculty", color: "#9b1d2a" },
];

const RATING_LABELS: Record<string, string> = {
  "Strongly Agree": "Strongly Agree",
  "Agree": "Agree",
  "Disagree": "Disagree",
  "Strongly Disagree": "Strongly Disagree",
};

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
      <div className="text-xs font-semibold text-gray-800 mb-4">
        {question}
        {questionHighlight && (
          <span className="font-bold text-red-900">{questionHighlight}</span>
        )}
      </div>

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

export default function IntellectualCulturalEnvironment({ program }: Props) {
  const supabase = getSupabaseBrowserClient();
  const [chartData, setChartData] = useState<any[]>([]);
  const [explainResponses, setExplainResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ReasonEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = supabase
          .from("satisfaction_survey_response")
          .select(`
            p3q1, p3q2, p3q3, p3q4, p3q5,
            alumni(
              graduation_year,
              program(program_name),
              users(fname, lname)
            )
          `);

        const { data: rawData, error } = await query;

        if (error) throw error;

        if (rawData) {
          console.log("IntellectualCulture: Raw data count:", rawData.length);
          if (rawData.length > 0) {
            console.log("IntellectualCulture: Sample row:", JSON.stringify(rawData[0], null, 2));
          }

          // Filter data by program if specified
          const data = program 
            ? rawData.filter((row) => (row.alumni as any)?.program?.program_name === program)
            : rawData;

          console.log("IntellectualCulture: Filtered data count:", data.length);

          // Process Chart Data
          const ratingEntries = ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"];
          const colors = ["#9b1d2a", "#d07878", "#e8b4b4", "#f5dede"];

          const formattedChartData = FACTORS.map(f => {
            const entry: Record<string, any> = { factor: f.label };
            ratingEntries.forEach(rating => {
              entry[rating] = data.filter(row => {
                const rowVal = String((row as any)[f.key] || "").trim();
                return rowVal === rating;
              }).length;
            });
            return entry;
          });
          setChartData(formattedChartData);

          // Process Explain Responses
          const responses: Response[] = data
            .filter(row => (row as any).p3q5 && (row as any).p3q5.trim() !== "")
            .map(row => ({
              name: `${(row as any).alumni?.users?.fname} ${(row as any).alumni?.users?.lname}` || "Anonymous",
              classOf: `Class of ${(row as any).alumni?.graduation_year}` || "Unknown Year",
              answer: (row as any).p3q5,
              program: (row as any).alumni?.program?.program_name || "Unknown Program"
            }));
          setExplainResponses(responses);
        }
      } catch (err) {
        console.error("Error fetching culture data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [program, supabase]);

  const ratingEntries = ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"];
  const colors = ["#9b1d2a", "#d07878", "#e8b4b4", "#f5dede"];

  const openExplainModal = () => {
    const reasonData: ReasonEntry[] = explainResponses.map((r) => ({
      label: r.name,
      category: r.answer,
    }));
    setModalData(reasonData);
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">
        Intellectual and cultural environment and support given by the Department of Math, Physics and Computer Science
      </h2>

      {/*  Chart card  */}
      <div className="bg-white rounded-2xl p-7 shadow-sm flex flex-col">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Please rate how the culture in your school environment captures the factors stated below.
        </p>

        <div className="flex-grow">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 150, bottom: 10 }}
              barCategoryGap="20%"
            >
              <CartesianGrid horizontal={false} stroke="#f0f0f0" />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#aaa" }}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="factor"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#555" }}
                width={140}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.03)" }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "11px" }}
                labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
                itemStyle={{ color: "#333" }}
              />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                iconType="square"
                iconSize={10}
                wrapperStyle={{ fontSize: "11px", color: "#555", paddingTop: "20px" }} 
              />
              {ratingEntries.map((rating, index) => (
                <Bar 
                  key={rating} 
                  dataKey={rating} 
                  stackId="a"
                  fill={colors[index]} 
                  radius={index === 0 ? [0, 0, 0, 0] : (index === ratingEntries.length - 1 ? [0, 4, 4, 0] : [0, 0, 0, 0])} 
                  maxBarSize={25} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center mt-4 border-t border-gray-100 pt-4">
          <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={openExplainModal}>
            View Explanations
          </button>
        </div>
      </div>

      {/* Modal */}
      <ExplainEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />
    </section>
  );
}
