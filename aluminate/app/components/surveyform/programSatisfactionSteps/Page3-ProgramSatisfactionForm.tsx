"use client";

import { useState } from "react";

// --- Types ---
type AgreeValue = "Strongly Agree" | "Agree" | "Disagree" | "Strongly Disagree" | null;
type SatisfactionValue = "Very Satisfied" | "Satisfied" | "Dissatisfied" | "Very Dissatisfied" | null;

interface Page3FormState {
  cultureRatings: { [key: string]: AgreeValue };
  cultureExplanation: string;
  servicesSatisfaction: { [key: string]: SatisfactionValue };
  servicesOther: string;
}

interface Page3FormProps {
  onBack?: () => void;
  onNext?: () => void;
}

// --- Constants ---
// Column arrays use plain string (non-nullable) — the nullable types live only in form state
const agreeColumns: { value: string; label: string }[] = [
  { value: "Strongly Agree",    label: "Strongly Agree"    },
  { value: "Agree",             label: "Agree"             },
  { value: "Disagree",          label: "Disagree"          },
  { value: "Strongly Disagree", label: "Strongly Disagree" },
];

const satisfactionColumns: { value: string; label: string }[] = [
  { value: "Very Satisfied",    label: "Very Satisfied"    },
  { value: "Satisfied",         label: "Satisfied"         },
  { value: "Dissatisfied",      label: "Dissatisfied"      },
  { value: "Very Dissatisfied", label: "Very Dissatisfied" },
];

const cultureItems = [
  "Immersion to the values of a liberal arts background",
  "Faculty members are exemplars of 'honor and excellence'",
  "Students are encouraged to participate",
  "The expertise of the faculty",
];

const servicesItems = [
  "DMPCS Staff",
  "Faculty members in general",
  "Faculty members who handle the courses",
  "Office of the University Registrar",
  "Dean's Office",
  "Guidance and Counseling Office",
  "University Library",
  "ICT Office",
  "Office of Student Affairs",
  "Canteen",
  "Guards",
];

// --- Reusable Rating Table ---
// Uses plain `string` so it works with any nullable union type in the parent
interface RatingTableProps {
  items: string[];
  groupKey: string;
  columns: { value: string; label: string }[];
  values: { [key: string]: string | null };
  onChange: (item: string, value: string) => void;
}

function RatingTable({ items, groupKey, columns, values, onChange }: RatingTableProps) {
  return (
    <div style={styles.tableWrapper}>
      {/* Header */}
      <div style={styles.tableHeaderRow}>
        <div style={styles.tableItemCol} />
        <div style={{ ...styles.tableRatingsCol, flex: columns.length }}>
          {columns.map((col) => (
            <div key={col.value} style={styles.tableColHeader}>
              {col.label}
            </div>
          ))}
        </div>
      </div>
      {/* Rows */}
      {items.map((item, idx) => (
        <div key={idx} style={idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
          <div style={styles.tableItemCol}>
            <span style={styles.tableItemText}>{item}</span>
          </div>
          <div style={{ ...styles.tableRatingsCol, flex: columns.length }}>
            {columns.map((col) => (
              <div key={col.value} style={styles.radioWrapperCenter}>
                <input
                  type="radio"
                  name={`${groupKey}-${idx}`}
                  checked={values[item] === col.value}
                  onChange={() => onChange(item, col.value)}
                  style={styles.radioInputNormal}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Main Component ---
export default function Page3ProgramSatisfactionForm({ onBack, onNext }: Page3FormProps) {
  const [form, setForm] = useState<Page3FormState>({
    cultureRatings: {},
    cultureExplanation: "",
    servicesSatisfaction: {},
    servicesOther: "",
  });

  const handleNext = () => {
    onNext?.();
  }

  const handleCultureChange = (item: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      cultureRatings: { ...prev.cultureRatings, [item]: value as AgreeValue },
    }));
  };

  const handleServicesChange = (item: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      servicesSatisfaction: { ...prev.servicesSatisfaction, [item]: value as SatisfactionValue },
    }));
  };

  return (
    <div style={styles.content}>
      {/* Page Header */}
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Program Satisfaction Form</h1>
        <p style={styles.pageSubtitle}>
          Complete the Alumni Tracer form to contribute valuable feedback and data
        </p>
      </div>

      <div style={styles.formContainer}>

        {/* --- Section 1: Intellectual & Cultural Environment --- */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>
            Intellectual and cultural environment and support given by the Department of Math,
            Physics and Computer Science
          </h2>
          <div style={styles.divider} />

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Please rate how the culture in your school environment captures the factors stated below.
            </label>
            <RatingTable
              items={cultureItems}
              groupKey="culture"
              columns={agreeColumns}
              values={form.cultureRatings as { [key: string]: string | null }}
              onChange={handleCultureChange}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>Please explain your answer above:</label>
            <textarea
              style={styles.textarea}
              rows={4}
              value={form.cultureExplanation}
              onChange={(e) => setForm({ ...form, cultureExplanation: e.target.value })}
              placeholder="Share your thoughts with us..."
            />
          </div>
        </div>

        {/* --- Section 2: Services provided by UP Mindanao --- */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Services provided by UP Mindanao</h2>
          <div style={styles.divider} />

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Please indicate your level of satisfaction with the services provided by the
              following offices/personnel.
            </label>
            <RatingTable
              items={servicesItems}
              groupKey="services"
              columns={satisfactionColumns}
              values={form.servicesSatisfaction as { [key: string]: string | null }}
              onChange={handleServicesChange}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>Others (please specify):</label>
            <textarea
              style={styles.textarea}
              rows={3}
              value={form.servicesOther}
              onChange={(e) => setForm({ ...form, servicesOther: e.target.value })}
              placeholder="Specify other offices or personnel..."
            />
          </div>
        </div>

        {/* Action Row */}
        <div style={styles.actionRow}>
          <button style={styles.backBtn} onClick={onBack}>Back</button>
          <button style={styles.nextBtn} onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  content:       { width: "100%", maxWidth: "1400px" },
  pageHeader:    { marginBottom: "48px" },
  pageTitle:     { fontSize: "26px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 10px", letterSpacing: "-0.5px" },
  pageSubtitle:  { fontSize: "13px", color: "#555", margin: 0 },
  formContainer: { display: "flex", flexDirection: "column", gap: "50px", paddingBottom: "40px" },
  sectionBlock:  { display: "flex", flexDirection: "column", gap: "24px", width: "100%" },
  sectionTitle:  { fontSize: "18px", fontWeight: "600", color: "#9b1d2a", margin: 0 },
  divider:       { height: "1px", backgroundColor: "#e0e0e0", width: "100%", marginTop: "-10px" },
  inputGroup:    { display: "flex", flexDirection: "column", gap: "10px", flex: 1, width: "100%" },
  questionLabel: { fontSize: "13px", color: "#333", fontWeight: "500", lineHeight: "1.5", marginBottom: "4px" },
  textarea:      { border: "1px solid #dcdcdc", borderRadius: "8px", padding: "16px", fontSize: "13px", color: "#333", outline: "none", width: "100%", backgroundColor: "#ffffff", resize: "vertical", fontFamily: "inherit" },
  // Table
  tableWrapper:    { display: "flex", flexDirection: "column", gap: "4px", marginTop: "12px", width: "100%" },
  tableHeaderRow:  { display: "flex", padding: "0 24px", marginBottom: "6px" },
  tableItemCol:    { flex: 2.5, paddingRight: "20px", display: "flex", alignItems: "center" },
  tableRatingsCol: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" },
  tableColHeader:  { flex: 1, textAlign: "center" as const, fontSize: "11px", fontWeight: "700", color: "#333", lineHeight: "1.3", padding: "0 4px" },
  tableRowEven:    { display: "flex", backgroundColor: "#ffffff", borderRadius: "12px", padding: "16px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.02)", width: "100%", alignItems: "center" },
  tableRowOdd:     { display: "flex", backgroundColor: "#fafafa", borderRadius: "12px", padding: "16px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.02)", width: "100%", alignItems: "center" },
  tableItemText:   { fontSize: "12px", color: "#333", lineHeight: "1.5" },
  radioWrapperCenter: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center" },
  radioInputNormal:   { width: "16px", height: "16px", accentColor: "#9b1d2a", cursor: "pointer" },
  // Buttons
  actionRow: { display: "flex", justifyContent: "center", gap: "16px", marginTop: "20px" },
  backBtn:   { backgroundColor: "#ffffff", color: "#9b1d2a", border: "2px solid #9b1d2a", borderRadius: "24px", padding: "12px 64px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  nextBtn:   { backgroundColor: "#9b1d2a", color: "#ffffff", border: "none", borderRadius: "24px", padding: "12px 64px", fontSize: "14px", fontWeight: "600", cursor: "pointer", boxShadow: "0 2px 6px rgba(155,29,42,0.2)" },
};
