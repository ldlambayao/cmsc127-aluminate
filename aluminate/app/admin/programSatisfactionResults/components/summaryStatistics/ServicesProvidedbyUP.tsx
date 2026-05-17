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

// â”€â”€ Factors & colors (light â†’ dark pink/red) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const FACTORS = [
  { key: "Overall BSAM curriculum at UP Mindanao",                                       color: "#f5dede" },
  { key: "Overall experience at the Department of Math, Physics, and Computer Science",   color: "#ebb8b8" },
  { key: "Your academic experience at UP Mindanao",                                       color: "#e09898" },
  { key: "The atmosphere of the faculty",                                                 color: "#d07878" },
  { key: "In meeting/fulfilling the expected program outcomes",                           color: "#b85050" },
  { key: "Alignment of the module learning outcomes with the program learning outcomes",  color: "#9b1d2a" },
];

// â”€â”€ Chart data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// TODO: replace with Supabase query filtered by `program`
const CHART_DATA = [
  {
    level: "Very Satisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       42,
    "Overall experience at the Department of Math, Physics, and Computer Science":  32,
    "Your academic experience at UP Mindanao":                                      22,
    "The atmosphere of the faculty":                                                16,
    "In meeting/fulfilling the expected program outcomes":                          10,
    "Alignment of the module learning outcomes with the program learning outcomes": 5,
  },
  {
    level: "Satisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       72,
    "Overall experience at the Department of Math, Physics, and Computer Science":  66,
    "Your academic experience at UP Mindanao":                                      60,
    "The atmosphere of the faculty":                                                54,
    "In meeting/fulfilling the expected program outcomes":                          48,
    "Alignment of the module learning outcomes with the program learning outcomes": 42,
  },
  {
    level: "Dissatisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       52,
    "Overall experience at the Department of Math, Physics, and Computer Science":  48,
    "Your academic experience at UP Mindanao":                                      62,
    "The atmosphere of the faculty":                                                56,
    "In meeting/fulfilling the expected program outcomes":                          36,
    "Alignment of the module learning outcomes with the program learning outcomes": 30,
  },
  {
    level: "Very Dissatisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       36,
    "Overall experience at the Department of Math, Physics, and Computer Science":  30,
    "Your academic experience at UP Mindanao":                                      24,
    "The atmosphere of the faculty":                                                18,
    "In meeting/fulfilling the expected program outcomes":                          14,
    "Alignment of the module learning outcomes with the program learning outcomes": 8,
  },
];

// â”€â”€ Sample open-ended responses â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const RESPONSES = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
];

export default function ServicesProvidedbyUP({ program }: Props) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? RESPONSES : RESPONSES.slice(0, 3);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Services provided by UP Mindanao</h2>

      {/* â”€â”€ Chart card â”€â”€ */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Please indicate your level of satisfaction with the services provided by the following offices/personnel.
        </p>

        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={CHART_DATA}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 100, bottom: 10 }}
            barCategoryGap="18%"
            barGap={2}
          >
            <CartesianGrid horizontal={false} stroke="#f0f0f0" />
            <XAxis
              type="number"
              domain={[0, 100]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#aaa" }}
            />
            <YAxis
              type="category"
              dataKey="level"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#555" }}
              width={98}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
              contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "11px" }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="square"
              iconSize={10}
              wrapperStyle={{
                fontSize: "11px",
                color: "#555",
                paddingLeft: "16px",
                maxWidth: "220px",
                lineHeight: "1.8",
              }}
            />
            {FACTORS.map(({ key, color }) => (
              <Bar
                key={key}
                dataKey={key}
                fill={color}
                radius={[0, 4, 4, 0]}
                maxBarSize={9}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* â”€â”€ Open-ended response card â”€â”€ */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">Please explain your answer above:</p>
        <p className="font-bold text-red-900">
          "Please rate how the culture in your school environment captures the factors stated below."
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
          <button
            className="bg-transparent border-none text-red-900 text-sm font-semibold cursor-pointer hover:text-red-800"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "View Responses"}
          </button>
        </div>
      </div>
    </section>
  );
}

// â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€



