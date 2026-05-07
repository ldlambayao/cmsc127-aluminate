"use client";

import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import { useFormStore, SurveyData } from "@/../lib/store/useFormStore";

// --- Types ---
interface Page5FormState {
  strengths: {
    curriculumStructure: boolean;
    adequateFacilities: boolean;
    classroomsAndSoftware: boolean;
    facultyExpertise: boolean;
    supportiveFaculty: boolean;
    supportiveNonTeaching: boolean;
    other: boolean;
    otherText: string;
  };
  weaknesses: {
    irrelevantCourses: boolean;
    inadequateFacilities: boolean;
    insufficientResources: boolean;
    lackFacultyExpertise: boolean;
    lackFacultySupport: boolean;
    lackNonTeachingSupport: boolean;
    other: boolean;
    otherText: string;
  };
  improvementSuggestion: string;
  recommendProgram: "Yes" | "No" | null;
  recommendWhy: string;
  overallImprovementSuggestion: string;
  additionalComments: string;
}

interface Page5FormProps {
  onBack?: () => void;
  onSubmit?: (data: Page5FormState) => void;
  progressBar?: React.ReactNode;
}

// --- Main Component ---
export default function Page5ProgramSatisfactionForm({ onBack, onSubmit, progressBar }: Page5FormProps) {
  const { formData, setField, togglePage5Checkbox, setPage5Text } = useFormStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const updateP5 = (updates: Partial<typeof formData.page5Data>) => {
    setField("page5Data", { ...formData.page5Data, ...updates });
  };

  const isChecklistValid = (obj: Record<string, any>) => {
    const standardKeys = Object.keys(obj).filter(k => k !== "other" && k !== "otherText");
    const anyStandardChecked = standardKeys.some(key => obj[key] === true);

    const otherIsChecked = obj.other === true;
    const otherTextHasContent = (obj.otherText || "").trim().length > 0;

    return anyStandardChecked || (otherIsChecked && otherTextHasContent);
  };

  const isPageValid = (() => {
    if (!isChecklistValid(formData.page5Data.strengths)) return false;
    if (!isChecklistValid(formData.page5Data.weaknesses)) return false;

    if (formData.page5Data.improvementSuggestion.trim().length === 0 || formData.page5Data.recommendWhy.trim().length === 0) return false;
    if (formData.page5Data.overallImprovementSuggestion.trim().length === 0 || formData.page5Data.additionalComments.trim().length === 0) return false;
    if (!formData.page5Data.recommendProgram.trim()) return false;

    return true;
  })();

  const handleFinalSubmit = () => {
    if(isPageValid){
      onSubmit?.(formData.page5Data as unknown as Page5FormState);
    } else {
      alert("Please answer all required questions before submitting.");
    }
  }

  return (
    <div style={styles.content}>
      {progressBar}
      {/* Page Header */}
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Program Satisfaction Form</h1>
        <p style={styles.pageSubtitle}>
          Complete the Alumni Tracer form to contribute valuable feedback and data
        </p>
      </div>

      <div style={styles.formContainer}>
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Other questions for the improvement of the program</h2>
          <div style={styles.divider} />

          {/* --- Strengths --- */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Based on your experience, what do you think are the strengths of the program?{" "}
              <span style={styles.subText}>(Please check all that apply)</span>
            </label>
            <div style={styles.checkboxList}>
              {[
                { key: "curriculumStructure" as const,   label: "Curriculum structure" },
                { key: "adequateFacilities" as const,    label: "Facilities and equipment are adequate (laboratories, library, classrooms)" },
                { key: "classroomsAndSoftware" as const, label: "Classrooms and software (both reading and printable materials)" },
                { key: "facultyExpertise" as const,      label: "Expertise of the faculty members" },
                { key: "supportiveFaculty" as const,     label: "Supportive faculty members" },
                { key: "supportiveNonTeaching" as const, label: "Supportive non-teaching staff" },
                { key: "other" as const,                 label: "Other" },
              ].map(({ key, label }) => (
                <label key={key} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={!!formData.page5Data.strengths[key]}
                    onChange={() => togglePage5Checkbox('strengths', key)}
                    style={styles.checkboxInput}
                  />
                  {label}
                </label>
              ))}
            </div>
            <div style={styles.otherGroup}>
              <label style={styles.questionLabel}>Others:</label>
              <textarea
                style={styles.textarea}
                rows={3}
                value={formData.page5Data.strengths.otherText as string || ""}
                onChange={(e) => setPage5Text('strengths', 'otherText', e.target.value)}
                placeholder="Please specify..."
              />
            </div>
          </div>

          {/* --- Weaknesses --- */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Based on your experience, what do you think are the weaknesses of the program?{" "}
              <span style={styles.subText}>(Please check all that apply)</span>
            </label>
            <div style={styles.checkboxList}>
              {[
                { key: "irrelevantCourses" as const,      label: "Some courses are irrelevant" },
                { key: "inadequateFacilities" as const,   label: "Facilities and equipment are not adequate (laboratories, library, classrooms)" },
                { key: "insufficientResources" as const,  label: "Resources are not sufficient (soft, reading materials, books)" },
                { key: "lackFacultyExpertise" as const,   label: "Lack of expertise of some faculty members" },
                { key: "lackFacultySupport" as const,     label: "Lack of support from some faculty members" },
                { key: "lackNonTeachingSupport" as const, label: "Lack of support from non-teaching staff" },
                { key: "other" as const,                  label: "Other" },
              ].map(({ key, label }) => (
                <label key={key} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={!!formData.page5Data.weaknesses[key]}
                    onChange={() => togglePage5Checkbox('weaknesses', key)}
                    style={styles.checkboxInput}
                  />
                  {label}
                </label>
              ))}
            </div>
            <div style={styles.otherGroup}>
              <label style={styles.questionLabel}>Others:</label>
              <textarea
                style={styles.textarea}
                rows={3}
                value={formData.page5Data.weaknesses.otherText as string || ""}
                onChange={(e) => setPage5Text('weaknesses', 'otherText', e.target.value)}
                placeholder="Please specify..."
              />
            </div>
          </div>

          {/* --- Improvement Suggestion --- */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What can you suggest to improve your overall BSAM student experience?
            </label>
            <textarea
              style={styles.textarea}
              rows={4}
              value={formData.page5Data.improvementSuggestion}
              onChange={(e) => updateP5({ improvementSuggestion: e.target.value })}
              placeholder="Share your thoughts with us..."
            />
          </div>

          {/* --- Recommend Program --- */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>Will you recommend the BSAM program?</label>
            <div style={styles.radioList}>
              {(["Yes", "No"] as const).map((val) => (
                <label key={val} style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="recommendProgram"
                    checked={formData.page5Data.recommendProgram === val}
                    onChange={() => updateP5({ recommendProgram: val })}
                    style={styles.radioInputNormal}
                  />
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </label>
              ))}
            </div>
            <label style={{ ...styles.questionLabel, marginTop: "8px" }}>Why or why not?</label>
            <textarea
              style={styles.textarea}
              rows={3}
              value={formData.page5Data.recommendWhy}
              onChange={(e) => updateP5({ recommendWhy: e.target.value })}
              placeholder="Please explain..."
            />
          </div>

          {/* --- Overall Improvement Suggestion --- */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What can you suggest for the overall improvement of the BSAM program?
            </label>
            <textarea
              style={styles.textarea}
              rows={4}
              value={formData.page5Data.overallImprovementSuggestion}
              onChange={(e) => updateP5({ overallImprovementSuggestion: e.target.value })}
              placeholder="Share your thoughts with us..."
            />
          </div>

          {/* --- Additional Comments --- */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Please write here any additional comments or suggestions you may have on how we might
              have improved your supervision in doing the degree program or how we can improve the
              programs for the future takers of the degree programs.
            </label>
            <textarea
              style={styles.textarea}
              rows={5}
              value={formData.page5Data.additionalComments}
              onChange={(e) => updateP5({ additionalComments: e.target.value })}
              placeholder="Share your thoughts with us..."
            />
          </div>
        </div>

        {/* Action Row */}
        <div style={styles.actionRow}>
          <button style={styles.backBtn} onClick={onBack}>Back</button>
          <button style={{...styles.submitBtn, ...(isPageValid ? {} : styles.disabledBtn)}} onClick={handleFinalSubmit} disabled={!isPageValid}>
            Submit
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
  subText:       { fontSize: "11px", fontWeight: "400", color: "#555" },
  textarea:      { border: "1px solid #dcdcdc", borderRadius: "8px", padding: "16px", fontSize: "13px", color: "#333", outline: "none", width: "100%", backgroundColor: "#ffffff", resize: "vertical", fontFamily: "inherit" },
  checkboxList:  { display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" },
  checkboxLabel: { display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#333", cursor: "pointer" },
  checkboxInput: { width: "16px", height: "16px", accentColor: "#9b1d2a", cursor: "pointer", border: "1px solid #ccc", borderRadius: "3px" },
  otherGroup:    { display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" },
  radioList:     { display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" },
  radioLabel:    { display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#333", cursor: "pointer" },
  radioInputNormal: { width: "16px", height: "16px", accentColor: "#9b1d2a", cursor: "pointer" },
  // Buttons
  actionRow:   { display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" },
  backBtn:     { backgroundColor: "#ffffff", color: "#9b1d2a", border: "2px solid #9b1d2a", borderRadius: "24px", padding: "12px 64px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  submitBtn:   { backgroundColor: "#9b1d2a", color: "#ffffff", border: "none", borderRadius: "24px", padding: "12px 64px", fontSize: "14px", fontWeight: "600", cursor: "pointer", boxShadow: "0 2px 6px rgba(155,29,42,0.2)" },
  disabledBtn: { backgroundColor: "#ccc", cursor: "not-allowed", boxShadow: "none", },
};