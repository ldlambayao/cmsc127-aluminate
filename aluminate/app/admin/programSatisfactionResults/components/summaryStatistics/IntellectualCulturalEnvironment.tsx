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
  LabelList,
  ResponsiveContainer,
} from "recharts";

interface Props {
  program?: string;
}

// â”€â”€ Factors & colors â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const FACTORS = [
  { key: "Immersion to the values of a liberal arts background",  color: "#f5dede" },
  { key: "Faculty members are exemplary of 'honor and excellence'", color: "#e8b4b4" },
  { key: "Students are encouraged to participate",                color: "#d07878" },
  { key: "The expertise of the faculty",                          color: "#9b1d2a" },
];

// â”€â”€ Chart data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CHART_DATA = [
  {
    level: "Strongly agree",
    "Immersion to the values of a liberal arts background":  69.03,
    "Faculty members are exemplary of 'honor and excellence'": 51.75,
    "Students are encouraged to participate":                83.27,
    "The expertise of the faculty":                          0,
  },
  {
    level: "Agree",
    "Immersion to the values of a liberal arts background":  47.89,
    "Faculty members are exemplary of 'honor and excellence'": 87.03,
    "Students are encouraged to participate":                55.79,
    "The expertise of the faculty":                          0,
  },
  {
    level: "Disagree",
    "Immersion to the values of a liberal arts background":  17.23,
    "Faculty members are exemplary of 'honor and excellence'": 77.17,
    "Students are encouraged to participate":                70.97,
    "The expertise of the faculty":                          0,
  },
  {
    level: "Strongly disagree",
    "Immersion to the values of a liberal arts background":  31.68,
    "Faculty members are exemplary of 'honor and excellence'": 34.99,
    "Students are encouraged to participate":                48.09,
    "The expertise of the faculty":                          0,
  },
];

// â”€â”€ Sample open-ended responses â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const RESPONSES = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
];

// â”€â”€ Custom label: only show non-zero values â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const renderLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  if (!value || value === 0) return null;
  return (
    <text
      x={x + width + 4}
      y={y + height / 2 + 4}
      fontSize={9}
      fill="#888"
      textAnchor="start"
    >
      {value}
    </text>
  );
};

export default function IntellectualCulturalEnvironment({ program }: Props) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? RESPONSES : RESPONSES.slice(0, 3);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">
        Intellectual and cultural environment and support given by the Department of Math, Physics and Computer Science
      </h2>

      {/* â”€â”€ Chart card â”€â”€ */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Please rate how the culture in your school environment captures the factors stated below.
        </p>

        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={CHART_DATA}
            layout="vertical"
            margin={{ top: 10, right: 60, left: 100, bottom: 10 }}
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
              formatter={(value: number) => (value === 0 ? "No data" : value)}
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
                maxWidth: "200px",
                lineHeight: "1.8",
              }}
            />
            {FACTORS.map(({ key, color }) => (
              <Bar key={key} dataKey={key} fill={color} radius={[0, 4, 4, 0]} maxBarSize={9}>
                <LabelList dataKey={key} content={renderLabel} />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* â”€â”€ Open-ended response card â”€â”€ */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Please explain your answer above:
        </p>
        <p className="font-bold text-red-900">
          &ldquo;Please rate how the culture in your school environment captures the factors stated below.&rdquo;
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
    </section>
  );
}

// â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€



