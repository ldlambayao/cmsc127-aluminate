"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Props {
  program?: string;
}

// ── Chart data ─────────────────────────────────────────────────────────────────
const STRENGTHS_DATA = [
  { x: "0", count: 18 },
  { x: "1", count: 32 },
  { x: "2", count: 55 },
  { x: "3", count: 40 },
  { x: "4", count: 28 },
  { x: "5", count: 45 },
];

const WEAKNESSES_DATA = [
  { x: "0", count: 22 },
  { x: "1", count: 38 },
  { x: "2", count: 60 },
  { x: "3", count: 50 },
  { x: "4", count: 30 },
  { x: "5", count: 52 },
];

const RECOMMEND_DATA = [
  { name: "Yes", value: 86.08 },
  { name: "No",  value: 13.92 },
];
const DONUT_COLORS = ["#D89A9A", "#f5dede"];

// ── Sample responses ───────────────────────────────────────────────────────────
const SAMPLE_RESPONSES = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
];

// ── Custom donut center label ──────────────────────────────────────────────────
const renderDonutLabel = ({ cx, cy }: { cx: number; cy: number }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={20} fontWeight={700} fill="#333">
    86.08
  </text>
);

// ── Reusable pill bar chart ────────────────────────────────────────────────────
function PillBarChart({ data, color }: { data: { x: string; count: number }[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 5 }} barCategoryGap="25%">
        <CartesianGrid vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#888" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#888" }} />
        <Tooltip
          cursor={{ fill: "rgba(216,154,154,0.10)" }}
          contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
        />
        <Bar dataKey="count" fill={color} radius={[999, 999, 999, 999]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}

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
export default function ImprovementofProgram({ program }: Props) {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Other questions for the improvement of the program</h2>

      {/* ── Two bar charts side by side ── */}
      <div style={styles.twoCol}>
        <div style={{ ...styles.card, flex: 1, minWidth: 0 }}>
          <p style={styles.chartTitle}>
            Based on your experience, what do you think are the strengths of the program? (Please check all that apply)
          </p>
          <PillBarChart data={STRENGTHS_DATA} color="#E8C4C4" />
        </div>
        <div style={{ ...styles.card, flex: 1, minWidth: 0 }}>
          <p style={styles.chartTitle}>
            Based on your experience, what do you think are the weaknesses of the program? (Please check all that apply)
          </p>
          <PillBarChart data={WEAKNESSES_DATA} color="#D89A9A" />
        </div>
      </div>

      {/* ── Response: improve student experience ── */}
      <ResponseCard
        question="What can you suggest to improve your overall BSAM student experience?"
        responses={SAMPLE_RESPONSES}
      />

      {/* ── Donut: Will you recommend ── */}
      <div style={styles.card}>
        <p style={styles.chartTitle}>Will you recommend the BSAM program?</p>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={RECOMMEND_DATA}
              cx="40%"
              cy="50%"
              innerRadius={52}
              outerRadius={75}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              labelLine={false}
              label={renderDonutLabel}
            >
              {RECOMMEND_DATA.map((_, i) => (
                <Cell key={i} fill={DONUT_COLORS[i]} />
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
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ fontSize: "12px", color: "#555" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ── Response: Why or why not (highlighted) ── */}
      <ResponseCard
        question="Why or why not?"
        isHighlighted
        responses={SAMPLE_RESPONSES}
      />

      {/* ── Response: overall improvement suggestion ── */}
      <ResponseCard
        question="What can you suggest for the overall improvement of the BSAM program?"
        responses={SAMPLE_RESPONSES}
      />

      {/* ── Response: additional comments (long question) ── */}
      <ResponseCard
        question="Please write here any additional comment/s or suggestion/s you may have on how we might have improved your experience in taking the degree program or how we can improve the program for the future takers of the degree program."
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
  twoCol: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
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