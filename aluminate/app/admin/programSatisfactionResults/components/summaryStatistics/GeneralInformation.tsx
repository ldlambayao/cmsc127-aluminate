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
    <section style={styles.section}>
      {/* Section heading */}
      <h2 style={styles.heading}>General Information</h2>

      {/* Card */}
      <div style={styles.card}>
        <p style={styles.chartTitle}>
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

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#9b1d2a",
    margin: 0,
    borderBottom: "2px solid #e5e5e5",
    paddingBottom: "10px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px 28px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
  },
  chartTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "16px",
    margin: "0 0 16px 0",
  },
};