"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

interface AddRecordModalProps {
  onClose: () => void;
  onSuccess: () => void;
  programs: string[];
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function AddRecordModal({ onClose, onSuccess, programs }: AddRecordModalProps) {
  const supabase = getSupabaseBrowserClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    student_id: "",
    name: "",
    program: "",
    graduation_year: "",
    satisfaction_status: "Not Yet",
    tracer_status: "Not Yet",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    if (!form.student_id || !form.name || !form.program) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Split name into parts
      const nameParts = form.name.trim().split(" ");
      const fname = nameParts[0] ?? "";
      const lname = nameParts[nameParts.length - 1] ?? "";
      const mname = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : null;

      // Get program id
      const { data: programData } = await supabase
        .from("program")
        .select("id")
        .eq("program_name", form.program)
        .single();

      // Create user entry
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert({ fname, mname, lname })
        .select("id")
        .single();

      if (userError) throw userError;

      // Create alumni entry
      const { error: alumniError } = await supabase.from("alumni").insert({
        student_number: form.student_id,
        user_id: userData.id,
        program_id: programData?.id,
        graduation_year: form.graduation_year || null,
        satisfaction_survey_status: form.satisfaction_status,
        tracer_survey_status: form.tracer_status,
      });

      if (alumniError) throw alumniError;

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message ?? "Failed to add record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Add Record</h3>
          <button onClick={onClose} style={styles.closeBtn}><CloseIcon /></button>
        </div>

        {/* Fields Row 1 */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Student ID</label>
            <input
              style={styles.input}
              placeholder="e.g. 2024-04565"
              value={form.student_id}
              onChange={(e) => handleChange("student_id", e.target.value)}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Name</label>
            <input
              style={styles.input}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Program</label>
            <select
              style={styles.input}
              value={form.program}
              onChange={(e) => handleChange("program", e.target.value)}
            >
              <option value="">Select program</option>
              {programs.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Fields Row 2 */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Graduation Year</label>
            <div style={styles.inputWithIcon}>
              <input
                style={{ ...styles.input, paddingRight: "32px" }}
                placeholder="e.g. 2025"
                value={form.graduation_year}
                onChange={(e) => handleChange("graduation_year", e.target.value)}
              />
              <span style={styles.calIcon}>📅</span>
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Program Satisfaction Survey Status</label>
            <select
              style={styles.input}
              value={form.satisfaction_status}
              onChange={(e) => handleChange("satisfaction_status", e.target.value)}
            >
              <option value="Not Yet">Not Yet</option>
              <option value="Answered">Answered</option>
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Alumni Tracer Form Status</label>
            <select
              style={styles.input}
              value={form.tracer_status}
              onChange={(e) => handleChange("tracer_status", e.target.value)}
            >
              <option value="Not Yet">Not Yet</option>
              <option value="Answered">Answered</option>
            </select>
          </div>
        </div>

        {error && <p style={styles.errorText}>{error}</p>}

        {/* Submit */}
        <div style={styles.footer}>
          <button onClick={handleAdd} style={styles.addBtn} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed", inset: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "28px 32px",
    width: "620px",
    maxWidth: "95vw",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  },
  modalHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: "20px",
  },
  modalTitle: { fontSize: "16px", fontWeight: "700", color: "#1a1a2e", margin: 0 },
  closeBtn: {
    background: "none", border: "none", cursor: "pointer",
    padding: "4px", borderRadius: "6px",
  },
  row: {
    display: "flex", gap: "14px", marginBottom: "16px",
  },
  fieldGroup: { flex: 1, display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "11px", color: "#888", fontWeight: 600 },
  input: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #e8d8d8",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  inputWithIcon: { position: "relative" },
  calIcon: {
    position: "absolute", right: "10px", top: "50%",
    transform: "translateY(-50%)", fontSize: "14px", pointerEvents: "none",
  },
  errorText: { color: "#e74c3c", fontSize: "12px", margin: "0 0 12px" },
  footer: { display: "flex", justifyContent: "center", marginTop: "8px" },
  addBtn: {
    backgroundColor: "#b82035",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 40px",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  },
};