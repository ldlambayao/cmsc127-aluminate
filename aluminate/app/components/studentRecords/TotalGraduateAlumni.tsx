"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

const TrendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b82035" strokeWidth="2">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export default function TotalGraduateAlumni() {
  const [graduates, setGraduates] = useState<number | null>(null);
  const [alumni, setAlumni] = useState<number | null>(null);
  const [department, setDepartment] = useState<string>("Department of Science and Mathematics");
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { count: gradCount } = await supabase
          .from("alumni")
          .select("*", { count: "exact", head: true });

        const currMonth = new Date().getMonth() + 1;
        const currYear = new Date().getFullYear();

        const { count: alumniCount } = await supabase
          .from("alumni")
          .select("*", { count: "exact", head: true })
          .lte("graduation_month", currMonth)
          .lte("graduation_year", currYear);

        setGraduates(gradCount ?? 0);
        setAlumni(alumniCount ?? 0);
      } catch (err) {
        console.error(err);
        setGraduates(0);
        setAlumni(0);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div style={styles.card}>
      <div style={styles.row}>
        <div style={styles.iconBox}>
          <TrendIcon />
        </div>
        <div style={styles.stats}>
          <div style={styles.statGroup}>
            <span style={styles.statLabel}>Graduates</span>
            <span style={styles.statValue}>{graduates ?? "—"}</span>
          </div>
          <div style={styles.statGroup}>
            <span style={styles.statLabel}>Alumni</span>
            <span style={styles.statValue}>{alumni ?? "—"}</span>
          </div>
        </div>
      </div>
      <span style={styles.pill}>{department}</span>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "20px 22px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    border: "1px solid #f0e8e8",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    flex: 1,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  iconBox: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#fce8ea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stats: {
    display: "flex",
    gap: "24px",
  },
  statGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  statLabel: {
    fontSize: "11px",
    color: "#888",
    fontWeight: 500,
  },
  statValue: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#1a1a2e",
    letterSpacing: "-0.5px",
  },
  pill: {
    display: "inline-block",
    backgroundColor: "#e29692",
    color: "#555",
    fontSize: "11px",
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: "20px",
    alignSelf: "flex-center",
  },
};
