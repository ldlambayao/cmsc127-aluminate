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
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Props {
  program?: string;
}

//  Shared factor colors 
const FACTORS = [
  { key: "Family obligations",                                       color: "#f5dede" },
  { key: "Challenges of requirements for each course",   color: "#ebb8b8" },
  { key: "Volume of requirements for each course",                                       color: "#e09898" },
  { key: "Lack of access to the concerned faculty",                                                 color: "#d07878" },
  { key: "Work obligations/demands",                           color: "#b85050" },
  { key: "Financial concerns",  color: "#9b1d2a" },
  { key: "Lack of motivation",  color: "#9b1d2a" },
  { key: "Health reasons",  color: "#9b1d2a" },
  { key: "Challenges about the program, in general",  color: "#9b1d2a" },
  { key: "Challenges about the faculty in general",  color: "#9b1d2a" },
];

//  Chart 1: Factors chart data 
const FACTORS_DATA = [
  {
    level: "Very positive influence",
    "Family obligations": 38,
    "Challenges of requirements for each course": 28,
    "Volume of requirements for each course": 18,
    "Lack of access to the concerned faculty": 12,
    "Work obligations/demands": 8,
    "Financial concerns": 4,
    "Lack of motivation": 4,
    "Health reasons": 4,
    "Challenges about the program, in general": 4,
    "Challenges about the faculty, in general": 4,
  },
  {
    level: "Positive influence",
    "Family obligations": 38,
    "Challenges of requirements for each course": 28,
    "Volume of requirements for each course": 18,
    "Lack of access to the concerned faculty": 12,
    "Work obligations/demands": 8,
    "Financial concerns": 4,
    "Lack of motivation": 4,
    "Health reasons": 4,
    "Challenges about the program, in general": 4,
    "Challenges about the faculty, in general": 4,
  },
  {
    level: "No influence",
    "Family obligations": 38,
    "Challenges of requirements for each course": 28,
    "Volume of requirements for each course": 18,
    "Lack of access to the concerned faculty": 12,
    "Work obligations/demands": 8,
    "Financial concerns": 4,
    "Lack of motivation": 4,
    "Health reasons": 4,
    "Challenges about the program, in general": 4,
    "Challenges about the faculty, in general": 4,
  },
  {
    level: "Negative influence",
    "Family obligations": 38,
    "Challenges of requirements for each course": 28,
    "Volume of requirements for each course": 18,
    "Lack of access to the concerned faculty": 12,
    "Work obligations/demands": 8,
    "Financial concerns": 4,
    "Lack of motivation": 4,
    "Health reasons": 4,
    "Challenges about the program, in general": 4,
    "Challenges about the faculty, in general": 4,
  },
  {
    level: "Very negative influence",
    "Family obligations": 38,
    "Challenges of requirements for each course": 28,
    "Volume of requirements for each course": 18,
    "Lack of access to the concerned faculty": 12,
    "Work obligations/demands": 8,
    "Financial concerns": 4,
    "Lack of motivation": 4,
    "Health reasons": 4,
    "Challenges about the program, in general": 4,
    "Challenges about the faculty, in general": 4,
  },
  {
    level: "Not applicable",
    "Family obligations": 38,
    "Challenges of requirements for each course": 28,
    "Volume of requirements for each course": 18,
    "Lack of access to the concerned faculty": 12,
    "Work obligations/demands": 8,
    "Financial concerns": 4,
    "Lack of motivation": 4,
    "Health reasons": 4,
    "Challenges about the program, in general": 4,
    "Challenges about the faculty, in general": 4,
  },
];

// â”€â”€ Chart 2: 
const LEAVING_DATA = [
  { name: "Yes", value: 86.08 },
  { name: "No",  value: 13.92 },
];
const LEAVING_COLORS = ["#D89A9A", "#f5dede"];

// â”€â”€ Chart 3: Favorite year/semester 
const YEAR_DATA = [
  { year: "First Year and First Semester", count: 18 },
  { year: "First Year and Second Semester", count: 32 },
  { year: "Second Year and First Semester", count: 55 },
  { year: "Second Year and Second Semester", count: 42 },
  { year: "Third Year and First Semester", count: 28 },
  { year: "Third Year and Mid Year", count: 48 },
];

// â”€â”€ Open-ended response sets 
const SAMPLE_RESPONSES = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
];

// â”€â”€ Custom donut label 
const renderDonutLabel = ({ cx, cy }: { cx: number; cy: number }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={20} fontWeight={700} fill="#333">
    86.08
  </text>
);

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

// â”€â”€ Main component 
export default function FactorsAcademicProgress({ program }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">Factors that might have affected your academic progress</h2>

      {/* â”€â”€ Card 1: Horizontal grouped bar chart â”€â”€ */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Please indicate how the following factors might have influenced your progress toward the BSAM degree.
        </p>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={FACTORS_DATA}
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
              wrapperStyle={{ fontSize: "11px", color: "#555", paddingLeft: "16px", maxWidth: "220px", lineHeight: "1.8" }}
            />
            {FACTORS.map(({ key, color }) => (
              <Bar key={key} dataKey={key} fill={color} radius={[0, 4, 4, 0]} maxBarSize={9} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* â”€â”€ Card 2: Others (please specify) â”€â”€ */}
      <ResponseCard question="Others (please specify)" responses={SAMPLE_RESPONSES} />

      {/* â”€â”€ Card 3: Donut + favorite year side by side â”€â”€ */}
      <div className="flex gap-4">
        {/* Donut chart */}
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0">
          <p className="text-xs font-semibold text-gray-800 mb-4">Did you consider leaving the program?</p>
          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={LEAVING_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={75}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  labelLine={false}
                  label={renderDonutLabel}
                >
                  {LEAVING_DATA.map((_, i) => (
                    <Cell key={i} fill={LEAVING_COLORS[i]} />
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
                  iconType="square"
                  iconSize={10}
                  wrapperStyle={{ fontSize: "12px", color: "#555" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Favorite year/semester bar chart */}
        <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm min-w-0">
          <p className="text-xs font-semibold text-gray-800 mb-4">What is your favorite year and semester?</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={YEAR_DATA}
              margin={{ top: 10, right: 10, left: 10, bottom: 60 }}
              barCategoryGap="25%"
            >
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#888" }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#888" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(216,154,154,0.10)" }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
              />
              <Bar dataKey="count" fill="#D89A9A" radius={[999, 999, 999, 999]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/*  Card 4: Why did you consider leaving  */}
      <ResponseCard question="Why?" responses={SAMPLE_RESPONSES} />

      {/*  Card 5: Most helpful courses  */}
      <ResponseCard
        question="What course/subject/topic do you think will be most helpful in your future endeavors?"
        responses={SAMPLE_RESPONSES}
      />

      <ResponseCard
        question="What course/subject/topic do you think will be least helpful in your future endeavors?"
        responses={SAMPLE_RESPONSES}
      />

      {/*  Card 6: Should not be included  */}
      <ResponseCard
        question="What course/subject/topic do you think should not be included to the program? Why?"
        responses={SAMPLE_RESPONSES}
      />

      {/*  Card 7: Should be added  */}
      <ResponseCard
        question="What course/subject/topic do you think should be added to the program?"
        responses={SAMPLE_RESPONSES}
      />

      {/*  Card 8: Specific challenges (highlighted in red)  */}
      <ResponseCard
        question="What other specific challenges did you encounter in finishing the program?"
        isHighlighted
        responses={SAMPLE_RESPONSES}
      />
    </section>
  );
}



