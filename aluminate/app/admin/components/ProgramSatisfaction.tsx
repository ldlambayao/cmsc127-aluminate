"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

// Labels correspond to the rating scale 1-5 for "Overall service delivery or supervision of the BSAM program"
const LABELS = ["1", "2", "3", "4", "5"];

export default function ProgramSatisfaction() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all satisfaction survey answers for the relevant question
        const { data: rows, error } = await supabase
          .from("ssatisfaction_survey_response")
          .select("answer")
          .eq("question_id", "overall_service_delivery"); // adjust column/value as needed

        if (error) throw error;

        // Tally counts per rating (1–5)
        const counts: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
        (rows ?? []).forEach((row: any) => {
          const val = String(row.answer);
          if (counts[val] !== undefined) counts[val]++;
        });

        setData(LABELS.map((label) => ({ name: label, value: counts[label] })));
      } catch (err) {
        console.error(err);
        // Fallback placeholder data
        setData(LABELS.map((label, i) => ({ name: label, value: [3, 5, 7, 4, 2][i] })));
      }
    };
    fetchData();
  }, []);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Program Satisfaction</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barCategoryGap="30%">
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#aaa" }} />
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
