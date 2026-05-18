"use client";

import { useState } from "react";
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

interface Props {
  program?: string;
}

// â”€â”€ Chart data 
const STRENGTHS_DATA = [
  { x: "Courses are relevant", count: 18 },
  { x: "Facilities and equipment are adequate (classrooms, library, projectors)", count: 32 },
  { x: "Resources are sufficient (wifi, reading materials, books)", count: 55 },
  { x: "Expertise of the faculty members", count: 40 },
  { x: "Supportive faculty members", count: 28 },
  { x: "Supportive non-teaching staff", count: 45 },
];

const WEAKNESSES_DATA = [
  { x: "Some courses are irrelevant", count: 22 },
  { x: "Facilities and equipment are not adequate (classrooms, library, projectors)", count: 38 },
  { x: "Resources are not sufficient (wifi, reading materials, books)", count: 60 },
  { x: "Lack of expertise of some faculty members", count: 50 },
  { x: "Lack of support from some faculty members", count: 30 },
  { x: "Lack of support from non-teaching staff", count: 52 },
];

const RECOMMEND_DATA = [
  { name: "Yes", value: 86.08 },
  { name: "No",  value: 13.92 },
];
const DONUT_COLORS = ["#D89A9A", "#f5dede"];

// â”€â”€ Sample responses 
const SAMPLE_RESPONSES = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
];

// â”€â”€ Custom donut center label 
const renderDonutLabel = ({ cx, cy }: { cx: number; cy: number }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={20} fontWeight={700} fill="#333">
    86.08
  </text>
);

// â”€â”€ Reusable pill bar chart 
function PillBarChart({ data, color }: { data: { x: string; count: number }[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={520}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 100 }} barCategoryGap="25%">
        <CartesianGrid vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey="x" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 10, fill: "#888" }}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#888" }} />
        <Tooltip
          cursor={{ fill: "rgba(216,154,154,0.10)" }}
          contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
        />
        <Bar dataKey="count" fill={color} radius={[999, 999, 999, 999]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// â”€â”€ Reusable response card 
function ResponseCard({
  question,
  isHighlighted = false,
  responses,
}: {
  question: string;
  isHighlighted?: boolean;
  responses: typeof SAMPLE_RESPONSES;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? responses : responses.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm">
      <p className={isHighlighted ? "text-xs font-semibold text-red-900 mb-4" : "text-xs font-semibold text-gray-800 mb-4"}>
        {question}
      </p>
      <div className="flex flex-col gap-5">
        {visible.map((r, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <p className="font-bold text-gray-900 text-sm">{r.name}</p>
            <p className="text-xs text-gray-500">{r.classOf}</p>
            <p className="text-sm text-gray-700">{r.answer}</p>
            <span className="inline-block px-2.5 py-0.75 bg-red-50 text-red-900 rounded-full text-xs font-bold tracking-wide self-start">{r.program}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 border-t border-gray-100 pt-4">
        <button className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "View Responses"}
        </button>
      </div>
    </div>
  );
}

export default function ImprovementofProgram({ program }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Other questions for the improvement of the program</h2>

      <div className="flex gap-4">
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0">
          <p className="text-xs font-semibold text-gray-800 mb-4">
            Based on your experience, what do you think are the strengths of the program? (Please check all that apply)
          </p>
          <PillBarChart data={STRENGTHS_DATA} color="#E8C4C4" />
        </div>
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0">
          <p className="text-xs font-semibold text-gray-800 mb-4">
            Based on your experience, what do you think are the weaknesses of the program? (Please check all that apply)
          </p>
          <PillBarChart data={WEAKNESSES_DATA} color="#D89A9A" />
        </div>
      </div>

      <ResponseCard
        question="What can you suggest to improve your overall BSAM student experience?"
        responses={SAMPLE_RESPONSES}
      />

      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">Will you recommend the BSAM program?</p>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={RECOMMEND_DATA}
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
              {RECOMMEND_DATA.map((_, i) => (
                <Cell key={i} fill={DONUT_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `${value}%`}
              contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
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
      </div>

      <ResponseCard
        question="Why or why not?"
        isHighlighted
        responses={SAMPLE_RESPONSES}
      />

      <ResponseCard
        question="What can you suggest for the overall improvement of the BSAM program?"
        responses={SAMPLE_RESPONSES}
      />

      <ResponseCard
        question="Please write here any additional comment/s or suggestion/s you may have on how we might have improved your experience in taking the degree program or how we can improve the program for the future takers of the degree program."
        responses={SAMPLE_RESPONSES}
      />
    </section>
  );
}




