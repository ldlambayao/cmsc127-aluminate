"use client";

export const dynamic = "force-dynamic";

import { useState, useCallback } from "react";
import TotalGraduateAlumni from "@/components/studentRecords/TotalGraduateAlumni";
import SatisfactionSurveyParticipation from "@/components/studentRecords/SatisfactionSurveyParticipation";
import AlumniTracerParticipation from "@/components/studentRecords/AlumniTracerParticipation";
import RecordTable from "@/admin/studentRecords/components/RecordTable";

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

export default function StudentRecordsPage() {
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataChange = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>Graduate and Alumni Records</h1>
            <p style={styles.subtitle}>Illuminating Alumni Paths through Data, One at a Time</p>
          </div>
          <div style={styles.searchBox}>
            <SearchIcon />
            <input
              style={styles.searchInput}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsRow} key={refreshKey}>
          <TotalGraduateAlumni />
          <SatisfactionSurveyParticipation />
          <AlumniTracerParticipation />
        </div>

        {/* Record Table — toolbar and table are self-contained cards */}
        <RecordTable onDataChange={handleDataChange} searchQuery={search}/>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    flex: 1,
    backgroundColor: "#f4f5f7",
    overflowY: "auto",
    minHeight: "100vh",
  },
  topGradientOverlay: {},
  contentWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1a1a2e",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "12px",
    color: "#888",
    margin: "4px 0 0",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#fff",
    border: "1px solid #e8d8d8",
    borderRadius: "8px",
    padding: "8px 14px",
    minWidth: "200px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "13px",
    color: "#333",
    backgroundColor: "transparent",
    width: "100%",
  },
  statsRow: {
    display: "flex",
    gap: "16px",
  },

};
