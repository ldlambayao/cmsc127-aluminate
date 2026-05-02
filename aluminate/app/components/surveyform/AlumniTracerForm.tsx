"use client";

import { useState } from "react";

interface AlumniTracerFormProps {
  onSubmit?: () => void;
}

type SatisfactionLevel = "Very Satisfied" | "Satisfied" | "Neutral" | "Dissatisfied" | "Not Satisfied" | "";
type InterviewAnswer = "Yes" | "No" | "Maybe, I'll provide my info later" | "";

interface FormData {
  // Personal Information
  lastName: string;
  firstName: string;
  middleInitial: string;
  monthYearGraduated: string;
  studentNumber: string;

  // Employment / Education
  workField: string;
  pursuingHigherStudies: string;
  degreesHeld: string;
  employed: string;
  workRelated: string;

  // Program Feedback
  suggestions: string;
  satisfaction: SatisfactionLevel;
  satisfactionReasons: string;
  degreeHelpfulness: string;
  programImprovements: string;
  emailUpdates: string;
  alumniInterview: InterviewAnswer;
}

export default function AlumniTracerForm({ onSubmit }: AlumniTracerFormProps) {
  const [form, setForm] = useState<FormData>({
    lastName: "",
    firstName: "",
    middleInitial: "",
    monthYearGraduated: "",
    studentNumber: "",
    workField: "",
    pursuingHigherStudies: "",
    degreesHeld: "",
    employed: "",
    workRelated: "",
    suggestions: "",
    satisfaction: "",
    satisfactionReasons: "",
    degreeHelpfulness: "",
    programImprovements: "",
    emailUpdates: "",
    alumniInterview: "",
  });

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    console.log("Survey submitted:", form);
    onSubmit?.();
  };

  const satisfactionLevels: SatisfactionLevel[] = [
    "Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Not Satisfied",
  ];

  const interviewOptions: InterviewAnswer[] = [
    "Yes", "No", "Maybe, I'll provide my info later",
  ];

  return (
    <div style={styles.wrapper}>
      {/* Page Header */}
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Alumni Tracer Form</h1>
        <p style={styles.pageSubtitle}>
          Complete the Alumni Tracer Form to aid and inform alumni-related research activities.
        </p>
      </div>

      {/* ── PERSONAL INFORMATION ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Personal Information</h2>

        <div style={styles.row3}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Last Name</label>
            <input style={styles.input} value={form.lastName} onChange={set("lastName")} placeholder="" />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>First Name</label>
            <input style={styles.input} value={form.firstName} onChange={set("firstName")} placeholder="" />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Middle Initial</label>
            <input style={styles.input} value={form.middleInitial} onChange={set("middleInitial")} placeholder="" maxLength={3} />
          </div>
        </div>

        <div style={styles.row2}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Month and Year Graduated</label>
            <input style={styles.input} type="month" value={form.monthYearGraduated} onChange={set("monthYearGraduated")} />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Student Number</label>
            <input style={styles.input} value={form.studentNumber} onChange={set("studentNumber")} placeholder="" />
          </div>
        </div>
      </section>

      <div style={styles.sectionDivider} />

      {/* ── EMPLOYMENT / EDUCATION ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Employment Details, Further Education, and Career Outcomes
        </h2>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            What is the nature of your work? (Specialization, field / Expertise in the area /
            Specialization/Company, Business, Research and Development work, Others) and if
            currently employed, please provide the name of your employer.
          </label>
          <textarea style={styles.textarea} rows={4} value={form.workField} onChange={set("workField")} />
        </div>

        <div style={styles.row2}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Are you pursuing higher studies?</label>
            <select style={styles.select} value={form.pursuingHigherStudies} onChange={set("pursuingHigherStudies")}>
              <option value="">Select option</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              Please specify degrees/programs held at or from your university.
              If possible, list this component for every study you are on.
            </label>
            <textarea style={{ ...styles.textarea, minHeight: "70px" }} rows={3} value={form.degreesHeld} onChange={set("degreesHeld")} />
          </div>
        </div>

        <div style={styles.row2}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Are you currently employed?</label>
            <div style={styles.radioGroup}>
              {["Yes", "No"].map((opt) => (
                <label key={opt} style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="employed"
                    value={opt}
                    checked={form.employed === opt}
                    onChange={set("employed")}
                    style={styles.radioInput}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Is your work related to your degree program?</label>
            <div style={styles.radioGroup}>
              {["Yes", "No"].map((opt) => (
                <label key={opt} style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="workRelated"
                    value={opt}
                    checked={form.workRelated === opt}
                    onChange={set("workRelated")}
                    style={styles.radioInput}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={styles.sectionDivider} />

      {/* ── PROGRAM FEEDBACK ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Program Feedback</h2>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Please share your suggestions for activities (programs, mentoring, etc.) that allows us to better help alumni find jobs after graduation.
            Please elaborate on your suggestions below.
          </label>
          <textarea style={styles.textarea} rows={5} value={form.suggestions} onChange={set("suggestions")} />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            What is your level of satisfaction for your undergraduate study under the BSCS degree program?
          </label>
          <div style={styles.satisfactionRow}>
            {satisfactionLevels.map((level) => (
              <button
                key={level}
                type="button"
                style={{
                  ...styles.satisfactionBtn,
                  ...(form.satisfaction === level ? styles.satisfactionBtnActive : {}),
                }}
                onClick={() => setForm((prev) => ({ ...prev, satisfaction: level }))}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Reasons for giving that rating above:</label>
          <textarea style={styles.textarea} rows={4} value={form.satisfactionReasons} onChange={set("satisfactionReasons")} />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            In what way did your degree program help you in your professional career?
          </label>
          <textarea style={styles.textarea} rows={4} value={form.degreeHelpfulness} onChange={set("degreeHelpfulness")} />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            What are your suggestions on how to improve the program in terms of the structure, content, teaching, assessments, etc.?
          </label>
          <textarea style={styles.textarea} rows={4} value={form.programImprovements} onChange={set("programImprovements")} />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Would you like to get updates regarding new BSCS/IT program offerings, trainings and/or activities for alumni?
            If yes, please provide your email below for subscribing.
          </label>
          <input style={styles.input} type="email" value={form.emailUpdates} onChange={set("emailUpdates")} placeholder="email@example.com" />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Would you be interested in taking part as an alumni interviewer for the review and revision of the BSCS Program?
          </label>
          <div style={styles.verticalRadioGroup}>
            {interviewOptions.map((opt) => (
              <label key={opt} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="alumniInterview"
                  value={opt}
                  checked={form.alumniInterview === opt}
                  onChange={set("alumniInterview")}
                  style={styles.radioInput}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Submit */}
      <div style={styles.submitRow}>
        <button style={styles.submitBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    flex: 1,
    padding: "40px 56px",
    backgroundColor: "#f0f0f0",
    overflowY: "auto",
    maxWidth: "860px",
  },
  pageHeader: {
    marginBottom: "28px",
  },
  pageTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 6px",
    letterSpacing: "-0.3px",
  },
  pageSubtitle: {
    fontSize: "12.5px",
    color: "#888",
    margin: 0,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    marginBottom: "8px",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#9b1d2a",
    margin: "0 0 4px",
    letterSpacing: "0.1px",
  },
  sectionDivider: {
    height: "1px",
    backgroundColor: "#e4e4e4",
    margin: "24px 0",
  },
  row3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
  },
  row2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    color: "#444",
    lineHeight: "1.5",
  },
  input: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "8px 10px",
    fontSize: "13px",
    color: "#1a1a2e",
    backgroundColor: "#fff",
    outline: "none",
  },
  textarea: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "10px 12px",
    fontSize: "13px",
    color: "#1a1a2e",
    backgroundColor: "#fff",
    resize: "vertical" as const,
    outline: "none",
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "90px",
  },
  select: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "8px 10px",
    fontSize: "13px",
    color: "#1a1a2e",
    backgroundColor: "#fff",
    outline: "none",
    cursor: "pointer",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#fff",
  },
  verticalRadioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#444",
    cursor: "pointer",
  },
  radioInput: {
    accentColor: "#9b1d2a",
    cursor: "pointer",
  },
  satisfactionRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
  },
  satisfactionBtn: {
    padding: "7px 16px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "12px",
    color: "#555",
    cursor: "pointer",
    fontWeight: "500",
  },
  satisfactionBtnActive: {
    backgroundColor: "#9b1d2a",
    borderColor: "#9b1d2a",
    color: "#fff",
  },
  submitRow: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "16px",
    paddingBottom: "40px",
  },
  submitBtn: {
    backgroundColor: "#9b1d2a",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "10px 48px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
};