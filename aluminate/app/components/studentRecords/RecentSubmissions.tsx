"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

interface Submission {
  studentId: string;
  name: string;
  submissionDate: string;
  formSubmitted: string;
}

export default function RecentSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Fetch recent satisfaction form submissions
        const { data: satRows } = await supabase
          .from("satisfaction_survey_answers")
          .select(`
            created_at,
            alumni!inner(
              student_number,
              users!inner(fname, mname, lname)
            )
          `)
          .order("created_at", { ascending: false })
          .limit(5);

        // Fetch recent tracer form submissions
        const { data: tracerRows } = await supabase
          .from("tracer_survey_answers")
          .select(`
            created_at,
            alumni!inner(
              student_number,
              users!inner(fname, mname, lname)
            )
          `)
          .order("created_at", { ascending: false })
          .limit(5);

        const format = (rows: any[], formName: string): Submission[] =>
          (rows ?? []).map((r: any) => {
            const u = r.alumni?.users;
            const fullName = `${u?.fname ?? ""} ${u?.mname ? u.mname.charAt(0) + ". " : ""}${u?.lname ?? ""}`.trim();
            return {
              studentId: r.alumni?.student_number ?? "—",
              name: fullName || "—",
              submissionDate: new Date(r.created_at).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric",
              }),
              formSubmitted: formName,
            };
          });

        const all = [
          ...format(satRows ?? [], "Program Satisfaction Form"),
          ...format(tracerRows ?? [], "Alumni Tracer Form"),
        ].sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()).slice(0, 5);

        setSubmissions(all);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubmissions();
  }, []);

  const pillColor = (form: string) =>
    form === "Program Satisfaction Form" ? styles.pillSatisfaction : styles.pillTracer;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Recent Submissions</h3>
        <button style={styles.viewAll}>View All</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            {["Student Id", "Name", "Submission Date", "Form Submitted"].map((col) => (
              <th key={col} style={styles.th}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ ...styles.td, color: "#aaa", textAlign: "center" }}>
                No submissions found
              </td>
            </tr>
          ) : (
            submissions.map((s, i) => (
              <tr key={i} style={i % 2 === 0 ? {} : { backgroundColor: "#fafafa" }}>
                <td style={styles.td}>{s.studentId}</td>
                <td style={styles.td}>{s.name}</td>
                <td style={styles.td}>{s.submissionDate}</td>
                <td style={styles.td}>
                  <span style={pillColor(s.formSubmitted)}>{s.formSubmitted}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px 28px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    border: "1px solid #f0e8e8",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#b82035",
    margin: 0,
  },
  viewAll: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    color: "#888",
    fontWeight: 500,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    fontSize: "11px",
    color: "#999",
    fontWeight: 600,
    textAlign: "left",
    paddingBottom: "10px",
    borderBottom: "1px solid #f0e8e8",
  },
  td: {
    fontSize: "13px",
    color: "#444",
    padding: "10px 0",
    borderBottom: "1px solid #f9f0f0",
  },
  pillSatisfaction: {
    display: "inline-block",
    backgroundColor: "#fce8ea",
    color: "#b82035",
    fontSize: "11px",
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: "20px",
  },
  pillTracer: {
    display: "inline-block",
    backgroundColor: "#D89A9A",
    color: "#7a1a25",
    fontSize: "11px",
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: "20px",
  },
};