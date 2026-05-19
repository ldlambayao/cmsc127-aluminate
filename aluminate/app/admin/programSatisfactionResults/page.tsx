"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <div className="bg-gray-100 min-h-screen p-4">
      <div className=" p-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Program Satisfaction Form</h1>
          <p className="text-xs text-gray-500 mt-1">
            Illuminating Alumni and Graduate Paths through Data, One at a Time
          </p>
        </div>

        {/* Tabs and Filters Section */}
        {/* Tabs */}
        <div className="flex gap-12 justify-center border-b border-gray-200">
          <button
            onClick={() => setActiveTab("summary")}
            className={`pb-3 px-2 font-medium text-md transition-colors ${activeTab === "summary"
              ? "border-b-3"
              : "text-gray-700 hover:text-gray-900"
              }`}
            style={activeTab === "summary" ? { color: "#8E3737", borderColor: "#8E3737" } : {}}
          >
            Summary Statistics
          </button>
          <button
            onClick={() => setActiveTab("edit")}
            className={`pb-3 px-2 font-medium text-md transition-colors ${activeTab === "edit"
              ? "border-b-2"
              : "text-gray-700 hover:text-gray-900"
              }`}
            style={activeTab === "edit" ? { color: "#8E3737", borderColor: "#8E3737" } : {}}
          >
            Edit Questions
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mt-6 justify-end">
          <div className="relative">
            <select className="appearance-none w-56 px-4 py-3 border border-gray-200 rounded-2xl text-gray-400 bg-white text-xs">
              <option>Filter by Program</option>
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black"
              size={14}
              strokeWidth={2.5}
            />
          </div>
          <div className="relative">
            <select className="appearance-none w-56 px-4 py-3 border border-gray-200 rounded-2xl text-gray-400 bg-white text-xs">
              <option>Filter by section</option>
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black"
              size={14}
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-8">
          {activeTab === "summary" ? (
            <div className="flex flex-col gap-8">
              {/* Render only the filtered section, or all if none selected */}
              {(!selectedSection || selectedSection === "generalInfo") && (
                <GeneralInformation program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "decisionToEnroll") && (
                <DecisiontoEnroll program={selectedProgram} />
              )}  
              {(!selectedSection || selectedSection === "transitionToProgram") && (
                <TransitiontoProgram program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "overallSatisfaction") && (
                <OverallSatisfaction program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "intellectualCulturalEnvironment") && (
                <IntellectualCulturalEnvironment program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "servicesProvidedByUP") && (
                <ServicesProvidedbyUP program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "factorsAcademicProgress") && (
                <FactorsAcademicProgress program={selectedProgram} />
              )}
              {(!selectedSection || selectedSection === "improvementOfProgram") && (
                <ImprovementofProgram program={selectedProgram} />
              )}
              
              
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <EQGeneralInformation />
              <EQDecisiontoEnroll />
              <EQTransitiontoProgram />
              <EQOverallSatisfaction />
              <EQIntellectualCulturalEnvironment />
              <EQServicesProvidedbyUP />
              <EQFactorsAcademicProgress />
              <EQImprovementofProgram />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}