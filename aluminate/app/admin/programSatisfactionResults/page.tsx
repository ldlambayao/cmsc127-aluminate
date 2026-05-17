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
    <main className="flex-1 px-10 py-9 overflow-y-auto min-w-0">
        {/* Page Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-950 mb-1.5">Program Satisfaction Form</h1>
          <p className="text-sm text-gray-500 m-0">Illuminating Alumni Paths through Data, One at a Time</p>
        </div>

        {/* Tabs + Filters */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center">
            {/* Tab Buttons */}
            <div className="flex gap-0">
              <button
                className={`relative px-6 py-2.5 border-none bg-transparent text-sm font-semibold cursor-pointer transition-colors duration-200 ${
                  activeTab === "summary" ? "text-red-900" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("summary")}
              >
                Summary Statistics
                {activeTab === "summary" && (
                  <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-red-900 rounded block" />
                )}
              </button>
              <button
                className={`relative px-6 py-2.5 border-none bg-transparent text-sm font-semibold cursor-pointer transition-colors duration-200 ${
                  activeTab === "edit" ? "text-red-900" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("edit")}
              >
                Edit Questions
                {activeTab === "edit" && (
                  <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-red-900 rounded block" />
                )}
              </button>
            </div>
          </div>

          {/* Filters — only visible on Summary tab, right-aligned below tabs */}
          {activeTab === "summary" && (
            <div className="flex justify-end gap-2.5">
              <select
                className="px-3 py-2 pr-8 rounded-lg border border-gray-300 bg-white text-xs text-gray-700 cursor-pointer min-w-40"
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
                className="px-3 py-2 pr-8 rounded-lg border border-gray-300 bg-white text-xs text-gray-700 cursor-pointer min-w-40"
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
        <hr className="border-0 border-t border-gray-200 my-0 mb-7" />

        {/* Tab Content */}
        <div className="w-full">
          {activeTab === "summary" ? (
            <div className="flex flex-col gap-8">
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
            <div className="flex flex-col gap-8">
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