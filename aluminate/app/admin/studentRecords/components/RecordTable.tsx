"use client";

import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import AddRecordModal from "@/admin/studentRecords/modals/addRecordModal";
import EditRecordModal from "@/admin/studentRecords/modals/editRecordModal";
import DeleteRecordModal from "@/admin/studentRecords/modals/deleteRecordModal";

export interface AlumniRecord {
  id: string;
  student_number: string;
  fname: string;
  mname?: string;
  lname: string;
  program_name: string;
  graduation_year: string;
  satisfaction_survey_status: string;
  tracer_survey_status: string;
}

interface RecordTableProps {
  onDataChange?: () => void;
}

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const PROGRAM_COLORS: Record<string, string> = {
  "BS Computer Science":    "#d4727e",
  "BS Applied Mathematics": "#c97a85",
  "BS Data Science":        "#bf6e79",
};
const defaultProgramColor = "#cc7080";

// ── Dummy data matching the screenshot ──────────────────────────────────────
const DUMMY_RECORDS: AlumniRecord[] = [
  {
    id: "1",
    student_number: "2024-04565",
    fname: "Liarrah", mname: "Daniya", lname: "Lambayao",
    program_name: "BS Computer Science",
    graduation_year: "2028",
    satisfaction_survey_status: "Completed",
    tracer_survey_status: "Not Yet",
  },
  {
    id: "2",
    student_number: "2024-04565",
    fname: "Liarrah", mname: "Daniya", lname: "Lambayao",
    program_name: "BS Applied Mathematics",
    graduation_year: "2028",
    satisfaction_survey_status: "Completed",
    tracer_survey_status: "Not Yet",
  },
  {
    id: "3",
    student_number: "2024-04565",
    fname: "Liarrah", mname: "Daniya", lname: "Lambayao",
    program_name: "BS Data Science",
    graduation_year: "2028",
    satisfaction_survey_status: "Completed",
    tracer_survey_status: "Not Yet",
  },
  {
    id: "4",
    student_number: "2024-04565",
    fname: "Liarrah", mname: "Daniya", lname: "Lambayao",
    program_name: "BS Computer Science",
    graduation_year: "2028",
    satisfaction_survey_status: "Completed",
    tracer_survey_status: "Not Yet",
  },
  {
    id: "5",
    student_number: "2024-04565",
    fname: "Liarrah", mname: "Daniya", lname: "Lambayao",
    program_name: "BS Computer Science",
    graduation_year: "2028",
    satisfaction_survey_status: "Completed",
    tracer_survey_status: "Not Yet",
  },
  {
    id: "6",
    student_number: "2024-04565",
    fname: "Liarrah", mname: "Daniya", lname: "Lambayao",
    program_name: "BS Computer Science",
    graduation_year: "2028",
    satisfaction_survey_status: "Completed",
    tracer_survey_status: "Not Yet",
  },
  {
    id: "7",
    student_number: "2024-04565",
    fname: "Liarrah", mname: "Daniya", lname: "Lambayao",
    program_name: "BS Computer Science",
    graduation_year: "2028",
    satisfaction_survey_status: "Completed",
    tracer_survey_status: "Not Yet",
  },
  {
    id: "8",
    student_number: "2024-04565",
    fname: "Liarrah", mname: "Daniya", lname: "Lambayao",
    program_name: "BS Computer Science",
    graduation_year: "2028",
    satisfaction_survey_status: "Completed",
    tracer_survey_status: "Not Yet",
  },
  {
    id: "9",
    student_number: "2024-04565",
    fname: "Liarrah", mname: "Daniya", lname: "Lambayao",
    program_name: "BS Computer Science",
    graduation_year: "2028",
    satisfaction_survey_status: "Completed",
    tracer_survey_status: "Not Yet",
  },
];
// ────────────────────────────────────────────────────────────────────────────

export default function RecordTable({ onDataChange }: RecordTableProps) {
  const [records, setRecords] = useState<AlumniRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [programs, setPrograms] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AlumniRecord | null>(null);

  // Keep the Supabase client instantiated — swap dummy load for real query when ready
  const supabase = getSupabaseBrowserClient();

  const fetchRecords = async () => {
    setLoading(true);
    try {
      // ── Dummy data load (replace with Supabase query when ready) ────────
      const mapped: AlumniRecord[] = DUMMY_RECORDS;
      // ────────────────────────────────────────────────────────────────────

      setRecords(mapped);
      setPrograms([...new Set(mapped.map((r) => r.program_name))].filter(Boolean));
      setYears([...new Set(mapped.map((r) => r.graduation_year))].filter(Boolean).sort());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecords(); }, []);

  const handleRefresh = () => {
    fetchRecords();
    onDataChange?.();
  };

  const filtered = records.filter((r) => {
    const matchYear    = !filterYear    || r.graduation_year === filterYear;
    const matchProgram = !filterProgram || r.program_name    === filterProgram;
    return matchYear && matchProgram;
  });

  const isCompleted = (status: string) =>
    status?.toLowerCase() === "answered" || status?.toLowerCase() === "completed";

  return (
    <>
      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div style={styles.toolbar}>
          <div style={styles.toolbarLeft}>
            <div style={styles.selectWrapper}>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                style={styles.select}
              >
                <option value="">Filter by Graduation Year</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <span style={styles.chevron}>▾</span>
            </div>

            <div style={styles.selectWrapper}>
              <select
                value={filterProgram}
                onChange={(e) => setFilterProgram(e.target.value)}
                style={styles.select}
              >
                <option value="">Program</option>
                {programs.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <span style={styles.chevron}>▾</span>
            </div>
          </div>

          <button onClick={() => setShowAdd(true)} style={styles.addBtn}>
            Add Student
          </button>
      </div>

      {/* ── Table Card ───────────────────────────────────────────────────── */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              {[
                "Student Id",
                "Name",
                "Program",
                "Graduation Year",
                "Program Satisfaction Form Status",
                "Alumni Tracer Form Status",
                "Actions",
              ].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={styles.emptyCell}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} style={styles.emptyCell}>No records found</td></tr>
            ) : (
              filtered.map((rec, i) => {
                const fullName     = `${rec.fname}${rec.mname ? " " + rec.mname : ""} ${rec.lname}`.trim();
                const programColor = PROGRAM_COLORS[rec.program_name] ?? defaultProgramColor;
                const satDone      = isCompleted(rec.satisfaction_survey_status);
                const tracerDone   = isCompleted(rec.tracer_survey_status);

                return (
                  <tr key={rec.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.td}>
                      <span style={styles.studentId}>{rec.student_number}</span>
                    </td>

                    <td style={styles.td}>
                      <span style={styles.name}>{fullName}</span>
                    </td>

                    <td style={styles.td}>
                      <span style={{ ...styles.programPill, backgroundColor: programColor }}>
                        {rec.program_name}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <span style={styles.yearBadge}>{rec.graduation_year}</span>
                    </td>

                    <td style={styles.tdCenter}>
                      <span style={{ ...styles.statusPill, backgroundColor: satDone ? "#2e7d4f" : "#c0392b" }}>
                        {satDone ? "Completed" : "Not Yet"}
                      </span>
                    </td>

                    <td style={styles.tdCenter}>
                      <span style={{ ...styles.statusPill, backgroundColor: tracerDone ? "#2e7d4f" : "#c0392b" }}>
                        {tracerDone ? "Completed" : "Not Yet"}
                      </span>
                    </td>

                    <td style={styles.tdCenter}>
                      <div style={styles.actions}>
                        <button
                          style={styles.iconBtn}
                          onClick={() => { setSelectedRecord(rec); setShowDelete(true); }}
                          title="Delete"
                        >
                          <DeleteIcon />
                        </button>
                        <button
                          style={styles.iconBtn}
                          onClick={() => { setSelectedRecord(rec); setShowEdit(true); }}
                          title="Edit"
                        >
                          <EditIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Modals ───────────────────────────────────────────────────────── */}
      {showAdd && (
        <AddRecordModal
          onClose={() => setShowAdd(false)}
          onSuccess={handleRefresh}
          programs={programs}
        />
      )}
      {showEdit && selectedRecord && (
        <EditRecordModal
          record={selectedRecord}
          onClose={() => { setShowEdit(false); setSelectedRecord(null); }}
          onSuccess={handleRefresh}
          programs={programs}
        />
      )}
      {showDelete && selectedRecord && (
        <DeleteRecordModal
          record={selectedRecord}
          onClose={() => { setShowDelete(false); setSelectedRecord(null); }}
          onSuccess={handleRefresh}
        />
      )}
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  // ── Cards ──────────────────────────────────────────────────────────────
  tableCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "24px 28px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    border: "1px solid #f0e8e8",
  },

  // ── Toolbar ────────────────────────────────────────────────────────────
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toolbarLeft: {
    display: "flex",
    gap: "10px",
  },
  selectWrapper: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
  },
  select: {
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    padding: "7px 36px 7px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "12px",
    color: "#444",
    backgroundColor: "#fff",
    cursor: "pointer",
    outline: "none",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  chevron: {
    position: "absolute",
    right: "12px",
    fontSize: "11px",
    color: "#888",
    pointerEvents: "none",
  },
  addBtn: {
    padding: "7px 20px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#333",
    cursor: "pointer",
    fontWeight: 500,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },

  // ── Table ──────────────────────────────────────────────────────────────
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    fontSize: "12px",
    color: "#888",
    fontWeight: 500,
    textAlign: "left" as const,
    padding: "0 14px 14px",
    borderBottom: "1px solid #f0eaea",
    whiteSpace: "nowrap" as const,
  },
  trEven: { backgroundColor: "#ffffff" },
  trOdd:  { backgroundColor: "#fdfafa" },
  td: {
    padding: "14px 14px",
    fontSize: "13px",
    color: "#333",
    verticalAlign: "middle" as const,
    borderBottom: "1px solid #f5eded",
  },
  tdCenter: {
    padding: "14px 14px",
    fontSize: "13px",
    verticalAlign: "middle" as const,
    textAlign: "center" as const,
    borderBottom: "1px solid #f5eded",
  },
  emptyCell: {
    padding: "32px",
    textAlign: "center" as const,
    color: "#bbb",
    fontSize: "13px",
  },

  // ── Cell styles ────────────────────────────────────────────────────────
  studentId: {
    fontWeight: 700,
    fontSize: "13px",
    color: "#222",
  },
  name: {
    fontSize: "13px",
    color: "#444",
  },
  programPill: {
    display: "inline-block",
    color: "#fff",
    fontSize: "11px",
    fontWeight: 600,
    padding: "2px 10px",
    borderRadius: "20px",
    whiteSpace: "nowrap" as const,
  },
  yearBadge: {
    display: "inline-block",
    backgroundColor: "#5a1a22",
    color: "#fff",
    fontSize: "11px",
    fontWeight: 700,
    padding: "2px 10px",
    borderRadius: "20px",
  },
  statusPill: {
    display: "inline-block",
    color: "#fff",
    fontSize: "11px",
    fontWeight: 600,
    padding: "3px 0",
    borderRadius: "20px",
    width: "100px",
    textAlign: "center" as const,
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
  },
};