"use client";

import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import { useFormStore, SurveyData } from "@/../lib/store/useFormStore";

// --- Types ---
type InfluenceValue = | "Very Positive" | "Positive" | "No Influence" | "Negative" | "Very Negative" | "Not Applicable" | null;

interface Page4FormState {
  factorInfluences: { [key: string]: InfluenceValue };
  factorsOther: string;
  consideredLeaving: "Yes" | "No" | null;
  leavingWhy: string;
  favoriteYearSemester: string;
  favoriteWhy: string;
  mostHelpfulCourse: string;
  helpfulFutureEndeavors: string;
  shouldNotInclude: string;
  shouldBeAdded: string;
  otherChallenges: string;
}

interface Page4FormProps {
  onBack?: () => void;
  onNext: () => void;
  progressBar?: React.ReactNode;
}

// --- Constants ---
const influenceColumns: { value: InfluenceValue; label: string }[] = [
  { value: "Very Positive",    label: "Very Positive Influence"  },
  { value: "Positive",         label: "Positive Influence"       },
  { value: "No Influence",     label: "No Influence"             },
  { value: "Negative",         label: "Negative Influence"       },
  { value: "Very Negative",    label: "Very Negative Influence"  },
  { value: "Not Applicable",   label: "Not Applicable"           },
];

const factorItems = [
  "Family obligations",
  "Challenges of requirements for each course",
  "Volume of requirements for each course",
  "Lack of access to the intended faculty",
  "Work conditions/demands",
  "Financial concerns",
  "Lack of motivation",
  "Health issues",
  "Challenges about the program in general",
  "Challenges about the faculty in general",
];

const yearSemesterOptions = [
  "First Year and First Semester",
  "First Year and Second Semester",
  "Second Year and First Semester",
  "Second Year and Second Semester",
  "Third Year and First Semester",
  "Third Year and Second Semester",
  "Fourth Year and First Semester",
  "Fourth Year and Second Semester",
];

// --- Main Component ---
export default function Page4ProgramSatisfactionForm({ onBack, onNext, progressBar }: Page4FormProps) {

  const { formData, setField, setFactorChange } = useFormStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleFactorChange = (item: string, value: InfluenceValue) => {
    setFactorChange(item, value as string);
  };

  const isPageValid = (() => {
    const allFactorInfluencesRated = factorItems.every(item =>
      formData.factorInfluences[item] !== undefined &&
      formData.factorInfluences[item] !== null
    );
    if (!allFactorInfluencesRated) return false;

    if (formData.factorsOther.trim().length === 0 || formData.consideredLeaving === null || formData.leavingWhy.trim().length === 0) return false;
    if (formData.favoriteYearSemester.trim().length === 0 || formData.favoriteWhy.trim().length === 0 || formData.mostHelpfulCourse.trim().length === 0) return false;
    if (formData.helpfulFutureEndeavors.trim().length === 0 || formData.shouldNotInclude.trim().length === 0 || formData.shouldBeAdded.trim().length === 0) return false;
    if (formData.otherChallenges.trim().length === 0) return false;

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

        {/* --- Section: Factors affecting academic progress --- */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Factors that might have affected your academic progress</h2>
          <div style={styles.divider} />

          {/* Factors Table */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Please indicate how the following factors might have influenced your progress toward
              the BSAM degree.
            </label>

            <div style={styles.tableWrapper}>
              {/* Header */}
              <div style={styles.tableHeaderRow}>
                <div style={styles.tableItemCol} />
                <div style={styles.tableRatingsCol}>
                  {influenceColumns.map((col) => (
                    <div key={col.value} style={styles.tableColHeader}>
                      {col.label}
                    </div>
                  ))}
                </div>
              </div>
              {/* Rows */}
              {factorItems.map((item, idx) => (
                <div key={idx} style={idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                  <div style={styles.tableItemCol}>
                    <span style={styles.tableItemText}>{item}</span>
                  </div>
                  <div style={styles.tableRatingsCol}>
                    {influenceColumns.map((col) => (
                      <div key={col.value} style={styles.radioWrapperCenter}>
                        <input
                          type="radio"
                          name={`factor-${idx}`}
                          checked={formData.factorInfluences[item] === col.value}
                          onChange={() => handleFactorChange(item, col.value)}
                          style={styles.radioInputNormal}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Factors Other */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>Others (please specify):</label>
            <textarea
              style={styles.textarea}
              rows={3}
              value={formData.factorsOther}
              onChange={(e) => setField("factorsOther", e.target.value )}
              placeholder="Specify other factors..."
            />
          </div>

          {/* Considered Leaving */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>Did you consider leaving the program?</label>
            <div style={styles.radioList}>
              {(["Yes", "No"] as const).map((val) => (
                <label key={val} style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="consideredLeaving"
                    checked={formData.consideredLeaving === val}
                    onChange={() => setField("consideredLeaving", val)}
                    style={styles.radioInputNormal}
                  />
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </label>
              ))}
            </div>
            <label style={{ ...styles.questionLabel, marginTop: "8px" }}>Why?</label>
            <textarea
              style={styles.textarea}
              rows={3}
              value={formData.leavingWhy}
              onChange={(e) => setField("leavingWhy", e.target.value )}
              placeholder="Please explain..."
            />
          </div>

          {/* Favorite Year and Semester */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>What is your favorite year and semester?</label>
            <div style={styles.checkboxList}>
              {yearSemesterOptions.map((option) => (
                <label key={option} style={styles.radioLabel}>
                  <input
                    type="checkbox"
                    name="favoriteYearSemester"
                    checked={formData.favoriteYearSemester === option}
                    onChange={() => setField("favoriteYearSemester", option)}
                    style={styles.radioInputNormal}
                  />
                  {option}
                </label>
              ))}
            </div>
            <label style={{ ...styles.questionLabel, marginTop: "8px" }}>Why?</label>
            <textarea
              style={styles.textarea}
              rows={3}
              value={formData.favoriteWhy}
              onChange={(e) => setField("favoriteWhy", e.target.value )}
              placeholder="Please explain..."
            />
          </div>

          {/* Open-ended questions */}
          {[
            {
              key: "mostHelpfulCourse" as const,
              label: "What course/subject/topic do you think will be most helpful in your future endeavors?",
            },
            {
              key: "helpfulFutureEndeavors" as const,
              label: "What course/subject/topic do you think will be helpful in your future endeavors?",
            },
            {
              key: "shouldNotInclude" as const,
              label: "What course/subject/topic do you think should not be included in the program?",
            },
            {
              key: "shouldBeAdded" as const,
              label: "What course/subject/topic do you think should be added to the program?",
            },
            {
              key: "otherChallenges" as const,
              label: "What other specific challenges did you encounter in finishing the program?",
            },
          ].map(({ key, label }) => (
            <div key={key} style={styles.inputGroup}>
              <label style={styles.questionLabel}>{label}</label>
              <textarea
                style={styles.textarea}
                rows={3}
                value={(formData[key as keyof SurveyData] as string) || ""}
                onChange={(e) => setField(key as keyof SurveyData, e.target.value)}
                placeholder="Share your thoughts with us..."
              />
            </div>
          ))}
        </div>

        {/* Action Row */}
        <div style={styles.actionRow}>
          <button style={styles.backBtn} onClick={onBack}>Back</button>
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
  content:       { width: "100%", maxWidth: "1400px" },
  pageHeader:    { marginBottom: "48px" },
  pageTitle:     { fontSize: "26px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 10px", letterSpacing: "-0.5px" },
  pageSubtitle:  { fontSize: "13px", color: "#555", margin: 0 },
  formContainer: { display: "flex", flexDirection: "column", gap: "50px", paddingBottom: "40px" },
  sectionBlock:  { display: "flex", flexDirection: "column", gap: "24px", width: "100%" },
  sectionTitle:  { fontSize: "18px", fontWeight: "600", color: "#9b1d2a", margin: 0 },
  divider:       { height: "1px", backgroundColor: "#e0e0e0", width: "100%", marginTop: "-10px" },
  inputGroup:    { display: "flex", flexDirection: "column", gap: "10px", flex: 1, width: "100%" },
  questionLabel: { fontSize: "13px", color: "#333", fontWeight: "500", lineHeight: "1.5", marginBottom: "4px" },
  textarea:      { border: "1px solid #dcdcdc", borderRadius: "8px", padding: "16px", fontSize: "13px", color: "#333", outline: "none", width: "100%", backgroundColor: "#ffffff", resize: "vertical", fontFamily: "inherit" },
  radioList:     { display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" },
  radioLabel:    { display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#333", cursor: "pointer" },
  checkboxList:  { display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" },
  
  // Table
  tableWrapper:    { display: "flex", flexDirection: "column", gap: "4px", marginTop: "12px", width: "100%" },
  tableHeaderRow:  { display: "flex", padding: "0 24px", marginBottom: "6px" },
  tableItemCol:    { flex: 2, paddingRight: "20px", display: "flex", alignItems: "center" },
  tableRatingsCol: { flex: 3, display: "flex", justifyContent: "space-between", alignItems: "flex-end" },
  tableColHeader:  { flex: 1, textAlign: "center" as const, fontSize: "11px", fontWeight: "700", color: "#333", lineHeight: "1.3", padding: "0 4px" },
  tableRowEven:    { display: "flex", backgroundColor: "#ffffff", borderRadius: "12px", padding: "16px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.02)", width: "100%", alignItems: "center" },
  tableRowOdd:     { display: "flex", backgroundColor: "#fafafa", borderRadius: "12px", padding: "16px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.02)", width: "100%", alignItems: "center" },
  tableItemText:   { fontSize: "12px", color: "#333", lineHeight: "1.5" },
  radioWrapperCenter: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center" },
  radioInputNormal:   { width: "20px", height: "20px", accentColor: "#9b1d2a", cursor: "pointer" },
  
  // Buttons
  actionRow: { display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" },
  backBtn:   { backgroundColor: "#ffffff", color: "#9b1d2a", border: "2px solid #9b1d2a", borderRadius: "24px", padding: "12px 64px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  nextBtn:   { backgroundColor: "#9b1d2a", color: "#ffffff", border: "none", borderRadius: "24px", padding: "12px 64px", fontSize: "14px", fontWeight: "600", cursor: "pointer", boxShadow: "0 2px 6px rgba(155,29,42,0.2)" },
  disabledBtn: { backgroundColor: "#ccc", cursor: "not-allowed", boxShadow: "none", },
};