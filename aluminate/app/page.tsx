"use client";

import AlumniSidebar from "@/components/layout/sidebar/AlumniSidebar";
import Image from "next/image";

// --- Icons ---
const UserIcon = ({ color = "#9b1d2a" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const ClipboardIcon = ({ color = "#9b1d2a" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
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
          <div style={styles.card1}>
            <div style={styles.cardInner}>
              <div style={styles.iconWrapWhite}>
                <UserIcon />
              </div>
              <div>
                <p style={styles.cardName}>{user.fullName}</p>
                <p style={styles.cardId}>{user.id}</p>
                <span style={styles.badgeWhite}>{user.program}</span>
              </div>
            </div>
          </div>

          {/* Program Satisfaction Form Status Card */}
          <div style={styles.card2}>
            <div style={styles.cardInner}>
              <div style={styles.iconWrapPale}>
                <ClipboardIcon />
              </div>
              <div>
                <p style={styles.cardNameDark}>Program Satisfaction Form Status</p>
                <p style={styles.surveyQuestionDark}>Answered the Satisfaction Form?</p>
                <span style={styles.badgeWhiteCompleted}>{user.programFormStatus}</span>
              </div>
            </div>
          </div>

          {/* Alumni Tracer Form Status Card */}
          <div style={styles.card3}>
            <div style={styles.cardInner}>
              <div style={styles.iconWrapWhite}>
                <ClipboardIcon />
              </div>
              <div>
                <p style={styles.cardName}>Alumni Tracer Form Status</p>
                <p style={styles.surveyQuestion}>Answered the Alumni Tracer Form?</p>
                <span style={styles.badgePink}>{user.tracerFormStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div style={styles.aboutCard}>
          <div style={styles.aboutContent}>
            <p style={styles.sectionLabel}>about us</p>
            <h2 style={styles.aboutTitle}>Aluminate</h2>
            <p style={styles.aboutSubLabel}>Aluminate</p>
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
              <Image src="/aluminate logo.png" alt="Aluminate Logo" width={220} height={70} style={{ objectFit: "contain" }} />
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div style={styles.stepsCard}>
          <p style={styles.sectionLabel}>steps</p>
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
    backgroundColor: "#f5f6f8",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    padding: "48px 56px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    // Matches the top pink gradient fading into the page background
    background: "linear-gradient(to bottom, #fce0e3 0%, #f5f6f8 350px)",
  },
  header: { marginBottom: "8px" },
  welcomeTitle: { fontSize: "32px", fontWeight: "700", color: "#1a1a2e", margin: 0, letterSpacing: "-0.5px" },
  accent: { color: "#c1272d" }, // Matches the deep red accent
  subtitle: { fontSize: "14px", color: "#666", margin: "8px 0 0", fontWeight: "500" },
  
  cardRow: { display: "flex", gap: "20px" },
  
  // Card 1: User Info (Pink)
  card1: {
    flex: 1,
    backgroundColor: "#f6cdd2", 
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  },
  // Card 2: Satisfaction Form (Darker Pink)
  card2: {
    flex: 1,
    backgroundColor: "#df838f",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  },
  // Card 3: Tracer Form (Very Pale Pink/White)
  card3: {
    flex: 1,
    backgroundColor: "#fcf0f2",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  },

  cardInner: { display: "flex", alignItems: "flex-start", gap: "16px" },
  
  iconWrapWhite: {
    width: "48px", height: "48px", borderRadius: "12px",
    backgroundColor: "#ffffff", display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  iconWrapPale: {
    width: "48px", height: "48px", borderRadius: "12px",
    backgroundColor: "#fce8ea", display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },

  cardName: { fontWeight: "700", fontSize: "14px", color: "#333", margin: "0 0 6px" },
  cardNameDark: { fontWeight: "700", fontSize: "14px", color: "#5a1018", margin: "0 0 6px" },
  cardId: { fontWeight: "800", fontSize: "22px", color: "#1a1a2e", margin: "0 0 12px", letterSpacing: "-0.5px" },
  
  surveyQuestion: { fontSize: "13px", color: "#666", margin: "0 0 12px", fontWeight: "500" },
  surveyQuestionDark: { fontSize: "13px", color: "#7a1e28", margin: "0 0 12px", fontWeight: "500" },

  badgeWhite: {
    display: "inline-block", backgroundColor: "#ffffff", color: "#b8202d",
    fontSize: "12px", fontWeight: "700", padding: "6px 14px", borderRadius: "20px",
  },
  badgeWhiteCompleted: {
    display: "inline-block", backgroundColor: "#ffffff", color: "#b8202d",
    fontSize: "12px", fontWeight: "700", padding: "6px 24px", borderRadius: "20px",
  },
  badgePink: {
    display: "inline-block", backgroundColor: "#f5c5ca", color: "#b8202d",
    fontSize: "12px", fontWeight: "700", padding: "6px 24px", borderRadius: "20px",
  },

  aboutCard: {
    backgroundColor: "#ffffff", borderRadius: "14px", padding: "36px 40px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)", display: "flex", gap: "40px", alignItems: "stretch",
  },
  aboutContent: { 
    flex: 1, 
    borderRight: "1px solid #eee", // Divider line matching the image
    paddingRight: "40px" 
  },
  sectionLabel: {
    fontSize: "12px", color: "#888", letterSpacing: "0.5px", margin: "0 0 16px",
    border: "1px solid #eaeaea", display: "inline-block", padding: "4px 12px", borderRadius: "20px",
    textTransform: "lowercase", backgroundColor: "#fcfcfc"
  },
  aboutTitle: { fontSize: "22px", fontWeight: "800", color: "#1a1a2e", margin: "0 0 4px" },
  aboutSubLabel: { fontSize: "13px", color: "#999", margin: "0 0 16px", fontWeight: "500" },
  aboutText: {
    fontSize: "14px", lineHeight: "1.8", color: "#555",
    margin: "0", textAlign: "justify",
  },
  aboutLogoWrap: { 
    display: "flex", alignItems: "center", justifyContent: "center", 
    minWidth: "220px", paddingLeft: "10px" 
  },
  aboutLogo: { display: "flex", alignItems: "center", justifyContent: "center" },
  
  stepsCard: {
    backgroundColor: "#ffffff", borderRadius: "14px", padding: "36px 40px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
  },
  stepsList: { margin: 0, padding: "0 0 0 24px", display: "flex", flexDirection: "column", gap: "16px" },
  stepsItem: { fontSize: "14px", color: "#555", lineHeight: "1.7" },
};