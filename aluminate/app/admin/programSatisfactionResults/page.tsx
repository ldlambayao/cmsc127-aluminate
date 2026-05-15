"use client";

import { useState } from "react";

// Summary Statistics Components
import GeneralInformation from "./components/summaryStatistics/GeneralInformation";
import DecisiontoEnroll from "./components/summaryStatistics/DecisiontoEnroll";
import FactorsAcademicProgress from "./components/summaryStatistics/FactorsAcademicProgress";
import ImprovementofProgram from "./components/summaryStatistics/ImprovementofProgram";
import IntellectualCulturalEnvironment from "./components/summaryStatistics/IntellectualCulturalEnvironment";
import OverallSatisfaction from "./components/summaryStatistics/OverallSatisfaction";
import ServicesProvidedbyUP from "./components/summaryStatistics/ServicesProvidedbyUP";
import TransitiontoProgram from "./components/summaryStatistics/TransitiontoProgram";

// Edit Questions Components
import EQGeneralInformation from "./components/editQuestions/GeneralInformation";
import EQDecisiontoEnroll from "./components/editQuestions/DecisiontoEnroll";
import EQFactorsAcademicProgress from "./components/editQuestions/FactorsAcademicProgress";
import EQImprovementofProgram from "./components/editQuestions/ImprovementofProgram";
import EQIntellectualCulturalEnvironment from "./components/editQuestions/IntellectualCulturalEnvironment";
import EQOverallSatisfaction from "./components/editQuestions/OverallSatisfaction";
import EQServicesProvidedbyUP from "./components/editQuestions/ServicesProvidedbyUP";
import EQTransitiontoProgram from "./components/editQuestions/TransitiontoProgram";

type Tab = "summary" | "edit";

const PROGRAMS = [
  { value: "", label: "Filter by Program" },
  { value: "BS Computer Science", label: "BS Computer Science" },
  { value: "BS Data Science", label: "BS Data Science" },
  { value: "BS Applied Mathematics", label: "BS Applied Mathematics" },
];

const SECTIONS = [
  { value: "", label: "Filter by section" },
  { value: "generalInfo", label: "General Information" },
  { value: "decisionToEnroll", label: "Decision to Enroll" },
  { value: "factorsAcademicProgress", label: "Factors Academic Progress" },
  { value: "improvementOfProgram", label: "Improvement of Program" },
  { value: "intellectualCulturalEnvironment", label: "Intellectual & Cultural Environment" },
  { value: "overallSatisfaction", label: "Overall Satisfaction" },
  { value: "servicesProvidedByUP", label: "Services Provided by UP" },
  { value: "transitionToProgram", label: "Transition to Program" },
];

export default function ProgramSatisfactionResultsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  return (
    <main style={styles.main}>
        {/* Page Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Program Satisfaction Form</h1>
          <p style={styles.subtitle}>Illuminating Alumni Paths through Data, One at a Time</p>
        </div>

        {/* Tabs + Filters */}
        <div style={styles.tabsWrapper}>
          <div style={styles.tabsRow}>
            {/* Tab Buttons */}
            <div style={styles.tabs}>
              <button
                style={{
                  ...styles.tab,
                  ...(activeTab === "summary" ? styles.tabActive : styles.tabInactive),
                }}
                onClick={() => setActiveTab("summary")}
              >
                Summary Statistics
                {activeTab === "summary" && <span style={styles.tabUnderline} />}
              </button>
              <button
                style={{
                  ...styles.tab,
                  ...(activeTab === "edit" ? styles.tabActive : styles.tabInactive),
                }}
                onClick={() => setActiveTab("edit")}
              >
                Edit Questions
                {activeTab === "edit" && <span style={styles.tabUnderline} />}
              </button>
            </div>
          </div>

          {/* Filters — only visible on Summary tab, right-aligned below tabs */}
          {activeTab === "summary" && (
            <div style={styles.filtersRow}>
              <select
                style={styles.select}
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                {PROGRAMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>

              <select
                style={styles.select}
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                {SECTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Divider under tabs */}
        <hr style={styles.divider} />

        {/* Tab Content */}
        <div style={styles.content}>
          {activeTab === "summary" ? (
            <div style={styles.summaryGrid}>
              {/* Render only the filtered section, or all if none selected */}
              {(!selectedSection || selectedSection === "generalInfo") && (
                <GeneralInformation program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "decisionToEnroll") && (
                <DecisiontoEnroll program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "factorsAcademicProgress") && (
                <FactorsAcademicProgress program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "improvementOfProgram") && (
                <ImprovementofProgram program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "intellectualCulturalEnvironment") && (
                <IntellectualCulturalEnvironment program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "overallSatisfaction") && (
                <OverallSatisfaction program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "servicesProvidedByUP") && (
                <ServicesProvidedbyUP program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "transitionToProgram") && (
                <TransitiontoProgram program={selectedProgram} />
              )}
            </div>
          ) : (
            <div style={styles.summaryGrid}>
              <EQGeneralInformation />
              <EQDecisiontoEnroll />
              <EQFactorsAcademicProgress />
              <EQImprovementofProgram />
              <EQIntellectualCulturalEnvironment />
              <EQOverallSatisfaction />
              <EQServicesProvidedbyUP />
              <EQTransitiontoProgram />
            </div>
          )}
        </div>
      </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    flex: 1,
    padding: "36px 40px",
    overflowY: "auto",
    minWidth: 0,
  },
  header: {
    marginBottom: "28px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: "0 0 6px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#888",
    margin: 0,
  },
  tabsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  tabsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filtersRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  tabs: {
    display: "flex",
    gap: "0px",
  },
  tab: {
    position: "relative",
    padding: "10px 24px",
    border: "none",
    background: "transparent",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  tabActive: {
    color: "#9b1d2a",
  },
  tabInactive: {
    color: "#888",
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    left: "24px",
    right: "24px",
    height: "2.5px",
    backgroundColor: "#9b1d2a",
    borderRadius: "2px",
    display: "block",
  },
  filters: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  select: {
    padding: "8px 32px 8px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "13px",
    color: "#444",
    cursor: "pointer",
    appearance: "auto",
    minWidth: "160px",
  },
  divider: {
    border: "none",
    borderTop: "1.5px solid #e5e5e5",
    margin: "0 0 28px 0",
  },
  content: {
    width: "100%",
  },
  summaryGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
};