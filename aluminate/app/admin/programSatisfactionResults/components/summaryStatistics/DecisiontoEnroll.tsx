"use client";

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

// ── Chart 1: How did you learn ─────────────────────────────────────────────────
const LEARN_DATA = [
  { source: "UP Website",            "How did you learn about the BSAM program?": 45 },
  { source: "UP Faculty/\nEmployee", "How did you learn about the BSAM program?": 65 },
  { source: "Friend/Colleague",      "How did you learn about the BSAM program?": 10 },
  { source: "Other",                 "How did you learn about the BSAM program?": 75 },
];

// ── Chart 2: Importance of factors (horizontal grouped) ───────────────────────
// Each entry = one rating row (1–5); values = respondent count per factor
const FACTORS_DATA = [
  {
    rating: "1",
    "Reputation of UP Mindanao": 20,
    "Reputation of UP Mindanao Department of Math, Physics and Computer Science": 10,
    "Reputation of the BSAM program": 15,
    "Reputation/Expertise of the Faculty members": 5,
    "The program matches my interests": 10,
    "Financial consideration": 25,
    "Recommendion of a friend" : 5,
    "Encouragement of parent/s or relatives": 15,
    "Encouragement of a faculty member" : 10,
  },
  {
    rating: "2",
    "Reputation of UP Mindanao": 20,
    "Reputation of UP Mindanao Department of Math, Physics and Computer Science": 10,
    "Reputation of the BSAM program": 15,
    "Reputation/Expertise of the Faculty members": 5,
    "The program matches my interests": 10,
    "Financial consideration": 25,
    "Recommendion of a friend" : 5,
    "Encouragement of parent/s or relatives": 15,
    "Encouragement of a faculty member" : 10,
  },
  {
    rating: "3",
    "Reputation of UP Mindanao": 20,
    "Reputation of UP Mindanao Department of Math, Physics and Computer Science": 10,
    "Reputation of the BSAM program": 15,
    "Reputation/Expertise of the Faculty members": 5,
    "The program matches my interests": 10,
    "Financial consideration": 25,
    "Recommendion of a friend" : 5,
    "Encouragement of parent/s or relatives": 15,
    "Encouragement of a faculty member" : 10,
  },
  {
    rating: "4",
    "Reputation of UP Mindanao": 20,
    "Reputation of UP Mindanao Department of Math, Physics and Computer Science": 10,
    "Reputation of the BSAM program": 15,
    "Reputation/Expertise of the Faculty members": 5,
    "The program matches my interests": 10,
    "Financial consideration": 25,
    "Recommendion of a friend" : 5,
    "Encouragement of parent/s or relatives": 15,
    "Encouragement of a faculty member" : 10,
  },
  {
    rating: "5",
    "Reputation of UP Mindanao": 20,
    "Reputation of UP Mindanao Department of Math, Physics and Computer Science": 10,
    "Reputation of the BSAM program": 15,
    "Reputation/Expertise of the Faculty members": 5,
    "The program matches my interests": 10,
    "Financial consideration": 25,
    "Recommendion of a friend" : 5,
    "Encouragement of parent/s or relatives": 15,
    "Encouragement of a faculty member" : 10,
  },
];

const FACTOR_COLORS: Record<string, string> = {
  "Reputation of UP Mindanao":                     "#E8C4C4",
  "Reputation of UP Mindanao Department of Math, Physics and Computer Science": "#E76F51",
  "Reputation of the BSAM program":                "#F4A261",
  "Reputation/Expertise of the Faculty members": "#9b1d2a",
  "The program matches my interests":            "#D89A9A",
  "Financial consideration":                     "#E09898",
  "Recommendion of a friend" :                   "#E8C4C4",
  "Encouragement of parent/s or relatives":      "#E76F51",
  "Encouragement of a faculty member" :          "#F4A261",
};


export default function DecisiontoEnroll({ program }: Props) {
  // TODO: replace sample data with Supabase queries filtered by `program`
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Decision to Enroll</h2>

      {/* ── Card 1 ── */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">How did you learn about the BSAM program?</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={LEARN_DATA}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
            barCategoryGap="35%"
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="source"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#888" }}
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(232,196,196,0.12)" }}
              contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "13px" }}
            />
            <Legend
              iconType="square"
              iconSize={10}
              wrapperStyle={{ fontSize: "12px", color: "#555", paddingTop: "8px" }}
            />
            <Bar
              dataKey="How did you learn about the BSAM program?"
              fill="#E8C4C4"
              radius={[999, 999, 999, 999]}
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
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={FACTORS_DATA}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
            barCategoryGap="20%"
            barGap={2}
          >
            <CartesianGrid horizontal={false} stroke="#f0f0f0" />
            <XAxis
              type="number"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#888" }}
            />
            <YAxis
              type="category"
              dataKey="rating"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
              width={20}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
            />
            <Legend
              iconType="square"
              iconSize={10}
              wrapperStyle={{ fontSize: "11px", color: "#555", paddingTop: "12px" }}
            />
            {Object.entries(FACTOR_COLORS).map(([factor, color]) => (
              <Bar
                key={factor}
                dataKey={factor}
                fill={color}
                radius={[0, 4, 4, 0]}
                maxBarSize={10}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}