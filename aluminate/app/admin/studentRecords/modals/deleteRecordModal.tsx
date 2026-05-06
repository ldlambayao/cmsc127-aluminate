"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import { AlumniRecord } from "@/app/admin/studentRecords/components/RecordTable";

interface DeleteRecordModalProps {
  record: AlumniRecord;
  onClose: () => void;
  onSuccess: () => void;
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrashIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="1.5">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

export default function DeleteRecordModal({ record, onClose, onSuccess }: DeleteRecordModalProps) {
  const supabase = getSupabaseBrowserClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fullName = `${record.fname} ${record.mname ? record.mname + " " : ""}${record.lname}`.trim();

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get user_id before deleting alumni
      const { data: alumniRow } = await supabase
        .from("alumni")
        .select("user_id")
        .eq("id", record.id)
        .single();

      const { error: alumniError } = await supabase
        .from("alumni")
        .delete()
        .eq("id", record.id);

      if (alumniError) throw alumniError;

      // Delete user if exists
      if (alumniRow?.user_id) {
        await supabase.from("users").delete().eq("id", alumniRow.user_id);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message ?? "Failed to delete record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Delete Record</h3>
          <button onClick={onClose} style={styles.closeBtn}><CloseIcon /></button>
        </div>

        <div style={styles.body}>
          <div style={styles.iconCircle}>
            <TrashIcon />
          </div>
          <p style={styles.confirmText}>
            Are you sure you want to delete the record for{" "}
            <strong>{fullName}</strong> ({record.student_number})?
          </p>
          <p style={styles.warningText}>This action cannot be undone.</p>
        </div>

        {error && <p style={styles.errorText}>{error}</p>}

        <div style={styles.footer}>
          <button onClick={onClose} style={styles.cancelBtn} disabled={loading}>
            Cancel
          </button>
          <button onClick={handleDelete} style={styles.deleteBtn} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
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
    width: "440px",
    maxWidth: "95vw",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  },
  modalHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: "20px",
  },
  modalTitle: { fontSize: "16px", fontWeight: "700", color: "#1a1a2e", margin: 0 },
  closeBtn: { background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px" },
  body: {
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: "12px", textAlign: "center", padding: "8px 0 16px",
  },
  iconCircle: {
    width: "60px", height: "60px", borderRadius: "50%",
    backgroundColor: "#fce8ea",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  confirmText: { fontSize: "14px", color: "#444", margin: 0, lineHeight: 1.55 },
  warningText: { fontSize: "12px", color: "#e74c3c", margin: 0 },
  errorText: { color: "#e74c3c", fontSize: "12px", textAlign: "center", marginBottom: "12px" },
  footer: {
    display: "flex", gap: "12px", justifyContent: "center",
  },
  cancelBtn: {
    padding: "9px 28px",
    borderRadius: "8px",
    border: "1px solid #e8d8d8",
    backgroundColor: "#fff",
    fontSize: "13px",
    color: "#555",
    cursor: "pointer",
    fontWeight: 600,
  },
  deleteBtn: {
    padding: "9px 28px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#b82035",
    fontSize: "13px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
};