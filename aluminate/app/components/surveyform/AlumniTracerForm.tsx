"use client";

import { useState } from "react";

interface AlumniTracerFormProps {
  onSubmit?: () => void;
}

type SatisfactionLevel = "Very Satisfied" | "Satisfied" | "Neutral" | "Dissatisfied" | "Very Dissatisfied" | "";
type InterviewAnswer = "Yes" | "No" | "Maybe, I'll join later at some other time" | "";

interface FormData {
  lastName: string;
  firstName: string;
  middleInitial: string;
  monthYearGraduated: string;
  studentNumber: string;
  workField: string;
  pursuingHigherStudies: string;
  degreesHeld: string;
  employed: string;
  workRelated: string;
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
    "Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied",
  ];

  const interviewOptions: InterviewAnswer[] = [
    "Yes", "No", "Maybe, I'll join later at some other time",
  ];

  return (
    <div style={styles.content}>

      {/* Page Header */}
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Alumni Tracer Form</h1>
        <p style={styles.pageSubtitle}>
          Complete the Alumni Tracer form to contribute valuable feedback and data.
        </p>
      </div>

      <div style={styles.formContainer}>

        {/* ── PERSONAL INFORMATION ── */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Personal Information</h2>
          <div style={styles.divider} />

          <div style={styles.twoColumnRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Last Name</label>
              <input style={styles.textInput} value={form.lastName} onChange={set("lastName")} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>First Name</label>
              <input style={styles.textInput} value={form.firstName} onChange={set("firstName")} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Middle Initial</label>
              <input style={styles.textInput} value={form.middleInitial} onChange={set("middleInitial")} maxLength={3} />
            </div>
          </div>

          <div style={{ ...styles.twoColumnRow, maxWidth: "500px" }}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Month and Year Graduated</label>
              <input style={styles.textInput} type="month" value={form.monthYearGraduated} onChange={set("monthYearGraduated")} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Student Number</label>
              <input style={styles.textInput} value={form.studentNumber} onChange={set("studentNumber")} />
            </div>
          </div>
        </div>

        {/* ── EMPLOYMENT / EDUCATION ── */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Employment Details, Further Education, and Career Outcomes</h2>
          <div style={styles.divider} />

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What is the nature of your work? (Education, IT/ICT Position in the
              Organization/Company, Business, Research and Development, Others, etc.)
              If currently employed, please provide the name of your employer.
            </label>
            <textarea style={styles.textarea} rows={4} value={form.workField} onChange={set("workField")}
              placeholder="Share with us the nature of your work..." />
          </div>

          <div style={styles.twoColumnRow}>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>Are you pursuing higher studies?</label>
              <select style={styles.textInput} value={form.pursuingHigherStudies} onChange={set("pursuingHigherStudies")}>
                <option value="">Select option</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>
                Please specify degree program, field of study, and university.
              </label>
              <textarea style={styles.textarea} rows={3} value={form.degreesHeld} onChange={set("degreesHeld")}
                placeholder="List each program if applicable..." />
            </div>
          </div>

          <div style={styles.twoColumnRow}>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>Are you currently employed?</label>
              <div style={styles.checkboxList}>
                {["Yes", "No"].map((opt) => (
                  <label key={opt} style={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="employed"
                      value={opt}
                      checked={form.employed === opt}
                      onChange={set("employed")}
                      style={styles.checkboxInput}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>Is your work related to your degree program?</label>
              <div style={styles.checkboxList}>
                {["Yes", "No"].map((opt) => (
                  <label key={opt} style={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="workRelated"
                      value={opt}
                      checked={form.workRelated === opt}
                      onChange={set("workRelated")}
                      style={styles.checkboxInput}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── PROGRAM FEEDBACK ── */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Program Feedback</h2>
          <div style={styles.divider} />

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Please share your suggestions for activities (programs, mentoring, etc.) that
              allow us to better help alumni find jobs after graduation. Please elaborate below.
            </label>
            <textarea style={styles.textarea} rows={5} value={form.suggestions} onChange={set("suggestions")}
              placeholder="Share your suggestions with us..." />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What is your level of satisfaction for your undergraduate study under the BSCS degree program?
            </label>
            <div style={styles.ratingCard}>
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

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>Reasons for giving that rating above:</label>
            <textarea style={styles.textarea} rows={4} value={form.satisfactionReasons} onChange={set("satisfactionReasons")}
              placeholder="Share your reasons with us..." />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              In what way did your degree program help you in your professional career?
            </label>
            <textarea style={styles.textarea} rows={4} value={form.degreeHelpfulness} onChange={set("degreeHelpfulness")}
              placeholder="Share your thoughts with us..." />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What are your suggestions on how to improve the program in terms of structure,
              content, teaching, assessments, etc.?
            </label>
            <textarea style={styles.textarea} rows={4} value={form.programImprovements} onChange={set("programImprovements")}
              placeholder="Share your suggestions with us..." />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Would you like to get updates regarding new DMPCS program offerings, trainings
              and/or activities for alumni? If yes, please provide your email below.
            </label>
            <input style={styles.textInput} type="email" value={form.emailUpdates} onChange={set("emailUpdates")}
              placeholder="email@example.com" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Would you be interested in taking part as an alumni interviewer for the review
              and revision of the BSCS Program?
            </label>
            <div style={styles.checkboxList}>
              {interviewOptions.map((opt) => (
                <label key={opt} style={styles.checkboxLabel}>
                  <input
                    type="radio"
                    name="alumniInterview"
                    value={opt}
                    checked={form.alumniInterview === opt}
                    onChange={set("alumniInterview")}
                    style={styles.checkboxInput}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={styles.actionRow}>
          <button style={styles.nextBtn} onClick={handleSubmit}>
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}

// --- Styles --- (exact mirror of ProgramSatisfactionForm styles)
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
    resize: "vertical" as const,
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
    flexWrap: "wrap" as const,
    gap: "10px",
  },
  satisfactionBtn: {
    padding: "7px 18px",
    borderRadius: "20px",
    border: "1px solid #dcdcdc",
    backgroundColor: "#ffffff",
    fontSize: "12px",
    color: "#555",
    cursor: "pointer",
    fontWeight: "500",
  },
  satisfactionBtnActive: {
    backgroundColor: "#9b1d2a",
    borderColor: "#9b1d2a",
    color: "#ffffff",
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