"use client";

interface AlumniTracerFormIntroProps {
  onProceed: () => void;
}

export default function AlumniTracerFormIntro({ onProceed }: AlumniTracerFormIntroProps) {
  return (
    <div style={styles.content}>
      <h1 style={styles.title}>Alumni Tracer Form</h1>

      <p style={styles.bodyText}>
        All information provided by the respondents shall be kept strictly by DMPCS and its
        other related academic and non-academic personnel as approved by the department.
      </p>

      <p style={styles.bodyText}>
        This form aims to record alumni information from the aforementioned program regarding
        their employability, pursuit of higher studies, feedback, etc.
      </p>

      <p style={styles.noteText}>
        *This survey only takes 1-3 minutes to finish.
      </p>

      <button style={styles.proceedBtn} onClick={onProceed}>
        ANSWER NOW &nbsp;
        <ArrowIcon />
      </button>
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
  content: {
    maxWidth: "800px",
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
  noteText: {
    fontSize: "13px",
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