"use client";

import React from "react";

type Step = "intro" | "page1" | "page2" | "page3" | "page4" | "page5";

interface FormProgressBarProps {
  currentStep: Step;
}

const STEPS = [
  { key: "page1", label: "General Info" },
  { key: "page2", label: "Curriculum" },
  { key: "page3", label: "Culture & Services" },
  { key: "page4", label: "Experience" },
  { key: "page5", label: "Feedback" },
];

const stepIndex: Record<Step, number> = {
  intro: -1,
  page1: 0,
  page2: 1,
  page3: 2,
  page4: 3,
  page5: 4,
};

export default function FormProgressBar({ currentStep }: FormProgressBarProps) {
  const current = stepIndex[currentStep] ?? -1;

  if (current === -1) return null; // hide on intro

  const progressPercent = ((current) / (STEPS.length - 1)) * 100;

  return (
    <div style={styles.wrapper}>
      {/* Step labels */}
      <div style={styles.labelsRow}>
        {STEPS.map((step, i) => {
          const isCompleted = i < current;
          const isActive = i === current;
          return (
            <div key={step.key} style={styles.labelItem}>
              <div
                style={{
                  ...styles.dot,
                  ...(isCompleted ? styles.dotCompleted : {}),
                  ...(isActive ? styles.dotActive : {}),
                }}
              >
                {isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span style={styles.dotNumber}>{i + 1}</span>
                )}
              </div>
              <span
                style={{
                  ...styles.labelText,
                  ...(isActive ? styles.labelActive : {}),
                  ...(isCompleted ? styles.labelCompleted : {}),
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Track */}
      <div style={styles.track}>
        <div
          style={{
            ...styles.fill,
            width: `${progressPercent}%`,
          }}
        />
      </div>

      {/* Page indicator */}
      <div style={styles.pageIndicator}>
        Page {current + 1} of {STEPS.length}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    marginBottom: "28px",
    padding: "0",
  },
  labelsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
    position: "relative" as const,
  },
  labelItem: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "6px",
    flex: 1,
  },
  dot: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "#e5e7eb",
    border: "2px solid #d1d5db",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  dotActive: {
    backgroundColor: "#A0302B",
    borderColor: "#A0302B",
    boxShadow: "0 0 0 4px rgba(160,48,43,0.15)",
  },
  dotCompleted: {
    backgroundColor: "#A0302B",
    borderColor: "#A0302B",
  },
  dotNumber: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#ffffff",
  },
  labelText: {
    fontSize: "11px",
    color: "#9ca3af",
    fontWeight: 500,
    textAlign: "center" as const,
    lineHeight: 1.3,
    whiteSpace: "nowrap" as const,
  },
  labelActive: {
    color: "#A0302B",
    fontWeight: 700,
  },
  labelCompleted: {
    color: "#6b7280",
  },
  track: {
    height: "6px",
    backgroundColor: "#f3f4f6",
    borderRadius: "99px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #A0302B, #c43c36)",
    borderRadius: "99px",
    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  pageIndicator: {
    textAlign: "right" as const,
    fontSize: "11px",
    color: "#9ca3af",
    fontWeight: 500,
  },
};