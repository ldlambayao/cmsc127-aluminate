"use client";

import { useState } from "react";

interface ProgramSatisfactionFormProps {
  onSubmit: () => void;
}

// --- Types ---
type RatingValue = 1 | 2 | 3 | 4 | 5 | null;

interface FormState {
  sex: string;
  generalRating: RatingValue;
  decisionReasons: {
    availableScholarships: boolean;
    preferredProgram: boolean;
    parentsChoice: boolean;
    noOtherChoice: boolean;
    other: boolean;
    otherText: string;
  };
  satisfactionRatings: { [key: string]: RatingValue };
  transitionRating: RatingValue;
  transitionFreeText: string;
  meetsCareerGoals: string;
  programStrengths: string;
  programImprovements: string;
  additionalComments: string;
}

const satisfactionItems = [
  "Quality of instruction in the major courses",
  "Relevance of the curriculum to real-world applications",
  "Availability of resources (library, labs, equipment)",
  "Academic support services (tutoring, advising)",
  "Opportunities for research or internship",
  "Class sizes and student-to-faculty ratio",
  "Overall program structure and course sequencing",
  "Extracurricular and co-curricular opportunities",
  "Career guidance and placement support",
  "Communication from program administration",
];

const ratingLabels = ["1-Not Satisfied", "2", "3", "4", "5-Extremely Satisfied"];

export default function ProgramSatisfactionForm({
  onSubmit,
}: ProgramSatisfactionFormProps) {
  const [form, setForm] = useState<FormState>({
    sex: "",
    generalRating: null,
    decisionReasons: {
      availableScholarships: false,
      preferredProgram: false,
      parentsChoice: false,
      noOtherChoice: false,
      other: false,
      otherText: "",
    },
    satisfactionRatings: {},
    transitionRating: null,
    transitionFreeText: "",
    meetsCareerGoals: "",
    programStrengths: "",
    programImprovements: "",
    additionalComments: "",
  });

  const handleReasonToggle = (key: keyof FormState["decisionReasons"]) => {
    if (key === "otherText") return;
    setForm((prev) => ({
      ...prev,
      decisionReasons: {
        ...prev.decisionReasons,
        [key]: !prev.decisionReasons[key],
      },
    }));
  };

  const handleReasonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      decisionReasons: {
        ...prev.decisionReasons,
        otherText: e.target.value,
      },
    }));
  };

  const setRating = (item: string, val: RatingValue) => {
    setForm((prev) => ({
      ...prev,
      satisfactionRatings: {
        ...prev.satisfactionRatings,
        [item]: val,
      },
    }));
  };

  const handleSubmit = () => {
    console.log("Program Satisfaction Form Submitted:", form);
    onSubmit();
  };

  return (
    <div style={styles.shell}>
      {/* Sidebar is excluded to prevent duplication since parent layout handles it */}
      
      <main style={styles.main}>
        <div style={styles.content}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <h1 style={styles.pageTitle}>Program Satisfaction Form</h1>
            <p style={styles.pageSubtitle}>
              Complete the Program Satisfaction Form to aid and inform alumni-related research activities.
            </p>
          </div>

          <div style={styles.formContainer}>
            {/* Q1. Sex */}
            <div style={styles.fieldGroup}>
              <label style={styles.questionLabel}>Sex</label>
              <div style={styles.horizontalRadioGroup}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="sex"
                    value="Male"
                    checked={form.sex === "Male"}
                    onChange={(e) => setForm({ ...form, sex: e.target.value })}
                    style={styles.radioInput}
                  />
                  Male
                </label>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="sex"
                    value="Female"
                    checked={form.sex === "Female"}
                    onChange={(e) => setForm({ ...form, sex: e.target.value })}
                    style={styles.radioInput}
                  />
                  Female
                </label>
              </div>
            </div>

            {/* Q2. General Experience */}
            <div style={styles.fieldGroup}>
              <label style={styles.questionLabel}>
                Overall, how would you rate your experience in your degree program?
              </label>
              <div style={styles.scaleRadioGroup}>
                {ratingLabels.map((label, idx) => {
                  const val = (idx + 1) as RatingValue;
                  return (
                    <label key={val} style={styles.radioLabel}>
                      <input
                        type="radio"
                        name="generalRating"
                        checked={form.generalRating === val}
                        onChange={() => setForm({ ...form, generalRating: val })}
                        style={styles.radioInput}
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Q3. Decision Reasons */}
            <div style={styles.fieldGroup}>
              <label style={styles.questionLabel}>
                Why did you decide to take this program? (Check all that apply)
              </label>
              <div style={styles.verticalCheckGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={form.decisionReasons.availableScholarships}
                    onChange={() => handleReasonToggle("availableScholarships")}
                    style={styles.checkboxInput}
                  />
                  Available scholarships/financial aid
                </label>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={form.decisionReasons.preferredProgram}
                    onChange={() => handleReasonToggle("preferredProgram")}
                    style={styles.checkboxInput}
                  />
                  It was my preferred program
                </label>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={form.decisionReasons.parentsChoice}
                    onChange={() => handleReasonToggle("parentsChoice")}
                    style={styles.checkboxInput}
                  />
                  Parents&apos choice
                </label>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={form.decisionReasons.noOtherChoice}
                    onChange={() => handleReasonToggle("noOtherChoice")}
                    style={styles.checkboxInput}
                  />
                  No other choice (e.g. didn&apos;t pass quota for other courses)
                </label>
                <div style={styles.otherCheckWrap}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={form.decisionReasons.other}
                      onChange={() => handleReasonToggle("other")}
                      style={styles.checkboxInput}
                    />
                    Other:
                  </label>
                  {form.decisionReasons.other && (
                    <input
                      type="text"
                      value={form.decisionReasons.otherText}
                      onChange={handleReasonTextChange}
                      placeholder="Please specify"
                      style={styles.otherInput}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Q4. Satisfaction Table */}
            <div style={styles.fieldGroup}>
              <label style={styles.questionLabel}>
                Please indicate your level of satisfaction with the following aspects of your program:
              </label>
              <p style={styles.subText}>(1 - Not Satisfied, 5 - Extremely Satisfied)</p>
              
              <div style={styles.ratingsTable}>
                <div style={styles.ratingsHeaderRow}>
                  <div style={styles.ratingsItemCol}></div>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} style={styles.ratingsColHeader}>
                      {num}
                    </div>
                  ))}
                </div>
                {satisfactionItems.map((item, index) => (
                  <div key={index} style={styles.ratingsRow}>
                    <div style={styles.ratingsItemCol}>
                      <span style={styles.ratingsItemText}>{item}</span>
                    </div>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <div key={val} style={styles.ratingsRadioCol}>
                        <input
                          type="radio"
                          name={`sat-${index}`}
                          checked={form.satisfactionRatings[item] === val}
                          onChange={() => setRating(item, val as RatingValue)}
                          style={styles.radioInput}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Q5. Transition Rating */}
            <div style={styles.fieldGroup}>
              <label style={styles.questionLabel}>
                How would you rate the transition from the program to your career or further studies?
              </label>
              <div style={styles.scaleRadioGroup}>
                {ratingLabels.map((label, idx) => {
                  const val = (idx + 1) as RatingValue;
                  return (
                    <label key={val} style={styles.radioLabel}>
                      <input
                        type="radio"
                        name="transitionRating"
                        checked={form.transitionRating === val}
                        onChange={() => setForm({ ...form, transitionRating: val })}
                        style={styles.radioInput}
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Transition Free Text */}
            <div style={styles.fieldGroup}>
              <label style={styles.questionLabel}>
                Could you please elaborate on your answer for your transition from the program to your career or further studies?
              </label>
              <textarea
                style={styles.textarea}
                rows={3}
                value={form.transitionFreeText}
                onChange={(e) => setForm({ ...form, transitionFreeText: e.target.value })}
                placeholder="State your reasons with us..."
              />
            </div>

            {/* Q6. Career Goals */}
            <div style={styles.fieldGroup}>
              <label style={styles.questionLabel}>
                Has the program met your career goals? Please explain.
              </label>
              <textarea
                style={styles.textarea}
                rows={3}
                value={form.meetsCareerGoals}
                onChange={(e) => setForm({ ...form, meetsCareerGoals: e.target.value })}
                placeholder="State your answer..."
              />
            </div>

            {/* Q7. Program Strengths */}
            <div style={styles.fieldGroup}>
              <label style={styles.questionLabel}>
                What are the major strengths of the program?
              </label>
              <textarea
                style={styles.textarea}
                rows={3}
                value={form.programStrengths}
                onChange={(e) => setForm({ ...form, programStrengths: e.target.value })}
                placeholder="State your answer..."
              />
            </div>

            {/* Q8. Program Improvements */}
            <div style={styles.fieldGroup}>
              <label style={styles.questionLabel}>
                What areas of the program need improvement?
              </label>
              <textarea
                style={styles.textarea}
                rows={3}
                value={form.programImprovements}
                onChange={(e) => setForm({ ...form, programImprovements: e.target.value })}
                placeholder="State your answer..."
              />
            </div>

            {/* Q9. Additional Comments */}
            <div style={styles.fieldGroup}>
              <label style={styles.questionLabel}>
                Any additional comments?
              </label>
              <textarea
                style={styles.textarea}
                rows={3}
                value={form.additionalComments}
                onChange={(e) => setForm({ ...form, additionalComments: e.target.value })}
                placeholder="State your answer..."
              />
            </div>
          </div>

          {/* Submit */}
          <div style={styles.submitRow}>
            <button style={styles.submitBtn} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    padding: "48px 64px",
    display: "flex",
    justifyContent: "center",
    overflowY: "auto",
  },
  content: {
    maxWidth: "860px",
    width: "100%",
  },
  pageHeader: {
    marginBottom: "36px",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#202040",
    margin: "0 0 6px",
    letterSpacing: "-0.5px",
  },
  pageSubtitle: {
    fontSize: "12px",
    color: "#666",
    margin: 0,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    marginBottom: "40px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  questionLabel: {
    fontSize: "13px",
    color: "#333",
    fontWeight: "600",
    lineHeight: "1.5",
  },
  subText: {
    fontSize: "11px",
    color: "#666",
    margin: "-8px 0 4px",
  },
  textarea: {
    border: "none",
    borderRadius: "8px",
    padding: "14px",
    fontSize: "13px",
    color: "#333",
    backgroundColor: "#ffffff",
    resize: "vertical" as const,
    outline: "none",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    minHeight: "80px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  horizontalRadioGroup: {
    display: "flex",
    gap: "24px",
  },
  scaleRadioGroup: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap" as const,
  },
  verticalCheckGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: "#444",
    cursor: "pointer",
  },
  radioInput: {
    accentColor: "#9b1d2a",
    cursor: "pointer",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "12px",
    color: "#444",
    cursor: "pointer",
  },
  checkboxInput: {
    accentColor: "#9b1d2a",
    cursor: "pointer",
    width: "14px",
    height: "14px",
  },
  otherCheckWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  otherInput: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "6px 12px",
    fontSize: "12px",
    color: "#333",
    outline: "none",
    flex: 1,
    maxWidth: "300px",
  },

  // Ratings Table
  ratingsTable: {
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  ratingsHeaderRow: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fce8ea",
    padding: "12px 16px",
    gap: "8px",
  },
  ratingsColHeader: {
    flex: 1,
    textAlign: "center" as const,
    fontSize: "11px",
    fontWeight: "700",
    color: "#9b1d2a",
  },
  ratingsRow: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    gap: "8px",
    borderBottom: "1px solid #f0f2f5",
  },
  ratingsItemCol: {
    flex: 3,
    minWidth: 0,
  },
  ratingsItemText: {
    fontSize: "12px",
    color: "#444",
    lineHeight: "1.5",
  },
  ratingsRadioCol: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  submitRow: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "16px",
    paddingBottom: "60px",
  },
  submitBtn: {
    backgroundColor: "#9b1d2a",
    color: "#fff",
    border: "none",
    borderRadius: "24px",
    padding: "10px 48px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
};