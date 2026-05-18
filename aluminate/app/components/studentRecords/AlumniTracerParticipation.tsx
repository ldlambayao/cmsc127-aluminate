"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#6A222B" />
    <path 
      d="M8 12.5L10.8 15.5L16 9" 
      stroke="#ffffff" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

export default function AlumniTracerParticipation() {
  const [rate, setRate] = useState<number | null>(null);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const { count: total } = await supabase
          .from("alumni")
          .select("*", { count: "exact", head: true });

        const { count: answered } = await supabase
          .from("alumni")
          .select("*", { count: "exact", head: true })
          .eq("tracer_survey_status", "Answered");

        if (total && total > 0) {
          setRate(Math.round(((answered ?? 0) / total) * 100));
        } else {
          setRate(0);
        }
      } catch (err) {
        console.error(err);
        setRate(0);
      }
    };
    fetchRate();
  }, []);

  return (
    <div style={styles.card}>
      <div style={styles.row}>
        <div style={styles.iconBox}>
          <CheckIcon />
        </div>
        <div style={styles.content}>
          <span style={styles.label}>Participate Rate</span>
          <div style={styles.rateRow}>
            <span style={styles.rateValue}>{rate !== null ? `${rate}%` : "—"}</span>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${rate ?? 0}%` }} />
            </div>
          </div>
        </div>
      </div>
      <span style={styles.pill}>Alumni Tracer Form</span>
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
    gap: "14px",
  },
  iconBox: {
    width: "46px",
    height: "46px",
    borderRadius: "12px",
    backgroundColor: "#FCEAEF", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },
  label: {
    fontSize: "12px",
    color: "#555",
    fontWeight: 500,
  },
  rateRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  rateValue: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#1a1a2e",
    letterSpacing: "-0.5px",
    minWidth: "56px",
  },
  progressBar: {
    flex: 1,
    height: "8px",
    backgroundColor: "#f0e8e8",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#b82035",
    borderRadius: "4px",
    transition: "width 0.5s ease",
  },
  pill: {
    display: "inline-block",
    border: "1px solid #ddd",
    color: "#555",
    fontSize: "11px",
    fontWeight: 500,
    padding: "4px 14px",
    borderRadius: "20px",
    alignSelf: "flex-center",
  },
};