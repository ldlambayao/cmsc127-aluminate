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
  { key: "p2q1", label: "Overall BSAM curriculum at UP Mindanao", color: "#f5dede" },
  { key: "p2q2", label: "Overall experience at the Department of Math, Physics, and Computer Science", color: "#ebb8b8" },
  { key: "p2q3", label: "Your academic experience at UP Mindanao", color: "#e09898" },
  { key: "p2q4", label: "The atmosphere of the faculty", color: "#d07878" },
  { key: "p2q5", label: "In meeting/fulfilling the expected program outcomes", color: "#b85050" },
  { key: "p2q6", label: "Alignment of the module learning outcomes with the program learning outcomes", color: "#9b1d2a" },
];

const PLO_FACTORS = [
{ key: "p2q7", label: "Development of a holistic understanding of the same general education (GE) courses", color: "#f2c9c9" },
{ key: "p2q8", label: "Mastery of \"foundational concepts of mathematics\"", color: "#eaa8a8" },
{ key: "p2q9", label: "Mastery of \"fundamental concepts of statistics\"", color: "#e08f8f" },
{ key: "p2q10", label: "Mastery of \"fundamental concepts of computer science\"", color: "#d67676" },
{ key: "p2q11", label: "Enhanced academic thinking skills through solving complex mathematical and technical problems", color: "#c85f5f" },
{ key: "p2q12", label: "Ability to use appropriate numerical/GIS tools based on effectiveness of the solution process", color: "#b94a4a" },
{ key: "p2q13", label: "Ability to use R/R tools to efficiently aid the solution process", color: "#a93f3f" },
{ key: "p2q14", label: "Ability to use statistical methods and efficiency of the various disciplines", color: "#993636" },
{ key: "p2q15", label: "Implementation/Specification of computer programs to support multiple computations", color: "#8a2f2f" },
{ key: "p2q16", label: "Ability to apply data analytics techniques to support research programs", color: "#7a2929" },
{ key: "p2q17", label: "Readiness in confidence to pursue a master's degree in applied mathematics", color: "#6a2323" },
{ key: "p2q18", label: "Readiness in confidence to pursue a master's degree in statistics", color: "#5a1e1e" },
{ key: "p2q19", label: "Readiness in confidence to pursue a master's degree in computer science", color: "#7f1f2a" }
];

const RATING_LABELS: Record<string, string> = {
  "Very Satisfied": "Very Satisfied",
  "Satisfied": "Satisfied",
  "Dissatisfied": "Dissatisfied",
  "Very Dissatisfied": "Very Dissatisfied",
};

export default function OverallSatisfaction({ program }: Props) {
  const supabase = getSupabaseBrowserClient();
  const [deptData, setDeptData] = useState<any[]>([]);
  const [ploData, setPloData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("satisfaction_survey_response")
          .select(`
            p2q1, p2q2, p2q3, p2q4, p2q5, p2q6,
            p2q7, p2q8, p2q9, p2q10, p2q11, p2q12, p2q13, p2q14, p2q15, p2q16, p2q17, p2q18, p2q19,
            alumni!inner(
              program!inner(program_name)
            )
          `);

        if (program) {
          query = query.eq("alumni.program.program_name", program);
        }

        const { data, error } = await query;

        if (error) throw error;

        if (data) {
          const ratings = ["Very Satisfied", "Satisfied", "Dissatisfied", "Very Dissatisfied"];
          
          const formattedDeptData = ratings.map(rating => {
            const entry: any = { level: RATING_LABELS[rating] };
            DEPT_FACTORS.forEach(f => {
              entry[f.label] = data.filter(row => String(row[f.key]) === rating).length;
            });
            return entry;
          });
          setDeptData(formattedDeptData);

          const formattedPloData = ratings.map(rating => {
            const entry: any = { level: RATING_LABELS[rating] };
            PLO_FACTORS.forEach(f => {
              entry[f.label] = data.filter(row => String(row[f.key]) === rating).length;
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
            margin={{ top: 10, right: 20, left: 90, bottom: 10 }} barCategoryGap="18%" 
            barGap={1}>
            <CartesianGrid horizontal={false} stroke="#f0f0f0" />
            <XAxis 
            type="number" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "#aaa" }} allowDecimals={false}
            />
            <YAxis 
            type="category" 
            dataKey="level" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#555" }} width={100} 
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
            
            <Legend layout="vertical" align="right" verticalAlign="middle" iconType="square" iconSize={10} wrapperStyle={{ fontSize: "11px", color: "#555", paddingLeft: "16px", maxWidth: "240px" }} />
            {DEPT_FACTORS.map(f => <Bar key={f.key} dataKey={f.label} fill={f.color} radius={[0, 4, 4, 0]} maxBarSize={9} />)}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Rate your overall satisfaction based on the program learning outcomes:
        </p>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart 
            data={ploData} 
            layout="vertical" 
            margin={{ top: 10, right: 20, left: 90, bottom: 10 }} 
            barCategoryGap="18%" 
            barGap={2}>
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
              dataKey="level" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#555" }} 
              width={100} 
              />
            <Tooltip 
              cursor={{ fill: "rgba(0,0,0,0.03)" }} 
              contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "11px" }} 
              labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
              itemStyle={{ color: "#333" }}
              />
            <Legend 
              layout="vertical" 
              align="right" 
              verticalAlign="middle" 
              iconType="square" 
              iconSize={10} 
              wrapperStyle={{ fontSize: "11px", color: "#555", paddingLeft: "16px", maxWidth: "240px" }} />
            {PLO_FACTORS.map(f => <Bar key={f.key} dataKey={f.label} fill={f.color} radius={[0, 4, 4, 0]} maxBarSize={9} />)}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
