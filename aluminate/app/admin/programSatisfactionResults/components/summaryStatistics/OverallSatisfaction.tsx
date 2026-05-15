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

// ── Shared factor colors (light → dark pink/red) ───────────────────────────────
const FACTORS = [
  { key: "Overall BSAM curriculum at UP Mindanao",                                       color: "#f5dede" },
  { key: "Overall experience at the Department of Math, Physics, and Computer Science",   color: "#ebb8b8" },
  { key: "Your academic experience at UP Mindanao",                                       color: "#e09898" },
  { key: "The atmosphere of the faculty",                                                 color: "#d07878" },
  { key: "In meeting/fulfilling the expected program outcomes",                           color: "#b85050" },
  { key: "Alignment of the module learning outcomes with the program learning outcomes",  color: "#9b1d2a" },
];

// ── Chart 1 data ───────────────────────────────────────────────────────────────
const DEPT_SATISFACTION_DATA = [
  {
    level: "Very Satisfied",
    "Overall BSAM curriculum at UP Mindanao": 40,
    "Overall experience at the Department of Math, Physics, and Computer Science": 55,
    "Your academic experience at UP Mindanao": 30,
    "The atmosphere of the faculty": 25,
    "In meeting/fulfilling the expected program outcomes": 20,
    "Alignment of the module learning outcomes with the program learning outcomes": 15,
  },
  {
    level: "Satisfied",
    "Overall BSAM curriculum at UP Mindanao": 75,
    "Overall experience at the Department of Math, Physics, and Computer Science": 70,
    "Your academic experience at UP Mindanao": 65,
    "The atmosphere of the faculty": 60,
    "In meeting/fulfilling the expected program outcomes": 55,
    "Alignment of the module learning outcomes with the program learning outcomes": 50,
  },
  {
    level: "Dissatisfied",
    "Overall BSAM curriculum at UP Mindanao": 60,
    "Overall experience at the Department of Math, Physics, and Computer Science": 50,
    "Your academic experience at UP Mindanao": 55,
    "The atmosphere of the faculty": 45,
    "In meeting/fulfilling the expected program outcomes": 40,
    "Alignment of the module learning outcomes with the program learning outcomes": 35,
  },
  {
    level: "Very Dissatisfied",
    "Overall BSAM curriculum at UP Mindanao": 45,
    "Overall experience at the Department of Math, Physics, and Computer Science": 35,
    "Your academic experience at UP Mindanao": 30,
    "The atmosphere of the faculty": 25,
    "In meeting/fulfilling the expected program outcomes": 20,
    "Alignment of the module learning outcomes with the program learning outcomes": 15,
  },
];

// ── Chart 2 data ───────────────────────────────────────────────────────────────
const PLO_SATISFACTION_DATA = [
  {
    level: "Very Satisfied",
    "Overall BSAM curriculum at UP Mindanao": 35,
    "Overall experience at the Department of Math, Physics, and Computer Science": 50,
    "Your academic experience at UP Mindanao": 28,
    "The atmosphere of the faculty": 22,
    "In meeting/fulfilling the expected program outcomes": 18,
    "Alignment of the module learning outcomes with the program learning outcomes": 12,
  },
  {
    level: "Satisfied",
    "Overall BSAM curriculum at UP Mindanao": 80,
    "Overall experience at the Department of Math, Physics, and Computer Science": 72,
    "Your academic experience at UP Mindanao": 68,
    "The atmosphere of the faculty": 62,
    "In meeting/fulfilling the expected program outcomes": 58,
    "Alignment of the module learning outcomes with the program learning outcomes": 52,
  },
  {
    level: "Dissatisfied",
    "Overall BSAM curriculum at UP Mindanao": 65,
    "Overall experience at the Department of Math, Physics, and Computer Science": 55,
    "Your academic experience at UP Mindanao": 58,
    "The atmosphere of the faculty": 48,
    "In meeting/fulfilling the expected program outcomes": 42,
    "Alignment of the module learning outcomes with the program learning outcomes": 38,
  },
  {
    level: "Very Dissatisfied",
    "Overall BSAM curriculum at UP Mindanao": 48,
    "Overall experience at the Department of Math, Physics, and Computer Science": 38,
    "Your academic experience at UP Mindanao": 32,
    "The atmosphere of the faculty": 28,
    "In meeting/fulfilling the expected program outcomes": 22,
    "Alignment of the module learning outcomes with the program learning outcomes": 18,
  },
];

// ── Reusable horizontal grouped bar chart ──────────────────────────────────────
function SatisfactionChart({ data }: { data: typeof DEPT_SATISFACTION_DATA }) {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart
        data={data}
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
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function OverallSatisfaction({ program }: Props) {
  // TODO: replace sample data with Supabase queries filtered by `program`
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Overall Satisfaction</h2>

      {/* Card 1 */}
      <div style={styles.card}>
        <p style={styles.chartTitle}>
          How satisfied are you with each of the following items with regards to your experience
          at the Department of Math, Physics and Computer Science?
        </p>
        <SatisfactionChart data={DEPT_SATISFACTION_DATA} />
      </div>

      {/* Card 2 */}
      <div style={styles.card}>
        <p style={styles.chartTitle}>
          Rate your overall satisfaction based on the program learning outcomes:
        </p>
        <SatisfactionChart data={PLO_SATISFACTION_DATA} />
      </div>
    </section>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
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
    margin: "0 0 16px 0",
    lineHeight: "1.5",
  },
};