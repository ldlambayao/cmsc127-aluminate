"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AlumniSidebar from "@/components/layout/sidebar/AlumniSidebar";
import Image from "next/image";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

// --- Icons ---
const UserAvatarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#b82035" }}>
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const ClipboardIcon = ({ color = "#9b1d2a" }: { color?: string }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </svg>
);


// --- Types ---
interface User {
  name?: string;
  fullName?: string;
  id?: string;
  program?: string;
  satisfactionSurveyStatus?: string;
  tracerSurveyStatus?: string;
}

// --- Component ---
export default function AlumniDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState<User | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const sessionUser = sessionData.session?.user ?? null;
        if (!sessionUser) {
          setUser(null);
          setLoading(false);
          router.push("/login");
          return;
        }

        const result: any = await supabase
          .from("users")
          .select(`fname, mname, lname, alumni!inner(student_number, satisfaction_survey_status, tracer_survey_status, program!inner(program_name))`)
          .eq("uuid", sessionUser.id)
          .single();

        if (result.error) throw result.error;
        if (!result.data) {
          throw new Error("No profile data found");
        }

        const data = result.data;
        const fullname = `${data.fname} ${data.mname ? data.mname.charAt(0) + "." : ""} ${data.lname}`.trim();
        const userData: User = {
          name: data.fname,
          fullName: fullname,
          id: data.alumni?.student_number ?? "",
          program: data.alumni?.program?.program_name ?? "",
          satisfactionSurveyStatus: data.alumni?.satisfaction_survey_status ?? "Not yet answered",
          tracerSurveyStatus: data.alumni?.tracer_survey_status ?? "Not yet answered",
        };
        setUser(userData);
        setFetchError(null);
      } catch (error) {
        console.error(error);
        setFetchError("Could not load user data");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push("/login");
      } else {
        loadUser();
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  const handleSetActivePage = (page: string) => {
    setActivePage(page);
    if (page === "home") router.push("/alumni");
    if (page === "exit") router.push("/alumni/programSatisfactionForm");
    if (page === "tracer") router.push("/alumni/alumniTracerForm");
  };

  return (
    <div style={styles.shell}>
      {/* Sidebar */}
      <AlumniSidebar
        activePage={activePage}
        setActivePage={handleSetActivePage}
      />

      {/* Main Content */}
      <main style={styles.main}>
        {/* Top gradient overlay */}
        <div style={styles.topGradientOverlay} />

        <div style={styles.contentWrapper} className="dash-content-enter">
          {loading ? (
            <p style={styles.loadingText}>Loading...</p>
          ) : fetchError ? (
            <p style={styles.errorText}>{fetchError}</p>
          ) : user ? (
            <>
              {/* Header */}
              <header style={styles.header}>
                <h1 style={styles.welcomeTitle}>
                  Welcome, <span style={styles.accent}>{user.name}</span> !
                </h1>
                <p style={styles.subtitle}>
                  Illuminating Alumni Paths through Data, One at a Time
                </p>
              </header>

              {/* Top Dynamic Info Cards */}
              <div style={styles.topCardsContainer}>

                {/* Card 1: User Profile */}
                <div style={styles.profileCard} className="dash-card-enter">
                  <div style={styles.cardLayoutRow}>
                    <div style={styles.avatarBox}>
                      <UserAvatarIcon />
                    </div>
                    <div style={styles.cardContent}>
                      <p style={styles.cardSmallText}>{user.fullName}</p>
                      <p style={styles.cardLargeText}>{user.id}</p>
                      <span style={styles.pillWhite}>{user.program}</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Program Satisfaction */}
                <div style={styles.programCard} className="dash-card-enter">
                  <div style={styles.cardIconRow}>
                    <div style={styles.iconBoxWhite}>
                      <ClipboardIcon color="#d15a6b" />
                    </div>
                    <p style={styles.cardTitleBold}>Program Satisfaction Form Status</p>
                  </div>
                  <p style={styles.cardSubtitleDark}>Answered the Satisfaction Form?</p>
                  <div style={styles.pillWrapper}>
                    <span style={styles.pillWhiteWide}>{user.satisfactionSurveyStatus}</span>
                  </div>
                </div>

                {/* Card 3: Alumni Tracer */}
                <div style={styles.tracerCard} className="dash-card-enter">
                  <div style={styles.cardIconRow}>
                    <div style={styles.iconBoxWhite}>
                      <ClipboardIcon color="#d15a6b" />
                    </div>
                    <p style={styles.cardTitleBold}>Alumni Tracer Form Status</p>
                  </div>
                  <p style={styles.cardSubtitleLight}>Answered the Alumni Tracer Form?</p>
                  <div style={styles.pillWrapper}>
                    <span style={styles.pillPinkWide}>{user.tracerSurveyStatus}</span>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <p>No user data found</p>
          )}

          {/* About Us Section */}
          <div style={styles.whiteCardBlock}>
            <div style={styles.aboutFlexRow}>
              <div style={styles.aboutTextSection}>
                <span style={styles.outlinePill}>About Us</span>
                <h2 style={styles.aboutTitle}>Aluminate</h2>
                <p style={styles.aboutSubLabel}>aluminate</p>
                <p style={styles.aboutDescription}>
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

              {/* Vertical Divider */}
              <div style={styles.verticalDivider} />

              <div style={styles.aboutLogoSection}>
                <Image
                  src="/aluminate logo.png"
                  alt="Aluminate Logo"
                  width={240}
                  height={80}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div style={styles.whiteCardBlock}>
            <span style={styles.outlinePill}>Steps</span>
            <ol style={styles.stepsList}>
              <li style={styles.stepItem}>
                Before graduation, student shall answer the{" "}
                <strong>Program Satisfaction Form</strong> as part of the
                requirements before graduation.
              </li>
              <li style={styles.stepItem}>
                Two years after graduation, the alumni shall once again revisit
                the system to answer the <strong>Alumni Tracer Form</strong>.
              </li>
            </ol>
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
    backgroundColor: "#f4f5f7",
  },
  main: {
    flex: 1,
    backgroundColor: "#f4f5f7",
    position: "relative",
    overflowY: "auto",
  },
  topGradientOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, height: "360px",
    background: "linear-gradient(180deg, #E8C4C4 0%, rgba(244,245,247,0) 100%)",
    zIndex: 0,
    pointerEvents: "none",
  },
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "60px 48px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  loadingText: { color: "#666" },
  errorText: { color: "#d15a6b", fontWeight: "bold" },

  header: { marginBottom: "10px" },
  welcomeTitle: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#1a1a2e",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  accent: { color: "#b82035" },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    margin: "8px 0 0",
    fontWeight: "400",
  },

  topCardsContainer: { display: "flex", gap: "18px", width: "100%" },

  /* Card Layout Globals */
  cardLayoutRow: { display: "flex", alignItems: "flex-start", gap: "16px" },
  cardIconRow: { display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "8px" },
  cardContent: { display: "flex", flexDirection: "column", flex: 1 },

  /* Card 1: User Profile — #E8C4C4 */
  profileCard: {
    flex: 1,
    backgroundColor: "#E8C4C4",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  },
  avatarBox: {
    width: "48px", height: "48px", borderRadius: "10px",
    backgroundColor: "#ffffff",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  cardSmallText: {
    fontSize: "13px", color: "#333", margin: "0 0 4px", fontWeight: "500",
  },
  cardLargeText: {
    fontSize: "22px", color: "#111", margin: "0 0 12px",
    fontWeight: "800", letterSpacing: "-0.5px",
  },
  pillWhite: {
    display: "inline-block", backgroundColor: "#ffffff", color: "#b82035",
    alignSelf: "flex-start", fontSize: "12px", fontWeight: "600",
    padding: "4px 14px", borderRadius: "20px",
  },

  /* Card 2: Program Satisfaction — #D89A9A */
  programCard: {
    flex: 1,
    backgroundColor: "#D89A9A",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitleBold: {
    fontSize: "14px", color: "#111", margin: "0 0 6px", fontWeight: "700",
  },
  cardSubtitleDark: { fontSize: "12px", color: "#3a3a3a", margin: "0" },
  pillWrapper: { display: "flex", width: "100%" },
  pillWhiteWide: {
    display: "inline-block", backgroundColor: "#ffffff", color: "#333",
    width: "100%", textAlign: "center",
    fontSize: "13px", fontWeight: "600", padding: "6px 0", borderRadius: "20px",
  },

  /* Card 3: Alumni Tracer — #F8EDED */
  tracerCard: {
    flex: 1,
    backgroundColor: "#F8EDED",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
    border: "1px solid rgba(216, 154, 154, 0.25)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardSubtitleLight: { fontSize: "12px", color: "#777", margin: "0" },
  pillPinkWide: {
    display: "inline-block", backgroundColor: "#E8C4C4", color: "#333",
    width: "100%", textAlign: "center",
    fontSize: "13px", fontWeight: "600", padding: "6px 0", borderRadius: "20px",
  },

  iconBoxWhite: {
    width: "44px", height: "44px", borderRadius: "10px",
    backgroundColor: "#ffffff",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  },

  /* White Card Sections */
  whiteCardBlock: {
    backgroundColor: "#ffffff", borderRadius: "16px", padding: "36px 40px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
  },

  aboutFlexRow: { display: "flex", gap: "40px", alignItems: "center" },
  aboutTextSection: { flex: 3 },
  verticalDivider: {
    width: "1px", alignSelf: "stretch", backgroundColor: "#eaeaea", flexShrink: 0,
  },
  aboutLogoSection: {
    flex: 1, display: "flex", justifyContent: "center", alignItems: "center",
  },

  outlinePill: {
    fontSize: "12px", color: "#555", letterSpacing: "0.3px", marginBottom: "14px",
    border: "1px solid #ccc", display: "inline-block",
    padding: "3px 14px", borderRadius: "20px",
  },
  aboutTitle: {
    fontSize: "24px", fontWeight: "800", color: "#111", margin: "0 0 2px",
  },
  aboutSubLabel: { fontSize: "12px", color: "#aaa", fontStyle: "italic", margin: "0 0 14px" },
  aboutDescription: {
    fontSize: "14px", lineHeight: "1.75", color: "#555",
    margin: "0", textAlign: "justify",
  },

  stepsList: {
    margin: "12px 0 0 0", padding: "0 0 0 24px",
    display: "flex", flexDirection: "column", gap: "16px",
  },
  stepItem: { fontSize: "14px", color: "#444", lineHeight: "1.65" },
};