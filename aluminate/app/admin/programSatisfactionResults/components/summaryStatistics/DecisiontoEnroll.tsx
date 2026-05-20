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

interface Props {
  program?: string;
}

interface LearnDataPoint {
  source: string;
  Count: number;
}

interface FactorDataPoint {
  factor: string;
  [key: string]: string | number;
}

const LEARN_ABOUT_MAPPING = [
  { key: "p1q2c1", label: "UP Website" },
  { key: "p1q2c2", label: "UP Faculty/Employee" },
  { key: "p1q2c3", label: "Friend/Colleague" },
  { key: "p1q2t1", label: "Other" },
];

const ENROLLMENT_FACTORS_MAPPING = [
  { key: "p1q6q1", label: "Reputation of UP Mindanao" },
  { key: "p1q6q2", label: "Reputation of UP Mindanao Department of Math, Physics and Computer Science" },
  { key: "p1q6q3", label: "Reputation of the BSAM program" },
  { key: "p1q6q4", label: "Reputation/Expertise of the Faculty members" },
  { key: "p1q6q5", label: "The program matches my interests" },
  { key: "p1q6q6", label: "Financial consideration" },
  { key: "p1q6q7", label: "Recommendation of a friend" },
  { key: "p1q6q8", label: "Encouragement of parent/s or relatives" },
  { key: "p1q6q9", label: "Encouragement of a faculty member" },
];

const RATING_LABELS: Record<string, string> = {
  "1": "1-not important",
  "2": "2-somewhat important",
  "3": "3-important",
  "4": "4-very important",
};

const RATING_COLORS: Record<string, string> = {
  "1-not important": "#E8C4C4",
  "2-somewhat important": "#D66B66",
  "3-important": "#A0302B",
  "4-very important": "#742314",
};


export default function DecisiontoEnroll({ program }: Props) {
  const supabase = getSupabaseBrowserClient();
  const [learnData, setLearnData] = useState<LearnDataPoint[]>([]);
  const [factorsData, setFactorsData] = useState<FactorDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("satisfaction_survey_response")
          .select(`
            p1q2c1, p1q2c2, p1q2c3, p1q2t1,
            p1q6q1, p1q6q2, p1q6q3, p1q6q4, p1q6q5, p1q6q6, p1q6q7, p1q6q8, p1q6q9,
            alumni(
              program(program_name)
            )
          `);

        const { data: rawData, error } = await query;

        if (error) throw error;

        if (rawData) {
          console.log("DecisiontoEnroll: Raw data count from Supabase:", rawData.length);
          
          // Filter data by program if specified
          const data = program 
            ? rawData.filter((row: any) => row.alumni?.program?.program_name === program)
            : rawData;

          console.log("DecisiontoEnroll: Processed data count (after program filter):", data.length);
          if (data.length > 0) {
            console.log("DecisiontoEnroll: First row sample:", JSON.stringify(data[0], null, 2));
          }

          // Process Learn About Data
          const learnCounts: Record<string, number> = {
            "UP Website": 0,
            "UP Faculty/Employee": 0,
            "Friend/Colleague": 0,
            "Other": 0,
          };

          data.forEach((row: any) => {
            if (row.p1q2c1) learnCounts["UP Website"]++;
            if (row.p1q2c2) learnCounts["UP Faculty/Employee"]++;
            if (row.p1q2c3) learnCounts["Friend/Colleague"]++;
            if (row.p1q2t1 && row.p1q2t1.trim() !== "") learnCounts["Other"]++;
          });

          const formattedLearnData = LEARN_ABOUT_MAPPING.map((m) => ({
            source: m.label,
            "Count": learnCounts[m.label],
          }));

          setLearnData(formattedLearnData);

          // Process Factors Data
          const formattedFactorsData = ENROLLMENT_FACTORS_MAPPING.map((m) => {
            const entry: any = { factor: m.label };
            Object.entries(RATING_LABELS).forEach(([val, label]) => {
              entry[label] = data.filter((row: any) => String(row[m.key]) === val).length;
            });
            return entry;
          });

          setFactorsData(formattedFactorsData);
        }
      } catch (err) {
        console.error("Error fetching survey metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [program, supabase]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 text-sm">Loading charts...</div>;
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Decision to Enroll</h2>

      {/* ── Card 1 ── */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">How did you learn about the BSAM program?</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={learnData}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
            barCategoryGap="35%"
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="source"
              tick={{ fontSize: 11, fill: "#888" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#888" }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(232,196,196,0.12)" }}
              contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "13px" }}
              labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
              itemStyle={{ color: "#333" }}
            />
            <Legend
              iconType="square"
              iconSize={10}
              wrapperStyle={{ fontSize: "12px", color: "#555", paddingTop: "8px" }}
            />
            <Bar
              dataKey="Count"
              fill="#E8C4C4"
              radius={[8, 8, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Card 2 ── */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Rate the importance of each of the following factors in your decision to enroll in the BSAM Program
        </p>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            data={factorsData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
            barCategoryGap="20%"
            barGap={2}
          >
            <CartesianGrid horizontal={false} stroke="#f0f0f0" />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#888" }}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="factor"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#555" }}
              width={250}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
              labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
              itemStyle={{ color: "#333" }}
            />
            <Legend
              iconType="square"
              iconSize={10}
              wrapperStyle={{ fontSize: "11px", color: "#555", paddingTop: "12px" }}
            />
            {Object.entries(RATING_COLORS).map(([label, color]) => (
              <Bar
                key={label}
                dataKey={label}
                fill={color}
                radius={[0, 4, 4, 0]}
                maxBarSize={12}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}