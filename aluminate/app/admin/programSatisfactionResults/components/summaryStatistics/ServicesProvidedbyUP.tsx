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
import OthersEntryModal from "../modals/others";
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

interface OthersEntry {
  category: string;
  label: string;
  count?: number;
}

// Factors & colors (light → dark pink/red)
const FACTORS = [
  { key: "q1", label: "DMPCS Staff", color: "#f5dede" },
  { key: "q2", label: "Faculty members in general", color: "#f0d0d0" },
  { key: "q3", label: "Faculty members who handle the courses", color: "#ebb8b8" },
  { key: "q4", label: "Office of the University Registrar", color: "#e6a0a0" },
  { key: "q5", label: "Dean's Office", color: "#e09898" },
  { key: "q6", label: "Guidance and Counseling Office", color: "#d68080" },
  { key: "q7", label: "University Library", color: "#d07878" },
  { key: "q8", label: "ICT Office", color: "#c06060" },
  { key: "q9", label: "Office of Student Affairs", color: "#b85050" },
  { key: "q10", label: "Canteen", color: "#a03030" },
  { key: "q11", label: "Guards", color: "#9b1d2a" },
];

export default function ServicesProvidedbyUP({ program }: Props) {
  const supabase = getSupabaseBrowserClient();
  const [chartData, setChartData] = useState<any[]>([]);
  const [otherResponses, setOtherResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<OthersEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: alumniData, error: alumniError } = await supabase
          .from("alumni")
          .select("users!inner(fname, mname, lname), graduation_year, program!inner(program_name), satisfaction_survey_response!inner(satisfaction_section5!inner(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12))");

        if (alumniError) throw alumniError;

        const { data, error } = await supabase
          .from("satisfaction_section5")
          .select("q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12")

        if (error) throw error;

        if (data && alumniData) {
          // Process Chart Data
          const ratingEntries = ["Very Satisfied", "Satisfied", "Dissatisfied", "Very Dissatisfied"];
          const colors = ["#9b1d2a", "#d07878", "#e8b4b4", "#f5dede"];

          const formattedChartData = FACTORS.map(f => {
            const entry: Record<string, any> = { factor: f.label };
            ratingEntries.forEach(rating => {
              entry[rating] = data.filter((row: any) => {
                const rowVal = String(row[f.key] || "").trim();
                return rowVal === rating;
              }).length;
            });
            return entry;
          });
          setChartData(formattedChartData);

          const responses: Response[] = alumniData.flatMap((row: any) =>
            row.satisfaction_survey_response
              .filter((survey: any) => survey.satisfaction_section5?.q12 && String(survey.satisfaction_section5.q12).trim() !== "")
              .map((survey: any) => ({
                name: `${row.users?.fname || ""}${row.users?.mname ? " " + row.users.mname.charAt(0) + ". " : " "}${row.users?.lname || ""}`.trim() || "Anonymous",
                classOf: row.graduation_year ? `Class of ${row.graduation_year}` : "Unknown Year",
                answer: survey.satisfaction_section5.q12,
                program: row.program?.program_name || "Unknown Program"
              }))
          );
          setOtherResponses(responses);
        }
      } catch (err) {
        console.error("Error fetching services data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [program, supabase]);

  const ratingEntries = ["Very Satisfied", "Satisfied", "Dissatisfied", "Very Dissatisfied"];
  const colors = ["#9b1d2a", "#d07878", "#e8b4b4", "#f5dede"];

  const openOthersModal = () => {
    const reasonData: OthersEntry[] = otherResponses.map((r) => ({
      label: r.name,
      category: r.answer,
    }));
    setModalData(reasonData);
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Services provided by UP Mindanao</h2>

      {/*  Chart card  */}
      <div className="bg-white rounded-2xl p-7 shadow-sm flex flex-col">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Please indicate your level of satisfaction with the services provided by the following offices/personnel.
        </p>

        <div className="flex-grow">
          <ResponsiveContainer width="100%" height={500}>
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
          <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={openOthersModal}>
            View Others
          </button>
        </div>
      </div>

      {/* Modal */}
      <OthersEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />
    </section>
  );
}
