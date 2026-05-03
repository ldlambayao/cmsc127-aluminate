"use client";

import AlumniSidebar from "@/components/layout/sidebar/AlumniSidebar";
import Image from "next/image";

// --- Icons ---
const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#b0b0b0" }}>
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9b1d2a" strokeWidth="2">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </svg>
);

// --- Types ---
interface User {
  name: string;
  fullName: string;
  id: string;
  program: string;
  programFormStatus: string;
  tracerFormStatus: string;
}

// --- Component ---
export default function AlumniDashboard() {
  const user: User = {
    name: "Liarrah",
    fullName: "Liarrah Daniya E. Lambayao",
    id: "2024-04565",
    program: "BS Computer Science",
    programFormStatus: "Completed",
    tracerFormStatus: "Not Yet",
  };

  return (
    <div style={styles.shell}>
      <AlumniSidebar />

      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.welcomeTitle}>
            Welcome, <span style={styles.accent}>{user.name}</span> !
          </h1>
          <p style={styles.subtitle}>
            Illuminating Alumni Paths through Data, One at a Time
          </p>
        </header>

        {/* Info Cards */}
        <div style={styles.cardRow}>
          {/* User Info Card */}
          <div style={styles.card}>
            <div style={styles.cardInner}>
              <div style={styles.avatarCircle}>
                <UserIcon />
              </div>
              <div>
                <p style={styles.cardName}>{user.fullName}</p>
                <p style={styles.cardId}>{user.id}</p>
                <span style={styles.badge}>{user.program}</span>
              </div>
            </div>
          </div>

          {/* Program Satisfaction Form Status Card */}
          <div style={{ ...styles.card, ...styles.cardActive }}>
            <div style={styles.cardInner}>
              <div style={styles.clipboardWrapActive}>
                <ClipboardIcon />
              </div>
              <div>
                <p style={{ ...styles.cardName, color: "#9b1d2a" }}>Program Satisfaction Form Status</p>
                <p style={styles.surveyQuestion}>Answered the Satisfaction Form?</p>
                <span style={styles.statusBadgeCompleted}>{user.programFormStatus}</span>
              </div>
            </div>
          </div>

          {/* Alumni Tracer Form Status Card */}
          <div style={styles.card}>
            <div style={styles.cardInner}>
              <div style={styles.clipboardWrap}>
                <ClipboardIcon />
              </div>
              <div>
                <p style={styles.cardName}>Alumni Tracer Form Status</p>
                <p style={styles.surveyQuestion}>Answered the Alumni Tracer Form?</p>
                <span style={styles.statusBadgeNotYet}>{user.tracerFormStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div style={styles.aboutCard}>
          <div style={styles.aboutContent}>
            <p style={styles.aboutLabel}>about us</p>
            <h2 style={styles.aboutTitle}>Aluminate</h2>
            <p style={styles.aboutSubLabel}>aluminate</p>
            <p style={styles.aboutText}>
              Shedding light on the journeys of DMPCS alumni by systematically
              collecting and analyzing data about their current professional and
              academic status. Through this, the system aims to highlight the
              real-world outcomes of graduates and provide valuable insights into
              how the department&apos;s programs have shaped their career paths.
              The system shall also be a medium for graduates to provide
              suggestions for the continuous improvement of DMPCS academic
              programs and their respective curricula.
            </p>
          </div>
          <div style={styles.aboutLogoWrap}>
            <div style={styles.aboutLogo}>
              <Image src="/aluminate logo.png" alt="Aluminate Logo" width={400} height={400} />
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div style={styles.stepsCard}>
          <p style={styles.stepsLabel}>steps</p>
          <ol style={styles.stepsList}>
            <li style={styles.stepsItem}>
              Before graduation, student shall answer the{" "}
              <strong>Program Satisfaction Form</strong> as part of the
              requirements before graduation.
            </li>
            <li style={styles.stepsItem}>
              Two years after graduation, the alumni shall once again revisit
              the system to answer the <strong>Alumni Tracer Form</strong>.
            </li>
          </ol>
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
    backgroundColor: "#f0f0f0",
    fontFamily: "'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    padding: "40px 48px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: { marginBottom: "4px" },
  welcomeTitle: { fontSize: "32px", fontWeight: "700", color: "#1a1a2e", margin: 0 },
  accent: { color: "#9b1d2a" },
  subtitle: { fontSize: "13px", color: "#888", margin: "6px 0 0" },
  cardRow: { display: "flex", gap: "20px" },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px 24px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  },
  cardActive: { backgroundColor: "#fce8ea" },
  cardInner: { display: "flex", alignItems: "flex-start", gap: "16px" },
  avatarCircle: {
    width: "44px", height: "44px", borderRadius: "50%",
    backgroundColor: "#f0f0f0", display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  clipboardWrap: {
    width: "44px", height: "44px", borderRadius: "10px",
    backgroundColor: "#fce8ea", display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  clipboardWrapActive: {
    width: "44px", height: "44px", borderRadius: "10px",
    backgroundColor: "#f4c0c6", display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  cardName: { fontWeight: "600", fontSize: "13px", color: "#444", margin: "0 0 4px" },
  cardId: { fontWeight: "700", fontSize: "22px", color: "#1a1a2e", margin: "0 0 8px", letterSpacing: "-0.5px" },
  badge: {
    display: "inline-block", backgroundColor: "#f4d0d4", color: "#9b1d2a",
    fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px",
  },
  surveyQuestion: { fontSize: "12px", color: "#888", margin: "0 0 8px" },
  statusBadgeCompleted: {
    display: "inline-block", backgroundColor: "#ffffff", color: "#555",
    fontSize: "12px", fontWeight: "600", padding: "4px 16px", borderRadius: "20px",
  },
  statusBadgeNotYet: {
    display: "inline-block", backgroundColor: "#fce8ea", color: "#9b1d2a",
    fontSize: "12px", fontWeight: "600", padding: "4px 16px", borderRadius: "20px",
  },
  aboutCard: {
    backgroundColor: "#ffffff", borderRadius: "12px", padding: "32px 36px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)", display: "flex", gap: "48px", alignItems: "center",
  },
  aboutContent: { flex: 1 },
  aboutLabel: {
    fontSize: "11px", color: "#aaa", letterSpacing: "0.5px", margin: "0 0 8px",
    border: "1px solid #ddd", display: "inline-block", padding: "2px 10px", borderRadius: "20px",
  },
  aboutTitle: { fontSize: "24px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 2px" },
  aboutSubLabel: { fontSize: "12px", color: "#bbb", margin: "0 0 14px" },
  aboutText: {
    fontSize: "12.5px", lineHeight: "1.75", color: "#555",
    margin: "0", maxWidth: "480px", textAlign: "justify",
  },
  aboutLogoWrap: { display: "flex", alignItems: "center", justifyContent: "center", minWidth: "160px" },
  aboutLogo: { display: "flex", alignItems: "center", gap: "10px" },
  stepsCard: {
    backgroundColor: "#ffffff", borderRadius: "12px", padding: "28px 36px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  },
  stepsLabel: {
    fontSize: "11px", color: "#aaa", letterSpacing: "0.5px", margin: "0 0 16px",
    border: "1px solid #ddd", display: "inline-block", padding: "2px 10px", borderRadius: "20px",
  },
  stepsList: { margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: "12px" },
  stepsItem: { fontSize: "13px", color: "#555", lineHeight: "1.6" },
};