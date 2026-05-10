"use client";

import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import AddRecordModal from "@/admin/studentRecords/modals/addRecordModal";
import EditRecordModal from "@/admin/studentRecords/modals/editRecordModal";
import DeleteRecordModal from "@/admin/studentRecords/modals/deleteRecordModal";
import StudentRecordsPage from "@/admin/studentRecords/page";

export interface UserRecord {
  id: string;
  fname: string;
  mname?: string;
  lname: string;
  alumni: AlumniRecord
}

export interface AlumniRecord {
  id: string;
  student_number: string;
  program: ProgramRecord;
  graduation_year: number;
  satisfaction_survey_status: string;
  tracer_survey_status: string;
}

export interface ProgramRecord {
  program_code: number;
  program_name: string;
}

interface RecordTableProps {
  onDataChange?: () => void;
  searchQuery: string;
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

export default function RecordTable({ onDataChange, searchQuery }: RecordTableProps) {
  const [records, setRecords] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [programs, setPrograms] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<UserRecord | null>(null);

  const supabase = getSupabaseBrowserClient();

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select<string, UserRecord>("fname, mname, lname, role, alumni!inner(student_number, program_code, graduation_year, satisfaction_survey_status, tracer_survey_status, program!inner(program_name))")
        .eq("role", 1);

      if(error) throw error;

      if(data) {
        const formattedData = data.map(user => ({
          ...user,
          alumni: Array.isArray(user.alumni) ? user.alumni[0] : user.alumni
        }))

        setRecords(formattedData);
        setPrograms([...new Set(formattedData.map((r) => r.alumni.program.program_name))].filter(Boolean).sort());
        setYears([...new Set(formattedData.map((r) => r.alumni.graduation_year))].filter(Boolean).sort());
      } else {
        console.error("Error fetching data");
      }
    } catch (err) {
      console.error("Fetch error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(records);
    fetchRecords();
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      console.log("Current Records:", records);
      console.log("years: ", years);
    }
  }, [records, years]);

  const handleRefresh = () => {
    fetchRecords();
    onDataChange?.();
  };

  const filtered = records.filter((r) => {
    const search = searchQuery.toLowerCase();
    const fullName = `${r.fname} ${r.mname} ${r.lname}`.trim().toLowerCase();
    const studentNumber = r.alumni.student_number;
    const matchSearch = fullName.includes(search) || studentNumber.includes(search) ;

    const matchYear = !filterYear || r.alumni.graduation_year === parseInt(filterYear);
    const matchProgram = !filterProgram || r.alumni.program.program_name === filterProgram;

    return matchYear && matchProgram && matchSearch;

  });

  const isCompleted = (status: string) =>
    status === "Completed";

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
                const fullName     = `${rec.fname}${rec.mname ? " " + rec.mname.charAt(0) + ". " : ""} ${rec.lname}`.trim();
                const programColor = PROGRAM_COLORS[rec.alumni.program.program_name] ?? defaultProgramColor;
                const satDone      = isCompleted(rec.alumni.satisfaction_survey_status);
                const tracerDone   = isCompleted(rec.alumni.tracer_survey_status);

                return (
                  <tr key={rec.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.td}>
                      <span style={styles.studentId}>{rec.alumni.student_number}</span>
                    </td>

                    <td style={styles.td}>
                      <span style={styles.name}>{fullName}</span>
                    </td>

                    <td style={styles.td}>
                      <span style={{ ...styles.programPill, backgroundColor: programColor }}>
                        {rec.alumni.program.program_name}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <span style={styles.yearBadge}>{rec.alumni.graduation_year}</span>
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
