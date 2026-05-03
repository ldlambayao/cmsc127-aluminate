"use client";

import { useState } from "react";

// --- Types ---
type RatingValue = 1 | 2 | 3 | 4 | 5 | null;

interface FormState {
  // General Info
  date: string;
  studentNumber: string;
  timelinessRating: RatingValue;

  // Decision to Enroll
  learnAbout: {
    upWebsite: boolean;
    faculty: boolean;
    friend: boolean;
    other: boolean;
    otherText: string;
  };
  enrollmentFactors: { [key: string]: RatingValue };

  // Transition to the Program
  transitionDifficulty: RatingValue;
  transitionReason: string;
  transitionHelp: {
    bridging: boolean;
    refresher: boolean;
    other: boolean;
  };

  // Preparation Suggestion
  preparationSuggestion: string;
}

interface ProgramSatisfactionFormProps {
  onSubmit?: (formData: FormState) => void;
}

// --- Constants ---
const enrollmentFactorItems = [
  "Reputation of UP Mindanao",
  "Reputation of UP Mindanao Department of Math, Physics and Computer Science",
  "Reputation of the BSAM program",
  "Reputation/Expertise of the Faculty members",
  "The program matches my interests",
  "Financial consideration",
  "Recommendation of a friend",
  "Encouragement of parent/s or relatives",
  "Encouragement of a faculty member",
];

// --- Component ---
export default function ProgramSatisfactionForm({
  onSubmit,
}: ProgramSatisfactionFormProps) {
  const [form, setForm] = useState<FormState>({
    date: "",
    studentNumber: "",
    timelinessRating: null,
    learnAbout: {
      upWebsite: false,
      faculty: false,
      friend: false,
      other: false,
      otherText: "",
    },
    enrollmentFactors: {},
    transitionDifficulty: null,
    transitionReason: "",
    transitionHelp: {
      bridging: false,
      refresher: false,
      other: false,
    },
    preparationSuggestion: "",
  });

  const handleLearnAboutToggle = (key: keyof FormState["learnAbout"]) => {
    if (key === "otherText") return;
    setForm((prev) => ({
      ...prev,
      learnAbout: {
        ...prev.learnAbout,
        [key]: !prev.learnAbout[key],
      },
    }));
  };

  const handleTransitionHelpToggle = (
    key: keyof FormState["transitionHelp"]
  ) => {
    setForm((prev) => ({
      ...prev,
      transitionHelp: {
        ...prev.transitionHelp,
        [key]: !prev.transitionHelp[key],
      },
    }));
  };

  const setFactorRating = (item: string, val: RatingValue) => {
    setForm((prev) => ({
      ...prev,
      enrollmentFactors: {
        ...prev.enrollmentFactors,
        [item]: val,
      },
    }));
  };

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

        {/* --- General Information --- */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>General Information</h2>
          <div style={styles.divider} />

          <div style={styles.twoColumnRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                style={styles.textInput}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Student Number</label>
              <input
                type="text"
                style={styles.textInput}
                value={form.studentNumber}
                onChange={(e) =>
                  setForm({ ...form, studentNumber: e.target.value })
                }
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Please rate the timeliness of Education Service Delivery/Supervision.
              (Or rate DMPCS&apos; overall service delivery or supervision of the BSAM program):
            </label>
            <div style={styles.ratingCard}>
              <span style={styles.ratingEdgeLabel}>Poor</span>
              <div style={styles.radioScale}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} style={styles.radioItem}>
                    <span style={styles.radioNumber}>{num}</span>
                    <input
                      type="radio"
                      name="timelinessRating"
                      value={num}
                      checked={form.timelinessRating === num}
                      onChange={() =>
                        setForm({ ...form, timelinessRating: num as RatingValue })
                      }
                      style={styles.radioInputLarge}
                    />
                  </div>
                ))}
              </div>
              <span style={styles.ratingEdgeLabel}>Best</span>
            </div>
          </div>
        </div>

        {/* --- Decision to Enroll --- */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Decision to Enroll</h2>
          <div style={styles.divider} />

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              How did you learn about the BSAM program?
            </label>
            <div style={styles.checkboxList}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.learnAbout.upWebsite}
                  onChange={() => handleLearnAboutToggle("upWebsite")}
                  style={styles.checkboxInput}
                />
                UP Website or UP Mindanao Website
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.learnAbout.faculty}
                  onChange={() => handleLearnAboutToggle("faculty")}
                  style={styles.checkboxInput}
                />
                UP Mindanao Faculty/Employee
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.learnAbout.friend}
                  onChange={() => handleLearnAboutToggle("friend")}
                  style={styles.checkboxInput}
                />
                Friend/Colleague
              </label>
              <div style={styles.otherGroup}>
                <span style={styles.checkboxLabel}>Other:</span>
                <input
                  type="text"
                  value={form.learnAbout.otherText}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      learnAbout: {
                        ...prev.learnAbout,
                        otherText: e.target.value,
                      },
                    }))
                  }
                  style={styles.otherInput}
                />
              </div>
            </div>
          </div>

          {/* Enrollment Factors Table */}
          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Please rate the importance of each of the following factors in
              your decision to enroll in the BSAM Program:
              <br />
              <span style={styles.subText}>
                * 1 = Not important &nbsp; 4 = Very important &nbsp; 5 = Not applicable
              </span>
            </label>

            <div style={styles.factorsContainer}>
              {/* Header */}
              <div style={styles.factorsHeaderRow}>
                <div style={styles.factorLabelCol} />
                <div style={styles.factorRadiosCol}>
                  {[
                    ["1", "Not important"],
                    ["2", "Somewhat Important"],
                    ["3", "Important"],
                    ["4", "Very Important"],
                    ["5", "Not Applicable"],
                  ].map(([num, label]) => (
                    <div key={num} style={styles.colHeader}>
                      <span>{num}</span>
                      <br />
                      <span style={styles.colSubHeader}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rows */}
              {enrollmentFactorItems.map((item, idx) => (
                <div key={idx} style={styles.factorRow}>
                  <div style={styles.factorLabelCol}>
                    <span style={styles.factorItemText}>{item}</span>
                  </div>
                  <div style={styles.factorRadiosCol}>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <div key={val} style={styles.radioWrapperCenter}>
                        <input
                          type="radio"
                          name={`factor-${idx}`}
                          checked={form.enrollmentFactors[item] === val}
                          onChange={() =>
                            setFactorRating(item, val as RatingValue)
                          }
                          style={styles.radioInputNormal}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Transition to the Program --- */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Transition to the Program</h2>
          <div style={styles.divider} />

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What is the level of difficulty of your adjustment to the BSAM program?
            </label>
            <div style={styles.ratingCard}>
              <span style={styles.ratingEdgeLabel}>Very Easy</span>
              <div style={styles.radioScale}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} style={styles.radioItem}>
                    <span style={styles.radioNumber}>{num}</span>
                    <input
                      type="radio"
                      name="transitionDifficulty"
                      value={num}
                      checked={form.transitionDifficulty === num}
                      onChange={() =>
                        setForm({
                          ...form,
                          transitionDifficulty: num as RatingValue,
                        })
                      }
                      style={styles.radioInputLarge}
                    />
                  </div>
                ))}
              </div>
              <span style={styles.ratingEdgeLabel}>Very Difficult</span>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Please explain the reason to your answer on the previous question.
            </label>
            <textarea
              style={styles.textarea}
              rows={4}
              value={form.transitionReason}
              onChange={(e) =>
                setForm({ ...form, transitionReason: e.target.value })
              }
              placeholder="Share your reasons with us..."
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What will make the transition easier for you?
            </label>
            <div style={styles.checkboxList}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.transitionHelp.bridging}
                  onChange={() => handleTransitionHelpToggle("bridging")}
                  style={styles.checkboxInput}
                />
                Bridging program
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.transitionHelp.refresher}
                  onChange={() => handleTransitionHelpToggle("refresher")}
                  style={styles.checkboxInput}
                />
                Refresher course for certain topics
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.transitionHelp.other}
                  onChange={() => handleTransitionHelpToggle("other")}
                  style={styles.checkboxInput}
                />
                Other
              </label>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What can you suggest to prepare you for the course requirements
              of the whole BSAM program?
            </label>
            <textarea
              style={styles.textarea}
              rows={4}
              value={form.preparationSuggestion}
              onChange={(e) =>
                setForm({ ...form, preparationSuggestion: e.target.value })
              }
              placeholder="Share your thoughts with us..."
            />
          </div>
        </div>

        {/* Submit Row */}
        <div style={styles.actionRow}>
          <button style={styles.nextBtn} onClick={() => onSubmit?.(form)}>
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
  twoColumnRow: {
    display: "flex",
    gap: "24px",
    width: "100%",
    maxWidth: "700px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
    width: "100%",
  },
  label: {
    fontSize: "12px",
    color: "#333",
    fontWeight: "500",
  },
  questionLabel: {
    fontSize: "13px",
    color: "#333",
    fontWeight: "500",
    lineHeight: "1.5",
    marginBottom: "4px",
  },
  subText: {
    fontSize: "11px",
    fontWeight: "400",
    color: "#555",
  },
  textInput: {
    border: "1px solid #dcdcdc",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  textarea: {
    border: "1px solid #dcdcdc",
    borderRadius: "8px",
    padding: "16px",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    width: "100%",
    backgroundColor: "#ffffff",
    resize: "vertical",
    fontFamily: "inherit",
  },
  ratingCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    border: "1px solid #eaeaea",
    borderRadius: "12px",
    padding: "24px 40px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    marginTop: "8px",
    width: "100%",
  },
  ratingEdgeLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#111",
    width: "80px",
    textAlign: "center",
  },
  radioScale: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    padding: "0 20px",
  },
  radioItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  radioNumber: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
  },
  radioInputLarge: {
    width: "18px",
    height: "18px",
    accentColor: "#9b1d2a",
    cursor: "pointer",
  },
  radioInputNormal: {
    width: "16px",
    height: "16px",
    accentColor: "#9b1d2a",
    cursor: "pointer",
  },
  checkboxList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "4px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "13px",
    color: "#333",
    cursor: "pointer",
  },
  checkboxInput: {
    width: "16px",
    height: "16px",
    accentColor: "#9b1d2a",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "3px",
  },
  otherGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
  },
  otherInput: {
    border: "1px solid #dcdcdc",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    width: "100%",
    maxWidth: "350px",
    backgroundColor: "#ffffff",
  },
  factorsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "16px",
    width: "100%",
  },
  factorsHeaderRow: {
    display: "flex",
    padding: "0 24px",
    marginBottom: "8px",
  },
  factorLabelCol: {
    flex: 2,
    paddingRight: "20px",
    display: "flex",
    alignItems: "center",
  },
  factorRadiosCol: {
    flex: 3,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  colHeader: {
    flex: 1,
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "700",
    color: "#333",
    lineHeight: "1.2",
  },
  colSubHeader: {
    fontSize: "10px",
    fontWeight: "400",
    color: "#666",
  },
  factorRow: {
    display: "flex",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "16px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
    width: "100%",
  },
  factorItemText: {
    fontSize: "12px",
    color: "#333",
    lineHeight: "1.4",
  },
  radioWrapperCenter: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
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
};