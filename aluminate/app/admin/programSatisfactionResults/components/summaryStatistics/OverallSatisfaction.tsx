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

interface SatisfactionRow {
  level: string;
  "Overall experience at UP Mindanao": number;
  "Overall experience at the Department of Math, Physics, and Computer Science": number;
  "Non-academic experience at UP Mindanao": number;
  "The expertise of the faculty": number;
  "In meeting/fulfilling the expected program outcomes": number;
  "Alignment of the course learning outcomes with the program learning outcomes": number;
}

interface PLOSatisfactionRow {
  level: string;
  "Development of a holistic understanding of the new general education (GE) courses": number;
  "Mastery of fundamental concepts of mathematics": number;
  "Mastery of fundamental concepts of statistics": number;
  "Mastery of fundamental concepts of computer science": number;  
  "Enhanced analytical thinking skills through covering advanced mathematics courses": number;
  "Ability to use operations research (OR) techniques to aid efficiency of the solution process": number;
  "Ability to use GIS tools to aid efficiency of the solution process": number;
  "Ability to use statistical methods to aid efficiency of the solution process": number;
  "Implementation/development of computer programs for ease in complex computations": number;
  "Ability to apply OR and statistical techniques to scientific research practices" : number;
  "Readiness or confidence to pursue a master's degree in applied mathematics": number;
  "Readiness or confidence to pursue a master's degree in statistics": number;
  "Readiness or confidence to pursue a master's degree in computer science": number;
}

// ── Shared factor colors (light → dark pink/red) ───────────────────────────────
const DEPT_FACTORS = [
  { key: "Overall experience at UP Mindanao",                                       color: "#f5dede" },
  { key: "Overall experience at the Department of Math, Physics, and Computer Science",   color: "#ebb8b8" },
  { key: "Non-academic experience at UP Mindanao",                                       color: "#e09898" },
  { key: "The expertise of the faculty",                                                 color: "#d07878" },
  { key: "In meeting/fulfilling the expected program outcomes",                           color: "#b85050" },
  { key: "Alignment of the course learning outcomes with the program learning outcomes",  color: "#9b1d2a" },
];

const PLO_FACTORS = [
  { key: "Development of a holistic understanding of the new general education (GE) courses", color: "#f5dede" },
  { key: "Mastery of fundamental concepts of mathematics", color: "#ebb8b8" },
  { key: "Mastery of fundamental concepts of statistics", color: "#e09898" },
  { key: "Mastery of fundamental concepts of computer science", color: "#d07878" },
  { key: "Enhanced analytical thinking skills through covering advanced mathematics courses", color: "#c05858" },
  { key: "Ability to use operations research (OR) techniques to aid efficiency of the solution process", color: "#b85050" },
  { key: "Ability to use GIS tools to aid efficiency of the solution process", color: "#b04848" },
  { key: "Ability to use statistical methods to aid efficiency of the solution process", color: "#a84040" },
  { key: "Implementation/development of computer programs for ease in complex computations", color: "#a03838" },
  { key: "Ability to apply OR and statistical techniques to scientific research practices", color: "#983030" },
  { key: "Readiness or confidence to pursue a master's degree in applied mathematics", color: "#902828" },
  { key: "Readiness or confidence to pursue a master's degree in statistics", color: "#882020" },
  { key: "Readiness or confidence to pursue a master's degree in computer science", color: "#9b1d2a" },
];

// ── Chart 1 data ───────────────────────────────────────────────────────────────
const DEPT_SATISFACTION_DATA = [
  {
    level: "Very Satisfied",
    "Overall experience at UP Mindanao": 40,
    "Overall experience at the Department of Math, Physics, and Computer Science": 55,
    "Non-academic experience at UP Mindanao": 30,
    "The expertise of the faculty": 25,
    "In meeting/fulfilling the expected program outcomes": 20,
    "Alignment of the course learning outcomes with the program learning outcomes": 15,
  },
  {
    level: "Satisfied",
    "Overall experience at UP Mindanao": 75,
    "Overall experience at the Department of Math, Physics, and Computer Science": 70,
    "Non-academic experience at UP Mindanao": 65,
    "The expertise of the faculty": 60,
    "In meeting/fulfilling the expected program outcomes": 55,
    "Alignment of the course learning outcomes with the program learning outcomes": 50,
  },
  {
    level: "Dissatisfied",
    "Overall experience at UP Mindanao": 60,
    "Overall experience at the Department of Math, Physics, and Computer Science": 50,
    "Non-academic experience at UP Mindanao": 55,
    "The expertise of the faculty": 45,
    "In meeting/fulfilling the expected program outcomes": 40,
    "Alignment of the course learning outcomes with the program learning outcomes": 35,
  },
  {
    level: "Very Dissatisfied",
    "Overall experience at UP Mindanao": 45,
    "Overall experience at the Department of Math, Physics, and Computer Science": 35,
    "Non-academic experience at UP Mindanao": 30,
    "The expertise of the faculty": 25,
    "In meeting/fulfilling the expected program outcomes": 20,
    "Alignment of the course learning outcomes with the program learning outcomes": 15,
  },
];

// ── Chart 2 data ───────────────────────────────────────────────────────────────
const PLO_SATISFACTION_DATA = [
  {
    level: "Very Satisfied",
    "Development of a holistic understanding of the new general education (GE) courses": 35,
    "Mastery of fundamental concepts of mathematics": 50,
    "Mastery of fundamental concepts of statistics": 28,
    "Mastery of fundamental concepts of computer science": 22,
    "Enhanced analytical thinking skills through covering advanced mathematics courses": 18,
    "Ability to use operations research (OR) techniques to aid efficiency of the solution process": 12,
    "Ability to use GIS tools to aid efficiency of the solution process": 12,
    "Ability to use statistical methods to aid efficiency of the solution process": 12,
    "Implementation/development of computer programs for ease in complex computations": 10,
    "Ability to apply OR and statistical techniques to scientific research practices" : 10,
    "Readiness or confidence to pursue a master's degree in applied mathematics": 8,
    "Readiness or confidence to pursue a master's degree in statistics": 8,
    "Readiness or confidence to pursue a master's degree in computer science": 8,
  
  },
  {
    level: "Satisfied",
    "Development of a holistic understanding of the new general education (GE) courses": 35,
    "Mastery of fundamental concepts of mathematics": 50,
    "Mastery of fundamental concepts of statistics": 28,
    "Mastery of fundamental concepts of computer science": 22,
    "Enhanced analytical thinking skills through covering advanced mathematics courses": 18,
    "Ability to use operations research (OR) techniques to aid efficiency of the solution process": 12,
    "Ability to use GIS tools to aid efficiency of the solution process": 12,
    "Ability to use statistical methods to aid efficiency of the solution process": 12,
    "Implementation/development of computer programs for ease in complex computations": 10,
    "Ability to apply OR and statistical techniques to scientific research practices" : 10,
    "Readiness or confidence to pursue a master's degree in applied mathematics": 8,
    "Readiness or confidence to pursue a master's degree in statistics": 8,
    "Readiness or confidence to pursue a master's degree in computer science": 8,
  },
  {
    level: "Dissatisfied",
    "Development of a holistic understanding of the new general education (GE) courses": 35,
    "Mastery of fundamental concepts of mathematics": 50,
    "Mastery of fundamental concepts of statistics": 28,
    "Mastery of fundamental concepts of computer science": 22,
    "Enhanced analytical thinking skills through covering advanced mathematics courses": 18,
    "Ability to use operations research (OR) techniques to aid efficiency of the solution process": 12,
    "Ability to use GIS tools to aid efficiency of the solution process": 12,
    "Ability to use statistical methods to aid efficiency of the solution process": 12,
    "Implementation/development of computer programs for ease in complex computations": 10,
    "Ability to apply OR and statistical techniques to scientific research practices" : 10,
    "Readiness or confidence to pursue a master's degree in applied mathematics": 8,
    "Readiness or confidence to pursue a master's degree in statistics": 8,
    "Readiness or confidence to pursue a master's degree in computer science": 8,
  },
  {
    level: "Very Dissatisfied",
    "Development of a holistic understanding of the new general education (GE) courses": 35,
    "Mastery of fundamental concepts of mathematics": 50,
    "Mastery of fundamental concepts of statistics": 28,
    "Mastery of fundamental concepts of computer science": 22,
    "Enhanced analytical thinking skills through covering advanced mathematics courses": 18,
    "Ability to use operations research (OR) techniques to aid efficiency of the solution process": 12,
    "Ability to use GIS tools to aid efficiency of the solution process": 12,
    "Ability to use statistical methods to aid efficiency of the solution process": 12,
    "Implementation/development of computer programs for ease in complex computations": 10,
    "Ability to apply OR and statistical techniques to scientific research practices" : 10,
    "Readiness or confidence to pursue a master's degree in applied mathematics": 8,
    "Readiness or confidence to pursue a master's degree in statistics": 8,
    "Readiness or confidence to pursue a master's degree in computer science": 8,
  },
];

// ── Reusable horizontal grouped bar chart ──────────────────────────────────────
function SatisfactionChart({ 
  data, 
  factors 
}: { 
  data: any;
  factors: typeof DEPT_FACTORS | typeof PLO_FACTORS;
}) {
  return (
    <ResponsiveContainer width="100%" height={560}>
      <BarChart
        data={data as any}
        layout="vertical"
        margin={{ top: 10, right: 20, left: 90, bottom: 10 }}
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
          width={88}
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
          wrapperStyle={{ fontSize: "11px", color: "#555", paddingLeft: "16px", maxWidth: "240px" }}
        />
        {factors.map(({ key, color }) => (
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
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function OverallSatisfaction({ program }: Props) {
  // TODO: replace sample data with Supabase queries filtered by `program`
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Overall Satisfaction</h2>

      {/* Card 1 */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          How satisfied are you with each of the following items with regards to your experience
          at the Department of Math, Physics and Computer Science?
        </p>
        <SatisfactionChart data={DEPT_SATISFACTION_DATA} factors={DEPT_FACTORS} />
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Rate your overall satisfaction based on the program learning outcomes:
        </p>
        <SatisfactionChart data={PLO_SATISFACTION_DATA} factors={PLO_FACTORS} />
      </div>
    </section>
  );
}
