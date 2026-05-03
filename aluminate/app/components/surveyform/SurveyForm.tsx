"use client";

import { useState } from "react";

interface SurveyFormProps {
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

  // Program Feedback
  suggestions: string;
  satisfaction: SatisfactionLevel;
  satisfactionReasons: string;
  degreeHelpfulness: string;
  programImprovements: string;
  emailUpdates: string;
  alumniInterview: InterviewAnswer;
}

export default function SurveyForm({ onSubmit }: SurveyFormProps) {
  const [form, setForm] = useState<FormData>({
    lastName: "",
    firstName: "",
    middleInitial: "",
    monthYearGraduated: "",
    studentNumber: "",
    workField: "",
    pursuingHigherStudies: "",
    degreesHeld: "",
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
    <div style={styles.shell}>
      {/* Removed <AlumniSidebar /> here to prevent duplication */}
      
      <main style={styles.main}>
        <div style={styles.content}>
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
                <input style={styles.input} value={form.lastName} onChange={set("lastName")} />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>First Name</label>
                <input style={styles.input} value={form.firstName} onChange={set("firstName")} />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Middle Initial</label>
                <input style={styles.input} value={form.middleInitial} onChange={set("middleInitial")} maxLength={3} />
              </div>
            </div>

            <div style={styles.row2}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Month and Year Graduated</label>
                <input style={styles.input} type="month" value={form.monthYearGraduated} onChange={set("monthYearGraduated")} />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Student Number</label>
                <input style={styles.input} value={form.studentNumber} onChange={set("studentNumber")} />
              </div>
            </div>
          </section>

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
              <textarea 
                style={styles.textarea} 
                rows={4} 
                value={form.workField} 
                onChange={set("workField")} 
                placeholder="Please state the nature of your work..."
              />
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
                </label>
                <input 
                  style={{ ...styles.input, color: "#9b1d2a" }} 
                  value={form.degreesHeld} 
                  onChange={set("degreesHeld")} 
                  placeholder="If possible, list this component for every study you are on."
                />
              </div>
            </div>
          </section>

          {/* ── PROGRAM FEEDBACK ── */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Program Feedback</h2>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Please share your suggestions for activities (programs, mentoring, etc.) that allows us to better help alumni find jobs after graduation.
                Please elaborate on your suggestions below.
              </label>
              <textarea 
                style={styles.textarea} 
                rows={4} 
                value={form.suggestions} 
                onChange={set("suggestions")} 
                placeholder="Please state your suggestions with us..."
              />
            </div>

            <div style={styles.fieldGroupCenter}>
              <label style={styles.labelCenter}>
                What is your level of satisfaction for your undergraduate study under the BSCS degree program?
              </label>
              <div style={styles.horizontalRadioGroup}>
                {satisfactionLevels.map((level) => (
                  <label key={level} style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="satisfaction"
                      value={level}
                      checked={form.satisfaction === level}
                      onChange={set("satisfaction")}
                      style={styles.radioInput}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Reasons for giving that rating above:</label>
              <textarea 
                style={styles.textarea} 
                rows={3} 
                value={form.satisfactionReasons} 
                onChange={set("satisfactionReasons")} 
                placeholder="State your reasons with us..."
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                In what way did your degree program help you in your professional career?
              </label>
              <textarea 
                style={styles.textarea} 
                rows={3} 
                value={form.degreeHelpfulness} 
                onChange={set("degreeHelpfulness")} 
                placeholder="How in what way did your degree program help you in your professional career?"
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                What are your suggestions on how to improve the program in terms of the structure, content, teaching, assessments, etc.?
              </label>
              <textarea 
                style={styles.textarea} 
                rows={3} 
                value={form.programImprovements} 
                onChange={set("programImprovements")} 
                placeholder="State your suggestions with us..."
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Would you like to get updates regarding new BSCS/IT program offerings, trainings and/or activities for alumni?
                If yes, please provide your email below for subscribing.
              </label>
              <input 
                style={styles.input} 
                type="email" 
                value={form.emailUpdates} 
                onChange={set("emailUpdates")} 
                placeholder="Email address (For us to update)" 
              />
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
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#9b1d2a",
    margin: "0 0 8px",
    letterSpacing: "0.2px",
  },
  row3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
  },
  row2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  fieldGroupCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    margin: "12px 0",
  },
  label: {
    fontSize: "12px",
    color: "#333",
    fontWeight: "500",
    lineHeight: "1.5",
  },
  labelCenter: {
    fontSize: "12px",
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    border: "none",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "13px",
    color: "#333",
    backgroundColor: "#ffffff",
    outline: "none",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
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
  select: {
    border: "none",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "13px",
    color: "#333",
    backgroundColor: "#ffffff",
    outline: "none",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  horizontalRadioGroup: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  verticalRadioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "4px",
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