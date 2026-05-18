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

// Factors & colors (light â†’ dark pink/red) 
const FACTORS = [
  { key: "DMPCS Staff",                                       color: "#f5dede" },
  { key: "Faculty members, in general",   color: "#ebb8b8" },
  { key: "Faculty members who handles the courses",                                       color: "#e09898" },
  { key: "Office of the University Registrar",                                                 color: "#d07878" },
  { key: "Cashier's Office",                           color: "#b85050" },
  { key: "University Library",  color: "#9b1d2a" },
  { key: "IT Office",  color: "#9b1d2a" },
  { key: "Office of Student Affairs",  color: "#9b1d2a" },
  { key: "Janitors",  color: "#9b1d2a" },
  { key: "Guards",  color: "#9b1d2a" },
];

// TODO: replace with Supabase query filtered by `program`
const CHART_DATA = [
  {
    level: "Very Satisfied",
    "DMPCS Staff": 42,
    "Faculty members, in general":  32,
    "Faculty members who handles the courses": 22,
    "Office of the University Registrar":  16,
    "Cashier's Office":  10,
    "University Library": 5,
  },
  {
    level: "Satisfied",
    "DMPCS Staff": 42,
    "Faculty members, in general":  32,
    "Faculty members who handles the courses": 22,
    "Office of the University Registrar":  16,
    "Cashier's Office":  10,
    "University Library": 5,
  },
  {
    level: "Dissatisfied",
     "DMPCS Staff": 42,
    "Faculty members, in general":  32,
    "Faculty members who handles the courses": 22,
    "Office of the University Registrar":  16,
    "Cashier's Office":  10,
    "University Library": 5,
  },
  {
    level: "Very Dissatisfied",
     "DMPCS Staff": 42,
    "Faculty members, in general":  32,
    "Faculty members who handles the courses": 22,
    "Office of the University Registrar":  16,
    "Cashier's Office":  10,
    "University Library": 5,
  },
];

// â”€â”€ Sample open-ended responses 
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

      {/* Open-ended response card â”€â”€ */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-sm font-semibold text-gray-800 mb-4">Others</p>

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



