"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

interface AddRecordModalProps {
  onClose: () => void;
  onSuccess: () => void;
  programs: string[];
}

interface RecordData {
  name: string;
  fname: string;
  mname?: string;
  lname: string;
  role: number;
  alumni_id: string;
  student_number: string;
  program_name: string;
  graduation_info: string;
  satisfaction_survey_status: string;
  tracer_survey_status: string;
}

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 14 4 9 9 4" />
    <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function AddRecordModal({ onClose, onSuccess, programs }: AddRecordModalProps) {
  const supabase = getSupabaseBrowserClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<RecordData>({
    name: "",
    fname: "",
    mname: "",
    lname: "",
    alumni_id: "",
    student_number: "",
    program_name: "",
    graduation_info: "",
    satisfaction_survey_status: "Not Completed",
    tracer_survey_status: "Not Open",
    role: 1,
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    if (!form.name || !form.program_name || !form.graduation_info) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const nameParts = form.name.trim().split("/");
      const fname = nameParts[0]
      const mname = nameParts.length === 2 ? null : nameParts[1];
      const lname = nameParts[nameParts.length - 1].length > 1 ? nameParts[nameParts.length - 1].replace(/\s+/g, '') : nameParts[nameParts.length - 1];
      const generatedEmail = `${fname.charAt(0).toLowerCase()}${mname ? mname.charAt(0).toLowerCase() : ""}${lname.toLowerCase()}@up.edu.ph`

      const graduationInfo = form.graduation_info.trim().split("/");
      const graduation_month = graduationInfo[0];
      const graduation_year = graduationInfo[1];

      async function signUpUser(){
        const { data, error: authError } = await supabase.auth.signUp({
          email: generatedEmail,
          password: form.student_number,
        });

        if(authError || !data.user){
          console.error("Sign-up failed", authError?.message);
          return;
        }

        const userId = data.user.id

        const { data: userData, error: userError } = await (supabase as any)
          .from("users")
          .insert({
            uuid: userId,
            fname: fname,
            mname: mname,
            lname: lname,
            role: 1,
          })

        if (userError) throw userError;

        const { data: programData } = await (supabase as any)
          .from("program")
          .select("program_code")
          .eq("program_name", form.program_name)
          .single();

        if(!programData) {
          console.error("Invalid program chosen");
        }

        const { error: alumniError } = await (supabase as any)
          .from("alumni")
          .insert({
            student_number: form.student_number,
            program_code: programData.program_code,
            graduation_year: parseInt(graduation_year),
            graduation_month: graduation_month,
            satisfaction_survey_status: form.satisfaction_survey_status,
            tracer_survey_status: form.tracer_survey_status,
            uuid: userId,
          });

        if (alumniError) throw alumniError;
      }

      await signUpUser();
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
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
            <BackIcon />
          </button>
        </div>

        {/* Row 1: Student ID, Name, Program */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Student ID</label>
            <input
              style={styles.input}
              placeholder="20xx-xxxxx"
              value={form.student_number}
              onChange={(e) => handleChange("student_number", e.target.value)}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Name</label>
            <input
              style={styles.input}
              placeholder="First Name/Middle Name/Last Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Program</label>
            <div style={styles.selectWrapper}>
              <select
                style={styles.select}
                value={form.program_name}
                onChange={(e) => handleChange("program_name", e.target.value)}
              >
                <option value="">Program</option>
                {programs.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <span style={styles.selectArrow}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Graduation Year, Satisfaction Status, Tracer Status */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Graduation Month & Year</label>
            <div style={styles.inputWithIcon}>
              <input
                style={{ ...styles.input, paddingRight: "36px" }}
                placeholder="mm/yyyy"
                value={form.graduation_info}
                onChange={(e) => handleChange("graduation_info", e.target.value)}
              />
              <span style={styles.calIcon}><CalendarIcon /></span>
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Program Satisfaction Survey Status</label>
            <input
              style={{ ...styles.input, backgroundColor: "#f5f5f5", color: "#999", cursor: "not-allowed" }}
              value={form.satisfaction_survey_status}
              readOnly
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Alumni Tracer Form Status</label>
            <input
              style={{ ...styles.input, backgroundColor: "#f5f5f5", color: "#999", cursor: "not-allowed" }}
              value={form.tracer_survey_status}
              readOnly
            />
          </div>
        </div>

        {error && <p style={styles.errorText}>{error}</p>}

        {/* Footer */}
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
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.30)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "32px 36px 28px",
    width: "820px",
    maxWidth: "95vw",
    boxShadow: "0 8px 40px rgba(0,0,0,0.13)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  modalTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: 0,
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    lineHeight: 1,
  },
  row: {
    display: "flex",
    gap: "16px",
    marginBottom: "18px",
  },
  fieldGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    minWidth: 0,
  },
  label: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#888",
    letterSpacing: "0.01em",
  },
  input: {
    padding: "9px 12px",
    borderRadius: "8px",
    border: "1.5px solid #e5e5e5",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
    backgroundColor: "#fff",
    fontFamily: "inherit",
  },
  inputWithIcon: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  calIcon: {
    position: "absolute",
    right: "11px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  selectWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  select: {
    padding: "9px 32px 9px 12px",
    borderRadius: "8px",
    border: "1.5px solid #e5e5e5",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
    backgroundColor: "#fff",
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    fontFamily: "inherit",
    cursor: "pointer",
  },
  selectArrow: {
    position: "absolute",
    right: "11px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: "12px",
    margin: "0 0 12px",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "12px",
  },
  addBtn: {
    backgroundColor: "#1338Be",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "11px 0",
    width: "100%",
    maxWidth: "200px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "0.01em",
    fontFamily: "inherit",
  },
};
