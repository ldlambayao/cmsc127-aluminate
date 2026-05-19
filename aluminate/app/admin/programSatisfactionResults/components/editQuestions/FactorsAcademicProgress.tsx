"use client";

import { useState } from "react";

type Question = {
  id: number;
  text: string;
  indented?: boolean;
};

const initialQuestions: Question[] = [
  { id: 1, text: "Please indicate how the following factors might have influenced your progress toward the BSAM degree.",},
  { id: 2, text: "Family Obligations", indented: true },
  { id: 3, text: "Challenges of requirements for each course", indented: true},
  { id: 4, text: "Volume of requirements for each course", indented: true },
  { id: 5, text: "Lack of access to the concerned faculty", indented: true },
  { id: 6, text: "Work obligations/demands", indented: true },
  { id: 7, text: "Financial concerns", indented: true },
  { id: 8, text: "Lack of motivation", indented: true },
  { id: 9, text: "Health reasons", indented: true },
  { id: 10, text: "Challenges about the program, in general", indented: true },
  { id: 11, text: "Challenges about the faculty in general", indented: true },
  { id: 12, text: "Others factors (please specify)" },
  { id: 13, text: "Did you consider leaving the program" }, 
  { id: 14, text: "Why?" },
  { id: 15, text: "What is your favorite year and semester?" },
  { id: 16, text: "Why" },
  { id: 17, text: "What course/subject/topic do you think will be most helpful in your future endeavors?" },
  { id: 18, text: "What course/subject/topic do you think will be least helpful in your future endeavors?" },
  { id: 19, text: "What course/subject/topic do you think should not be included to the program? Why?" },
  { id: 20, text: "What course/subject/topic do you think should be added to the program?" },
  { id: 21, text: "What other specific challenges did you encounter in finishing the program?" },
];

export default function FactorsAcademicProgress() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleEditClick = (question: Question) => {
    setEditingId(question.id);
    setEditText(question.text);
  };

  const handleEditSave = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text: editText } : q))
    );
    setEditingId(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleDelete = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div style={styles.card}>
      {/* Card Header */}
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>Factors that might have affected your academic progress</h2>
        <button style={styles.iconBtn} title="Edit section">
          <PencilIcon />
        </button>
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thQuestion}>Question</th>
            <th style={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id} style={styles.row}>
              <td style={{ ...styles.tdQuestion, paddingLeft: q.indented ? "56px" : "24px" }}>
                {editingId === q.id ? (
                  <div style={styles.editWrapper}>
                    <textarea
                      style={styles.textarea}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={3}
                      autoFocus
                    />
                    <div style={styles.editActions}>
                      <button style={styles.saveBtn} onClick={() => handleEditSave(q.id)}>
                        Save
                      </button>
                      <button style={styles.cancelBtn} onClick={handleEditCancel}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <span style={styles.questionText}>{q.text}</span>
                )}
              </td>
              <td style={styles.tdActions}>
                <div style={styles.actionBtns}>
                  <button style={styles.iconBtn} title="Delete" onClick={() => handleDelete(q.id)}>
                    <TrashIcon />
                  </button>
                  <button style={styles.iconBtn} title="Edit" onClick={() => handleEditClick(q)}>
                    <PencilIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3h4" />
      <path d="M4 6h16" />
      <path d="M6 6l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
      <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    overflow: "hidden",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 24px 14px 24px",
    borderBottom: "1px solid #f0f0f0",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#9b1d2a",
    margin: 0,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thQuestion: {
    textAlign: "left",
    padding: "10px 24px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
    backgroundColor: "#fafafa",
    borderBottom: "1px solid #efefef",
    width: "85%",
  },
  thActions: {
    textAlign: "right",
    padding: "10px 24px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
    backgroundColor: "#fafafa",
    borderBottom: "1px solid #efefef",
    width: "15%",
  },
  row: {
    borderBottom: "1px solid #f3f3f3",
  },
  tdQuestion: {
    padding: "14px 24px",
    verticalAlign: "top",
  },
  tdActions: {
    padding: "14px 24px",
    verticalAlign: "middle",
    textAlign: "right",
  },
  questionText: {
    fontSize: "14px",
    color: "#333",
    lineHeight: "1.5",
  },
  actionBtns: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s",
  },
  editWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  textarea: {
    width: "100%",
    padding: "8px 10px",
    fontSize: "14px",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "6px",
    resize: "vertical",
    fontFamily: "inherit",
    lineHeight: "1.5",
    boxSizing: "border-box",
  },
  editActions: {
    display: "flex",
    gap: "8px",
  },
  saveBtn: {
    padding: "5px 14px",
    fontSize: "13px",
    fontWeight: "600",
    backgroundColor: "#9b1d2a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "5px 14px",
    fontSize: "13px",
    fontWeight: "600",
    backgroundColor: "#f0f0f0",
    color: "#444",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};