"use client";

interface ProgramSatisfactionFormIntroProps {
  onProceed: () => void;
}

export default function ProgramSatisfactionFormIntro({
  onProceed,
}: ProgramSatisfactionFormIntroProps) {
  return (
    <div style={styles.shell}>
      {/* Sidebar is handled by the parent layout, so it is omitted here */}
      <main style={styles.main}>
        <div style={styles.content}>
          <h1 style={styles.title}>Program Satisfaction Form</h1>

          <p style={styles.bodyText}>
            The UP Mindanao Department of Math, Physics and Computer Science would
            like to ask questions about your experiences as a{" "}
            <strong>
              Bachelor of Science in Applied Mathematics (BSAM) student.
            </strong>{" "}
            This survey intends to provide us with information that will guide our
            future plans for the BSAM program.
          </p>
          <p style={styles.bodyText}>
            All raw information provided by the students will be kept at the DMPCS
            office and will be considered strictly confidential. Information will
            be processed so that the submission of this questionnaire will not
            identify the respondent.
          </p>
          <p style={styles.bodyText}>
            The survey takes approximately 30 minutes to complete. Kindly answer
            all questions as honestly and thoughtfully as possible. As
            stakeholders, we value your feedback and we take it seriously.
          </p>
          <p style={styles.bodyText}>
            Should you have additional questions or concerns regarding this survey,
            feel free to contact Assoc. Prof. Giovanna Fae Oguis
            (groguis@up.edu.ph) through the email address provided.
          </p>
          <p style={styles.bodyText}>
            Thank you in advance for your participation.
          </p>
          <p style={styles.signoff}>DMPCS</p>

          <button style={styles.proceedBtn} onClick={onProceed}>
            PROCEED TO SURVEY &nbsp;
            <ArrowIcon />
          </button>
        </div>
      </main>
    </div>
  );
}

// --- Icons ---
const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    style={{ verticalAlign: "middle" }}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

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
    padding: "64px 72px", 
    display: "flex",
    flexDirection: "column",
  },
  content: {
    maxWidth: "900px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#202040",
    margin: "0 0 20px",
    letterSpacing: "-0.5px",
  },
  bodyText: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#555",
    margin: "0 0 16px",
  },
  signoff: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#555",
    margin: "0 0 28px", 
  },
  proceedBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#9b1d2a", 
    color: "#ffffff",
    border: "none",
    borderRadius: "20px", 
    padding: "8px 20px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    cursor: "pointer",
  },
};