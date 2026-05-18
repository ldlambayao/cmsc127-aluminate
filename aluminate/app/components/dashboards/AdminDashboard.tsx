"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TotalGraduateAlumni from "@/components/studentRecords/TotalGraduateAlumni";
import SatisfactionSurveyParticipation from "@/components/studentRecords/SatisfactionSurveyParticipation";
import AlumniTracerParticipation from "@/components/studentRecords/AlumniTracerParticipation";
import ProgramSatisfaction from "@/admin/components/ProgramSatisfaction";
import EmploymentStatus from "@/admin/components/EmploymentStatus";
import RecentSubmissions from "@/components/studentRecords/RecentSubmissions";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

interface AdminUser {
  name?: string;
  role?: string;
}

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState<AdminUser | null>(null);
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
          router.push("/login");
          return;
        }

        const roleCheck: any = await supabase
          .from("users")
          .select("fname, lname")
          .eq("uuid", sessionUser.id)
          .eq("role", 2)
          .single()

        if (!roleCheck.success) {
          router.push("/login");
        }

        setUser({
          name: (roleCheck as any)?.fname ?? "Admin",
          role: (roleCheck as any)?.role ?? "Department Chair",
        });
      } catch (err) {
        console.error(err);
        setUser({ name: "Department Chair" });
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) router.push("/login");
    });

    return () => listener?.subscription.unsubscribe();
  }, [router]);

  const handleSetActivePage = (page: string) => {
    setActivePage(page);
    if (page === "home") router.push("/admin");
    if (page === "records") router.push("/admin/studentRecords");
    if (page === "satisfaction") router.push("/admin/programSatisfactionResults");
    if (page === "tracer") router.push("/admin/alumniTracerResults");
  };

  return (
    <main style={styles.main}>
        <div style={styles.topGradientOverlay} />

        <div style={styles.contentWrapper}>
          {loading ? (
            <p style={styles.loadingText}>Loading...</p>
          ) : (
            <>
              {/* Header */}
              <header style={styles.header}>
                <h1 style={styles.welcomeTitle}>
                  Welcome back, <span style={styles.accent}>{user?.name ?? "Department Chair"}</span>
                </h1>
                <p style={styles.subtitle}>
                  Illuminating Alumni Paths through Data, One at a Time
                </p>
              </header>

              {/* Top Stats Cards */}
              <div style={styles.topCardsRow}>
                <TotalGraduateAlumni />
                <SatisfactionSurveyParticipation />
                <AlumniTracerParticipation />
              </div>

              {/* Charts Row */}
              <div style={styles.chartsRow}>
                <ProgramSatisfaction />
                <EmploymentStatus />
              </div>

              {/* Recent Submissions */}
              <RecentSubmissions />
            </>
          )}
        </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    flex: 1,
    backgroundColor: "#f4f5f7",
    position: "relative",
    overflowY: "auto",
  },
  topGradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "320px",
    background: "linear-gradient(180deg, #E8C4C4 0%, rgba(244,245,247,0) 100%)",
    zIndex: 0,
    pointerEvents: "none",
  },
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  loadingText: {
    color: "#888",
    fontSize: "14px",
  },
  header: {
    marginBottom: "8px",
  },
  welcomeTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1a1a2e",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  accent: {
    color: "#b82035",
  },
  subtitle: {
    fontSize: "13px",
    color: "#888",
    margin: "6px 0 0",
    fontWeight: 400,
  },
  topCardsRow: {
    display: "flex",
    gap: "16px",
    width: "100%",
  },
  chartsRow: {
    display: "flex",
    gap: "16px",
    width: "100%",
  },
};
