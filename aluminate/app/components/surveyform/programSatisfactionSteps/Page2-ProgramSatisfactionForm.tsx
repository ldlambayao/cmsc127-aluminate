"use client";

import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import { useFormStore, SurveyData } from "@/../lib/store/useFormStore";

// --- Types ---
type SatisfactionValue = "Very Satisfied" | "Satisfied" | "Dissatisfied" | "Very Dissatisfied" | null;

interface Page2FormState {
  // Overall Satisfaction – Experience items
  experienceSatisfaction: { [key: string]: SatisfactionValue };

  // Overall Satisfaction – Program Learning Outcomes
  learningOutcomeSatisfaction: { [key: string]: SatisfactionValue };
}

interface Page2FormProps {
  onBack?: () => void;
  onNext?: () => void;
  progressBar?: React.ReactNode;
}

// --- Constants ---
const satisfactionColumns: { value: SatisfactionValue; label: string }[] = [
  { value: "Very Satisfied",    label: "Very Satisfied"    },
  { value: "Satisfied",        label: "Satisfied"         },
  { value: "Dissatisfied",     label: "Dissatisfied"      },
  { value: "Very Dissatisfied", label: "Very Dissatisfied" },
];

const experienceItems = [
  "Overall BSAM curriculum at UP Mindanao",
  "Overall experience at the Department of Math, Physics, and Computer Science",
  "Your academic experience at UP Mindanao",
  "The atmosphere of the faculty",
  "In meeting/fulfilling the expected program outcomes",
  "Alignment of the module learning outcomes with the program learning outcomes",
];

const learningOutcomeItems = [
  "Development of a holistic understanding of the same general education (GE) courses",
  'Mastery of "foundational concepts of mathematics"',
  'Mastery of "fundamental concepts of statistics"',
  'Mastery of "fundamental concepts of computer science"',
  "Enhanced academic thinking skills through solving complex mathematical and technical problems",
  "Ability to use appropriate numerical/GIS tools based on effectiveness of the solution process",
  "Ability to use R/R tools to efficiently aid the solution process",
  "Ability to use statistical methods and efficiency of the various disciplines",
  "Implementation/Specification of computer programs to support multiple computations",
  "Ability to apply data analytics techniques to support research programs",
  "Readiness in confidence to pursue a master's degree in applied mathematics",
  "Readiness in confidence to pursue a master's degree in statistics",
  "Readiness in confidence to pursue a master's degree in computer science",
];

// --- Reusable Satisfaction Table ---
interface SatisfactionTableProps {
  items: string[];
  groupKey: string;
  values: { [key: string]: SatisfactionValue };
  onChange: (item: string, value: SatisfactionValue) => void;
}

function SatisfactionTable({ items, groupKey, values, onChange }: SatisfactionTableProps) {
  return (
    <div style={styles.tableWrapper}>
      {/* Header Row */}
      <div style={styles.tableHeaderRow}>
        <div style={styles.tableItemCol} />
        <div style={styles.tableRatingsCol}>
          {satisfactionColumns.map((col) => (
            <div key={col.value} style={styles.tableColHeader}>
              {col.label}
            </div>
          ))}
        </div>
      </div>

      {/* Data Rows */}
      {items.map((item, idx) => (
        <div key={idx} style={idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
          <div style={styles.tableItemCol}>
            <span style={styles.tableItemText}>{item}</span>
          </div>
          <div style={styles.tableRatingsCol}>
            {satisfactionColumns.map((col) => (
              <div key={col.value} style={styles.radioWrapperCenter}>
                <input
                  type="radio"
                  name={`${groupKey}-${idx}`}
                  checked={values[item] === col.value}
                  onChange={() => onChange(item, col.value)}
                  style={styles.radioInputNormal}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Main Page 2 Component ---
export default function Page2ProgramSatisfactionForm({ onBack, onNext, progressBar }: Page2FormProps) {

  const { formData, setExperienceRating, setLearningRating } = useFormStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleExperienceChange = (item: string, value: SatisfactionValue) => {
    setExperienceRating(item, value as string);
  };

  const handleLearningOutcomeChange = (item: string, value: SatisfactionValue) => {
    setLearningRating(item, value as string);
  };

  const isPageValid = (() => {
    const allexperienceItemsRated = experienceItems.every(item =>
      formData.experienceSatisfaction[item] !== undefined &&
      formData.experienceSatisfaction[item] !== null
    );
    if (!allexperienceItemsRated) return false;
    const allLearningOutcomesRated = learningOutcomeItems.every(item =>
      formData.learningOutcomeSatisfaction[item] !== undefined &&
      formData.learningOutcomeSatisfaction[item] !== null
    );
    if (!allLearningOutcomesRated) return false;


    return true;
  })();

  const handleNext = () => {
    if(isPageValid){
      onNext?.();
    } else {
      alert("Please answer all required questions before proceeding.");
    }
  }

  return (
    <div style={styles.content}>

      {/* Page Header */}
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Program Satisfaction Form</h1>
        <p style={styles.pageSubtitle}>
          Complete the Alumni Tracer form to contribute valuable feedback and data
        </p>
      </div>

      <div style={styles.formContainer}>

        {progressBar}

        {/* --- Overall Satisfaction Section --- */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Overall Satisfaction</h2>
          <div style={styles.divider} />

          {/* Table 1 – Experience Satisfaction */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              How satisfied are you with each of the following items with regards to your
              experience at the Department of Math, Physics and Computer Science?
            </label>
            <SatisfactionTable
              items={experienceItems}
              groupKey="experience"
              values={formData.experienceSatisfaction as { [key: string]: SatisfactionValue }}
              onChange={handleExperienceChange}
            />
          </div>

          {/* Table 2 – Program Learning Outcomes */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Rate your overall satisfaction based on the program learning outcomes:
            </label>
            <SatisfactionTable
              items={learningOutcomeItems}
              groupKey="learningOutcome"
              values={formData.learningOutcomeSatisfaction as { [key: string]: SatisfactionValue }}
              onChange={handleLearningOutcomeChange}
            />
          </div>
        </div>

        {/* Action Row */}
        <div style={styles.actionRow}>
          <button style={styles.backBtn} onClick={onBack}>
            Back
          </button>
          <button style={{...styles.nextBtn, ...(isPageValid ? {} : styles.disabledBtn)}} onClick={handleNext} disabled={!isPageValid}>
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  content: {
    width: "100%",
    maxWidth: "1400px",
  },
  pageHeader: {
    marginBottom: "48px",
  },
  pageTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 10px",
    letterSpacing: "-0.5px",
  },
  pageSubtitle: {
    fontSize: "13px",
    color: "#555",
    margin: 0,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    paddingBottom: "40px",
  },
  sectionBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#9b1d2a",
    margin: 0,
  },
  divider: {
    height: "1px",
    backgroundColor: "#e0e0e0",
    width: "100%",
    marginTop: "-10px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
    width: "100%",
  },
  questionLabel: {
    fontSize: "13px",
    color: "#333",
    fontWeight: "500",
    lineHeight: "1.5",
    marginBottom: "4px",
  },
  // Table
  tableWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "12px",
    width: "100%",
  },
  tableHeaderRow: {
    display: "flex",
    padding: "0 24px",
    marginBottom: "6px",
  },
  tableItemCol: {
    flex: 2.5,
    paddingRight: "20px",
    display: "flex",
    alignItems: "center",
  },
  tableRatingsCol: {
    flex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  tableColHeader: {
    flex: 1,
    textAlign: "center" as const,
    fontSize: "11px",
    fontWeight: "700",
    color: "#333",
    lineHeight: "1.3",
    padding: "0 4px",
  },
  tableRowEven: {
    display: "flex",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "16px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
    width: "100%",
    alignItems: "center",
  },
  tableRowOdd: {
    display: "flex",
    backgroundColor: "#fafafa",
    borderRadius: "12px",
    padding: "16px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
    width: "100%",
    alignItems: "center",
  },
  tableItemText: {
    fontSize: "12px",
    color: "#333",
    lineHeight: "1.5",
  },
  radioWrapperCenter: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInputNormal: {
    width: "16px",
    height: "16px",
    accentColor: "#9b1d2a",
    cursor: "pointer",
  },
  // Buttons
  actionRow: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginTop: "20px",
  },
  backBtn: {
    backgroundColor: "#ffffff",
    color: "#9b1d2a",
    border: "2px solid #9b1d2a",
    borderRadius: "24px",
    padding: "12px 64px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  nextBtn: {
    backgroundColor: "#9b1d2a",
    color: "#ffffff",
    border: "none",
    borderRadius: "24px",
    padding: "12px 64px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(155, 29, 42, 0.2)",
  },
  disabledBtn: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
    boxShadow: "none",
  },
};