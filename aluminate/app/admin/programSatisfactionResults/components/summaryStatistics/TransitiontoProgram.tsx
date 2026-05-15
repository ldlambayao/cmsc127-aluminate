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

// ── Sample data ────────────────────────────────────────────────────────────────
const DIFFICULTY_DATA = [
  { rating: "1", "Difficulty Level": 82 },
  { rating: "2", "Difficulty Level": 88 },
  { rating: "3", "Difficulty Level": 38 },
  { rating: "4", "Difficulty Level": 48 },
  { rating: "5", "Difficulty Level": 28 },
];

const TRANSITION_DATA = [
  { category: "Bridging\nProgram",                    "2020": 80 },
  { category: "Refresher course\nfor certain topics", "2020": 88 },
  { category: "Other",                                "2020": 75 },
];

interface Response {
  name: string;
  classOf: string;
  answer: string;
  program: string;
}

const DIFFICULTY_RESPONSES: Response[] = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",   program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",   program: "BS COMPUTER SCIENCE" },
];

const SUGGEST_RESPONSES: Response[] = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",   program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",   program: "BS COMPUTER SCIENCE" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────
function ResponseCard({
  question,
  questionHighlight,
  responses,
}: {
  question: string;
  questionHighlight?: string;
  responses: Response[];
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? responses : responses.slice(0, 3);

  return (
    <div style={styles.card}>
      <p style={styles.openEndedLabel}>
        {question}
        {questionHighlight && (
          <span style={styles.openEndedHighlight}>{questionHighlight}</span>
        )}
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
export default function TransitiontoProgram({ program }: Props) {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Transition to the Program</h2>

      {/* ── Two charts side by side ── */}
      <div style={styles.chartsRow}>
        {/* Chart 1 */}
        <div style={{ ...styles.card, flex: 1, minWidth: 0 }}>
          <p style={styles.chartTitle}>
            What is the level of difficulty of your adjustment to the BSAM program?
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={DIFFICULTY_DATA}
              margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
              barCategoryGap="30%"
            >
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="rating"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#888" }}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#888" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(216,154,154,0.10)" }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
              />
              <Bar
                dataKey="Difficulty Level"
                fill="#D89A9A"
                radius={[999, 999, 999, 999]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2 */}
        <div style={{ ...styles.card, flex: 1, minWidth: 0 }}>
          <p style={styles.chartTitle}>What will make the transition easier for you?</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={TRANSITION_DATA}
              margin={{ top: 10, right: 10, left: -10, bottom: 40 }}
              barCategoryGap="35%"
            >
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#888" }}
                interval={0}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#888" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(216,154,154,0.10)" }}
                contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "12px" }}
              />
              <Legend
                iconType="square"
                iconSize={10}
                wrapperStyle={{ fontSize: "11px", color: "#555" }}
              />
              <Bar
                dataKey="2020"
                fill="#E8C4C4"
                radius={[999, 999, 999, 999]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Open-ended response cards ── */}
      <ResponseCard
        question='Please explain the reason to your answer on the previous question '
        questionHighlight='"What is the level of difficulty of your adjustment to the BSAM program?"'
        responses={DIFFICULTY_RESPONSES}
      />

      <ResponseCard
        question="What can you suggest to prepare you for the course requirements of the whole BSAM program?"
        responses={SUGGEST_RESPONSES}
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
  chartsRow: {
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
    fontSize: "12px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 12px 0",
  },

  /* Open-ended cards */
  openEndedLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 20px 0",
    lineHeight: "1.5",
  },
  openEndedHighlight: {
    color: "#9b1d2a",
    display: "block",
    fontWeight: "600",
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