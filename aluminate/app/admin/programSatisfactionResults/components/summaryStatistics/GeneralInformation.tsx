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

// ── Sample data ────────────────────────────────────────────────────────────────
// Replace with a Supabase query that groups responses by rating (1–5)
// e.g. SELECT rating, COUNT(*) FROM program_satisfaction
//      WHERE section = 'general_info' AND program = $1
//      GROUP BY rating ORDER BY rating
// ──────────────────────────────────────────────────────────────────────────────
const SAMPLE_DATA = [
  { rating: "1", "Supervision of BSAMAT Program": 95 },
  { rating: "2", "Supervision of BSAMAT Program": 88 },
  { rating: "3", "Supervision of BSAMAT Program": 35 },
  { rating: "4", "Supervision of BSAMAT Program": 55 },
  { rating: "5", "Supervision of BSAMAT Program": 30 },
];

const BAR_COLOR = "#D89A9A";
const SECTION_COLOR = "#9b1d2a";

export default function GeneralInformation({ program }: Props) {
  // TODO: swap SAMPLE_DATA for a real Supabase fetch filtered by `program`
  const data = SAMPLE_DATA;

  return (
    <section className="flex flex-col gap-4">
      {/* Section heading */}
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">General Information</h2>

      {/* Card */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Overall service delivery or supervision of the BSAM program:
        </p>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            barCategoryGap="30%"
            barGap={4}
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="rating"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(216,154,154,0.10)" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #eee",
                fontSize: "13px",
              }}
            />
            <Legend
              iconType="square"
              iconSize={10}
              wrapperStyle={{ fontSize: "12px", color: "#555", paddingTop: "12px" }}
            />
            <Bar
              dataKey="Supervision of BSAMAT Program"
              fill={BAR_COLOR}
              radius={[999, 999, 999, 999]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}