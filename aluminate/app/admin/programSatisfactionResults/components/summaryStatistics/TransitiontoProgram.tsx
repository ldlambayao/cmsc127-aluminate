"use client";

import { useState } from "react";
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

interface Props {
  program?: string;
}

// â”€â”€ Sample data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DIFFICULTY_DATA = [
  { rating: "1", "Difficulty Level": 82 },
  { rating: "2", "Difficulty Level": 88 },
  { rating: "3", "Difficulty Level": 38 },
  { rating: "4", "Difficulty Level": 48 },
  { rating: "5", "Difficulty Level": 28 },
];

const TRANSITION_DATA = [
  { category: "Bridging\nProgram",                    "2020": 80 },
  { category: "Refresher course\nfor certain topics", "2020": 88 },
  { category: "Other",                                "2020": 75 },
];

interface Response {
  name: string;
  classOf: string;
  answer: string;
  program: string;
}

const DIFFICULTY_RESPONSES: Response[] = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",   program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",   program: "BS COMPUTER SCIENCE" },
];

const SUGGEST_RESPONSES: Response[] = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",   program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",   program: "BS COMPUTER SCIENCE" },
];

// â”€â”€ Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ResponseCard({
  question,
  questionHighlight,
  responses,
}: {
  question: string;
  questionHighlight?: string;
  responses: Response[];
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? responses : responses.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm">
      <p className="text-xs font-semibold text-gray-800 mb-4">
        {question}
        {questionHighlight && (
          <span className="font-bold text-red-900">{questionHighlight}</span>
        )}
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

// â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function TransitiontoProgram({ program }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Transition to the Program</h2>

      {/* â”€â”€ Two charts side by side â”€â”€ */}
      <div className="flex gap-4">
        {/* Chart 1 */}
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0">
          <p className="text-xs font-semibold text-gray-800 mb-4">
            What is the level of difficulty of your adjustment to the BSAM program?
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={DIFFICULTY_DATA}
              margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
              barCategoryGap="30%"
            >
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="rating"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#888" }}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#888" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(216,154,154,0.10)" }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
              />
              <Bar
                dataKey="Difficulty Level"
                fill="#D89A9A"
                radius={[999, 999, 999, 999]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2 */}
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0">
          <p className="text-xs font-semibold text-gray-800 mb-4">What will make the transition easier for you?</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={TRANSITION_DATA}
              margin={{ top: 10, right: 10, left: -10, bottom: 40 }}
              barCategoryGap="35%"
            >
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#888" }}
                interval={0}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#888" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(216,154,154,0.10)" }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
              />
              <Legend
                iconType="square"
                iconSize={10}
                wrapperStyle={{ fontSize: "11px", color: "#555" }}
              />
              <Bar
                dataKey="2020"
                fill="#E8C4C4"
                radius={[999, 999, 999, 999]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* â”€â”€ Open-ended response cards â”€â”€ */}
      <ResponseCard
        question='Please explain the reason to your answer on the previous question '
        questionHighlight='"What is the level of difficulty of your adjustment to the BSAM program?"'
        responses={DIFFICULTY_RESPONSES}
      />

      <ResponseCard
        question="What can you suggest to prepare you for the course requirements of the whole BSAM program?"
        responses={SUGGEST_RESPONSES}
      />
    </section>
  );
}

// â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€



