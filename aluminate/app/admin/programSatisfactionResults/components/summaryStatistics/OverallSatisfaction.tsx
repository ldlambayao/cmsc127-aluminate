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

const DEPT_FACTORS = [
  { key: "q1", label: "Overall experience at UP Mindanao" },
  { key: "q2", label: "Overall experience at the Department of Math, Physics, and Computer Science" },
  { key: "q3", label: "Non-academic experience at UP Mindanao" },
  { key: "q4", label: "The expertise of the faculty" },
  { key: "q5", label: "In meeting/fulfilling the expected program outcomes" },
  { key: "q6", label: "Alignment of the course learning outcomes with the program learning outcomes" },
];

const PLO_FACTORS = [
  { key: "q7", label: "Development of a holistic understanding of the new general education (GE) courses" },
  { key: "q8", label: "Mastery of fundamental concepts of mathematics" },
  { key: "q9", label: "Mastery of fundamental concepts of statistics" },
  { key: "q10", label: "Mastery of fundamental concepts of computer science" },
  { key: "q11", label: "Enhanced analytical thinking skills through covering advanced mathematics courses" },
  { key: "q12", label: "Ability to use operations research (OR) techniques to aid efficiency of the solution process" },
  { key: "q13", label: "Ability to use GIS tools to aid efficiency of the solution process" },
  { key: "q14", label: "Ability to use statistical methods to aid efficiency of the solution process" },
  { key: "q15", label: "Implementation/development of computer programs for ease in complex computations" },
  { key: "q16", label: "Ability to apply OR and statistical techniques to scientific research practices" },
  { key: "q17", label: "Readiness or confidence to pursue a master's degree in applied mathematics" },
  { key: "q18", label: "Readiness or confidence to pursue a master's degree in statistics" },
  { key: "q19", label: "Readiness or confidence to pursue a master's degree in computer science" },
];

export default function OverallSatisfaction({ program }: Props) {
  const supabase = getSupabaseBrowserClient();
  const [loading, setLoading] = useState(true);
  const [deptData, setDeptData] = useState<any[]>([]);
  const [ploData, setPloData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("satisfaction_section3")
          .select("q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19");
        if (error) throw error;

        if (data) {
          const ratings = ["Very Satisfied", "Satisfied", "Dissatisfied", "Very Dissatisfied"];

          const formattedDeptData = DEPT_FACTORS.map(f => {
            const entry: any = { factor: f.label };
            ratings.forEach(rating => {
              entry[rating] = data.filter((row: any) => String(row[f.key]) === rating).length;
            });
            return entry;
          });
          setDeptData(formattedDeptData);

          const formattedPloData = PLO_FACTORS.map(f => {
            const entry: any = { factor: f.label };
            ratings.forEach(rating => {
              entry[rating] = data.filter((row: any) => String(row[f.key]) === rating).length;
            });
            return entry;
          });
          setPloData(formattedPloData);
        }
      } catch (err) {
        console.error("Error fetching satisfaction data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [program, supabase]);

  const ratings = ["Very Satisfied", "Satisfied", "Dissatisfied", "Very Dissatisfied"];
  const colors = ["#9b1d2a", "#d07878", "#e8b4b4", "#f5dede"];

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Overall Satisfaction</h2>

      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          How satisfied are you with each of the following items with regards to your experience
          at the Department of Math, Physics and Computer Science?
        </p>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={deptData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 150, bottom: 10 }}
            barCategoryGap="20%">
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
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #eee",
                fontSize: "11px" }}
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
            {ratings.map((rating, index) => (
              <Bar
                key={rating}
                dataKey={rating}
                stackId="a"
                fill={colors[index]}
                radius={index === 0 ? [0, 0, 0, 0] : (index === ratings.length - 1 ? [0, 4, 4, 0] : [0, 0, 0, 0])}
                maxBarSize={25}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Rate your overall satisfaction based on the program learning outcomes:
        </p>
        <ResponsiveContainer width="100%" height={700}>
          <BarChart
            data={ploData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 150, bottom: 10 }}
            barCategoryGap="20%">
            <CartesianGrid
              horizontal={false}
              stroke="#f0f0f0"
              />
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
            {ratings.map((rating, index) => (
              <Bar
                key={rating}
                dataKey={rating}
                stackId="a"
                fill={colors[index]}
                radius={index === 0 ? [0, 0, 0, 0] : (index === ratings.length - 1 ? [0, 4, 4, 0] : [0, 0, 0, 0])}
                maxBarSize={25}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
