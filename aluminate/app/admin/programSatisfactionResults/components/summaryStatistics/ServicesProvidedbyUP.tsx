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

// ── Factors & colors (light → dark pink/red) ───────────────────────────────────
const FACTORS = [
  { key: "Overall BSAM curriculum at UP Mindanao",                                       color: "#f5dede" },
  { key: "Overall experience at the Department of Math, Physics, and Computer Science",   color: "#ebb8b8" },
  { key: "Your academic experience at UP Mindanao",                                       color: "#e09898" },
  { key: "The atmosphere of the faculty",                                                 color: "#d07878" },
  { key: "In meeting/fulfilling the expected program outcomes",                           color: "#b85050" },
  { key: "Alignment of the module learning outcomes with the program learning outcomes",  color: "#9b1d2a" },
];

// ── Chart data ─────────────────────────────────────────────────────────────────
// TODO: replace with Supabase query filtered by `program`
const CHART_DATA = [
  {
    level: "Very Satisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       42,
    "Overall experience at the Department of Math, Physics, and Computer Science":  32,
    "Your academic experience at UP Mindanao":                                      22,
    "The atmosphere of the faculty":                                                16,
    "In meeting/fulfilling the expected program outcomes":                          10,
    "Alignment of the module learning outcomes with the program learning outcomes": 5,
  },
  {
    level: "Satisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       72,
    "Overall experience at the Department of Math, Physics, and Computer Science":  66,
    "Your academic experience at UP Mindanao":                                      60,
    "The atmosphere of the faculty":                                                54,
    "In meeting/fulfilling the expected program outcomes":                          48,
    "Alignment of the module learning outcomes with the program learning outcomes": 42,
  },
  {
    level: "Dissatisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       52,
    "Overall experience at the Department of Math, Physics, and Computer Science":  48,
    "Your academic experience at UP Mindanao":                                      62,
    "The atmosphere of the faculty":                                                56,
    "In meeting/fulfilling the expected program outcomes":                          36,
    "Alignment of the module learning outcomes with the program learning outcomes": 30,
  },
  {
    level: "Very Dissatisfied",
    "Overall BSAM curriculum at UP Mindanao":                                       36,
    "Overall experience at the Department of Math, Physics, and Computer Science":  30,
    "Your academic experience at UP Mindanao":                                      24,
    "The atmosphere of the faculty":                                                18,
    "In meeting/fulfilling the expected program outcomes":                          14,
    "Alignment of the module learning outcomes with the program learning outcomes": 8,
  },
];

// ── Sample open-ended responses ────────────────────────────────────────────────
const RESPONSES = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
];

export default function ServicesProvidedbyUP({ program }: Props) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? RESPONSES : RESPONSES.slice(0, 3);

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Services provided by UP Mindanao</h2>

      {/* ── Chart card ── */}
      <div style={styles.card}>
        <p style={styles.chartTitle}>
          Please indicate your level of satisfaction with the services provided by the following offices/personnel.
        </p>

        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={CHART_DATA}
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
              wrapperStyle={{
                fontSize: "11px",
                color: "#555",
                paddingLeft: "16px",
                maxWidth: "220px",
                lineHeight: "1.8",
              }}
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
      </div>

      {/* ── Open-ended response card ── */}
      <div style={styles.card}>
        <p style={styles.openEndedLabel}>Please explain your answer above:</p>
        <p style={styles.openEndedHighlight}>
          "Please rate how the culture in your school environment captures the factors stated below."
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
          <button
            style={styles.viewResponsesBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "View Responses"}
          </button>
        </div>
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

  /* Open-ended */
  openEndedLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 4px 0",
  },
  openEndedHighlight: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#9b1d2a",
    fontStyle: "italic",
    margin: "0 0 20px 0",
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