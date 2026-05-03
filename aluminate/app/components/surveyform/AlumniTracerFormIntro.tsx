"use client";

interface AlumniTracerFormIntroProps {
  onProceed: () => void;
}

export default function AlumniTracerFormIntro({ onProceed }: AlumniTracerFormIntroProps) {
  return (
    <div style={styles.shell}>
      {/* Removed <AlumniSidebar /> to prevent duplication */}
      <main style={styles.main}>
        <div style={styles.content}>
          <h1 style={styles.title}>Alumni Tracer Form</h1>

          <p style={styles.bodyText}>
            All information provided by the respondents shall be kept strictly by DMPCS and its other trusted academic and non-academic personnel to optimize the line of approach.
          </p>
          <p style={styles.bodyText}>
            This form tries to record general information on curriculum methods used in upskilling from its structural educational framework, facilities, etc.
          </p>
          <p style={styles.noteText}>
            *This survey is around 10-15 minutes to finish.
          </p>

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