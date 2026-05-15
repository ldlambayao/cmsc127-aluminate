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

// ── Factors & colors ───────────────────────────────────────────────────────────
const FACTORS = [
  { key: "Immersion to the values of a liberal arts background",  color: "#f5dede" },
  { key: "Faculty members are exemplary of 'honor and excellence'", color: "#e8b4b4" },
  { key: "Students are encouraged to participate",                color: "#d07878" },
  { key: "The expertise of the faculty",                          color: "#9b1d2a" },
];

// ── Chart data ─────────────────────────────────────────────────────────────────
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

// ── Sample open-ended responses ────────────────────────────────────────────────
const RESPONSES = [
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Makaboang Slight", program: "BS COMPUTER SCIENCE" },
  { name: "Liarrah Daniya Lambayao", classOf: "Class of 2028", answer: "Grabe na gyud",    program: "BS COMPUTER SCIENCE" },
];

// ── Custom label: only show non-zero values ────────────────────────────────────
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
    <section style={styles.section}>
      <h2 style={styles.heading}>
        Intellectual and cultural environment and support given by the Department of Math, Physics and Computer Science
      </h2>

      {/* ── Chart card ── */}
      <div style={styles.card}>
        <p style={styles.chartTitle}>
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

      {/* ── Open-ended response card ── */}
      <div style={styles.card}>
        <p style={styles.openEndedLabel}>
          Please explain your answer above:
        </p>
        <p style={styles.openEndedHighlight}>
          &ldquo;Please rate how the culture in your school environment captures the factors stated below.&rdquo;
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
    lineHeight: "1.4",
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
    margin: "0 0 20px 0",
    fontStyle: "italic",
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