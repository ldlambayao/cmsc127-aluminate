"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

const LABELS = ["Employed", "Self-employed", "Unemployed", "Further studies"];

export default function EmploymentStatus() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: rows, error } = await supabase
          .from("tracer_survey_response")
          .select("q02_current_employment_status");

        if (error) throw error;

        const rowData = rows as any;

        const counts: Record<string, number> = {
          "Employed": 0,
          "Self-employed": 0,
          "Unemployed": 0,
          "Further studies": 0,
        };

        (rowData ?? []).forEach((row: any) => {
          const val = String(row.q02_current_employment_status);
          if (val.includes("-employed")) {
            counts["Self-employed"]++;
          } else if (val.includes("Further")) {
            counts["Further studies"]++;
          } else if (val.includes("Unemployed")) {
            counts["Unemployed"]++;
          } else {
            counts["Employed"]++;
          }
        });

        setData(LABELS.map((label) => ({ name: label, value: counts[label] })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Employment Status</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barCategoryGap="30%">
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#aaa" }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#ccc" }} />
          <Tooltip
            cursor={{ fill: "rgba(184,32,53,0.05)" }}
            contentStyle={{ borderRadius: "8px", border: "1px solid #f0e8e8", fontSize: "12px" }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill="#E8A0A8" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px 24px 16px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    border: "1px solid #f0e8e8",
    flex: 1,
  },
  title: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#b82035",
    margin: "0 0 16px",
  },
};
