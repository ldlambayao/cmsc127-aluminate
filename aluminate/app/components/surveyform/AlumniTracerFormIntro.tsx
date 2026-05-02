"use client";

interface AlumniTracerFormIntroProps {
  onProceed: () => void;
}

export default function AlumniTracerFormIntro({ onProceed }: AlumniTracerFormIntroProps) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.headerRow}>
          <div style={styles.iconWrap}>
            <SurveyPageIcon />
          </div>
          <div>
            <p style={styles.tagline}>alumni tracer</p>
            <h1 style={styles.title}>Alumni Tracer Form</h1>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Body text */}
        <p style={styles.bodyText}>
          This survey is being conducted to assess your current employment
          status and to track the professional development of the graduates of
          the Department. It also aims to provide data for the university&apos;s
          continuous improvement program by evaluating the relevance of the
          curriculum to the demands of the industry.
        </p>
        <p style={styles.bodyText}>
          The data obtained from this survey will be used solely for
          institutional purposes. All information provided will be kept strictly
          confidential and will only be accessed by authorized personnel of the
          Department.
        </p>

        {/* CTA */}
        <button style={styles.proceedBtn} onClick={onProceed}>
          Proceed to Survey &nbsp;
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

// --- Icons ---
const SurveyPageIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9b1d2a"
    strokeWidth="2"
  >
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </svg>
);

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
  wrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 48px",
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "40px 44px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    maxWidth: "640px",
    width: "100%",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  iconWrap: {
    width: "52px",
    height: "52px",
    borderRadius: "10px",
    backgroundColor: "#fce8ea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  tagline: {
    fontSize: "11px",
    color: "#aaa",
    letterSpacing: "0.5px",
    margin: "0 0 4px",
    border: "1px solid #ddd",
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "20px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: 0,
    letterSpacing: "-0.3px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#f0f0f0",
    marginBottom: "24px",
  },
  bodyText: {
    fontSize: "13px",
    lineHeight: "1.8",
    color: "#555",
    margin: "0 0 16px",
    textAlign: "justify" as const,
  },
  proceedBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#9b1d2a",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "10px 22px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  },
};