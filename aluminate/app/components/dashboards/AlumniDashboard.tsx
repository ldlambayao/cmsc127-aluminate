"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AlumniSidebar from "@/components/layout/sidebar/AlumniSidebar";
import Image from "next/image";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

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

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);


// --- Types ---
interface User {
  name?: string;
  fullName?: string;
  id?: string;
  program?: string;
  surveyStatus?: string;
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
          .select(`fname, mname, lname, alumni!inner(student_number, survey_status, program!inner(program_name))`)
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
          surveyStatus: data.alumni?.survey_status ?? "",
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
      <AlumniSidebar activePage={activePage} setActivePage={handleSetActivePage} />

      {/* Main Content */}
      <main style={styles.main}>
        {loading ? (
          <p>Loading...</p>
        ) : fetchError ? (
          <p style={{ color: 'red' }}>{fetchError}</p>
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

              {/* Survey Status Card */}
              <div style={styles.card}>
                <div style={styles.cardInner}>
                  <div style={styles.clipboardWrap}>
                    <ClipboardIcon />
                  </div>
                  <div>
                    <p style={styles.cardName}>Survey Form Status</p>
                    <p style={styles.surveyQuestion}>
                      Answered the alumni tracer form?
                    </p>
                    <p style={styles.statusCompleted}>{user.surveyStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No user data found</p>
        )}

        {/* About Section */}
        {!loading && user && (
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
            <button style={styles.answerBtn} onClick={() => handleSetActivePage("tracer")}>
              answer now <ArrowIcon />
            </button>
          </div>

          {/* Logo */}
          <div style={styles.aboutLogoWrap}>
            <div style={styles.aboutLogo}>
                  <Image
                    src="/aluminate logo.png"
                    alt="Aluminate Logo"
                    width={400}
                    height={400}
                  />
            </div>
          </div>
        </div>
        )}
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
  header: {
    marginBottom: "4px",
  },
  welcomeTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: 0,
  },
  accent: {
    color: "#9b1d2a",
  },
  subtitle: {
    fontSize: "13px",
    color: "#888",
    margin: "6px 0 0",
  },
  cardRow: {
    display: "flex",
    gap: "20px",
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px 24px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  },
  cardInner: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  avatarCircle: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  clipboardWrap: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#fce8ea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardName: {
    fontWeight: "600",
    fontSize: "13px",
    color: "#444",
    margin: "0 0 4px",
  },
  cardId: {
    fontWeight: "700",
    fontSize: "22px",
    color: "#1a1a2e",
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#f4d0d4",
    color: "#9b1d2a",
    fontSize: "11px",
    fontWeight: "600",
    padding: "3px 10px",
    borderRadius: "20px",
  },
  surveyQuestion: {
    fontSize: "12px",
    color: "#888",
    margin: "0 0 8px",
  },
  statusCompleted: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#555",
    borderTop: "1px solid #eee",
    paddingTop: "8px",
    marginTop: "4px",
  },
  aboutCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "32px 36px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    display: "flex",
    gap: "48px",
    alignItems: "center",
  },
  aboutContent: {
    flex: 1,
  },
  aboutLabel: {
    fontSize: "11px",
    color: "#aaa",
    letterSpacing: "0.5px",
    margin: "0 0 8px",
    border: "1px solid #ddd",
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "20px",
  },
  aboutTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 2px",
  },
  aboutSubLabel: {
    fontSize: "12px",
    color: "#bbb",
    margin: "0 0 14px",
  },
  aboutText: {
    fontSize: "12.5px",
    lineHeight: "1.75",
    color: "#555",
    margin: "0 0 20px",
    maxWidth: "480px",
    textAlign: "justify",
  },
  answerBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#9b1d2a",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "10px 20px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  aboutLogoWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "160px",
  },
  aboutLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  aboutLogoText: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#9b1d2a",
    letterSpacing: "-0.5px",
  },
};
