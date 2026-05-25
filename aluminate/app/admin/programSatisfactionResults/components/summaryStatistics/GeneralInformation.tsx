"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

interface Props {
  program?: string;
}

const BAR_COLOR = "#D89A9A";

export default function GeneralInformation({ program }: Props) {
  const supabase = getSupabaseBrowserClient();
  const [p1q1Data, setP1q1Data] = useState<{ rating: string; "Count": number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("satisfaction_survey_response")
          .select("q1");

        if (error) throw error;

        const q1Counts: Record<string, number> = {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0
        };

        if (data) {
          data.forEach((row: any) => {
            const value = String(row.q1);
            if (value in q1Counts) {
              q1Counts[value]++;
            }
          });
        }

        const formattedData = Object.keys(q1Counts).map((key) => ({
          rating: key,
          "Count": q1Counts[key],
        }));

        setP1q1Data(formattedData);
      } catch (err) {
        console.error("Error fetching survey metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [program, supabase]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 text-sm">Loading charts...</div>;
  }

  return (
    <section className="flex flex-col gap-4">
      {/* Section heading */}
      <h2 className="text-lg font-bold text-red-900 m-0 border-b-2 border-gray-200 pb-2.5">General Information</h2>

      {/* Card */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <p className="text-xs font-semibold text-gray-800 mb-4">
          Overall service delivery or supervision of the BSAM program:
        </p>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={p1q1Data}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            barCategoryGap="30%"
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="rating"
              tick={{ fontSize: 12, fill: "#888" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#888" }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(216,154,154,0.10)" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #eee",
                fontSize: "13px",
              }}
              labelStyle={{ color: "#1a1a1a", fontWeight: 600, marginBottom: "4px" }}
              itemStyle={{ color: "#333" }}
            />
            <Legend
              iconType="square"
              iconSize={10}
              wrapperStyle={{ fontSize: "12px", color: "#555", paddingTop: "12px" }}
            />
            <Bar
              dataKey="Count"
              fill={BAR_COLOR}
              radius={[8, 8, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
