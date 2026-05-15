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

// ── Shared factor colors ───────────────────────────────────────────────────────
const FACTORS = [
  { key: "Overall BSAM curriculum at UP Mindanao",                                       color: "#f5dede" },
  { key: "Overall experience at the Department of Math, Physics, and Computer Science",   color: "#ebb8b8" },
  { key: "Your academic experience at UP Mindanao",                                       color: "#e09898" },
  { key: "The atmosphere of the faculty",                                                 color: "#d07878" },
  { key: "In meeting/fulfilling the expected program outcomes",                           color: "#b85050" },
  { key: "Alignment of the module learning outcomes with the program learning outcomes",  color: "#9b1d2a" },
];

// ── Chart 1: Factors chart data ────────────────────────────────────────────────
const FACTORS_DATA = [
  {
    level: "Very Satisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       38,
    "Overall experience at the Department of Math, Physics, and Computer Science":  28,
    "Your academic experience at UP Mindanao":                                      18,
    "The atmosphere of the faculty":                                                12,
    "In meeting/fulfilling the expected program outcomes":                          8,
    "Alignment of the module learning outcomes with the program learning outcomes": 4,
  },
  {
    level: "Satisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       70,
    "Overall experience at the Department of Math, Physics, and Computer Science":  62,
    "Your academic experience at UP Mindanao":                                      55,
    "The atmosphere of the faculty":                                                48,
    "In meeting/fulfilling the expected program outcomes":                          42,
    "Alignment of the module learning outcomes with the program learning outcomes": 35,
  },
  {
    level: "Dissatisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       55,
    "Overall experience at the Department of Math, Physics, and Computer Science":  48,
    "Your academic experience at UP Mindanao":                                      60,
    "The atmosphere of the faculty":                                                52,
    "In meeting/fulfilling the expected program outcomes":                          38,
    "Alignment of the module learning outcomes with the program learning outcomes": 30,
  },
  {
    level: "Very Dissatisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       32,
    "Overall experience at the Department of Math, Physics, and Computer Science":  26,
    "Your academic experience at UP Mindanao":                                      20,
    "The atmosphere of the faculty":                                                14,
    "In meeting/fulfilling the expected program outcomes":                          10,
    "Alignment of the module learning outcomes with the program learning outcomes": 6,
  },
];

// ── Chart 2: Donut — did you consider leaving ──────────────────────────────────
const LEAVING_DATA = [
  { name: "Yes", value: 86.08 },
  { name: "No",  value: 13.92 },
];
const LEAVING_COLORS = ["#D89A9A", "#f5dede"];

// ── Chart 3: Favorite year/semester ───────────────────────────────────────────
const YEAR_DATA = [
  { year: "0", count: 18 },
  { year: "1", count: 32 },
  { year: "2", count: 55 },
  { year: "3", count: 42 },
  { year: "4", count: 28 },
  { year: "5", count: 48 },
];

// ── Open-ended response sets ───────────────────────────────────────────────────
const SAMPLE_RESPONSES = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
];

// ── Custom donut label ─────────────────────────────────────────────────────────
const renderDonutLabel = ({ cx, cy }: { cx: number; cy: number }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={20} fontWeight={700} fill="#333">
    86.08
  </text>
);

// ── Reusable response card ─────────────────────────────────────────────────────
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
    <div style={styles.card}>
      <p style={isHighlighted ? styles.questionHighlighted : styles.questionNormal}>
        {question}
      </p>
      <div style={styles.responseList}>
        {visible.map((r, i) => (
          <div key={i} style={styles.responseItem}>
            <p style={styles.responseName}>{r.name}</p>
            <p style={styles.responseClass}>{r.classOf}</p>
            <p style={styles.responseText}>{r.answer}</p>
            <span style={styles.programBadge}>{r.program}</span>
          </div>
        ))}
      </div>
      <div style={styles.viewResponsesWrapper}>
        <button style={styles.viewResponsesBtn} onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : "View Responses"}
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function FactorsAcademicProgress({ program }: Props) {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Factors that might have affected your academic progress</h2>

      {/* ── Card 1: Horizontal grouped bar chart ── */}
      <div style={styles.card}>
        <p style={styles.chartTitle}>
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

      {/* ── Card 2: Others (please specify) ── */}
      <ResponseCard question="Others (please specify)" responses={SAMPLE_RESPONSES} />

      {/* ── Card 3: Donut + favorite year side by side ── */}
      <div style={styles.twoCol}>
        {/* Donut chart */}
        <div style={{ ...styles.card, flex: 1, minWidth: 0 }}>
          <p style={styles.chartTitle}>Did you consider leaving the program?</p>
          <div style={styles.donutWrapper}>
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
        <div style={{ ...styles.card, flex: 1, minWidth: 0 }}>
          <p style={styles.chartTitle}>What is your favorite year and semester?</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={YEAR_DATA}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              barCategoryGap="25%"
            >
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#888" }}
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

      {/* ── Card 4: Why did you consider leaving ── */}
      <ResponseCard question="Why?" responses={SAMPLE_RESPONSES} />

      {/* ── Card 5: Most helpful courses ── */}
      <ResponseCard
        question="What course/subject/topic do you think will be most helpful in your future endeavors?"
        responses={SAMPLE_RESPONSES}
      />

      {/* ── Card 6: Should not be included ── */}
      <ResponseCard
        question="What course/subject/topic do you think should not be included to the program? Why?"
        responses={SAMPLE_RESPONSES}
      />

      {/* ── Card 7: Should be added ── */}
      <ResponseCard
        question="What course/subject/topic do you think should be added to the program?"
        responses={SAMPLE_RESPONSES}
      />

      {/* ── Card 8: Specific challenges (highlighted in red) ── */}
      <ResponseCard
        question="What other specific challenges did you encounter in finishing the program?"
        isHighlighted
        responses={SAMPLE_RESPONSES}
      />
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
  twoCol: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  chartTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 16px 0",
    lineHeight: "1.5",
  },
  donutWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  questionNormal: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 20px 0",
    lineHeight: "1.5",
  },
  questionHighlighted: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#9b1d2a",
    margin: "0 0 20px 0",
    lineHeight: "1.5",
  },
  responseList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  responseItem: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  responseName: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: 0,
  },
  responseClass: {
    fontSize: "11px",
    color: "#aaa",
    margin: "0 0 4px 0",
  },
  responseText: {
    fontSize: "13px",
    color: "#444",
    margin: "0 0 6px 0",
  },
  programBadge: {
    display: "inline-block",
    padding: "3px 10px",
    backgroundColor: "#fce8e8",
    color: "#9b1d2a",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.3px",
    alignSelf: "flex-start",
  },
  viewResponsesWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "24px",
    borderTop: "1px solid #f0f0f0",
    paddingTop: "16px",
  },
  viewResponsesBtn: {
    background: "transparent",
    border: "none",
    color: "#9b1d2a",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};