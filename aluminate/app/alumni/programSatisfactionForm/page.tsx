"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlumniSidebar from "@/components/layout/sidebar/AlumniSidebar";
import ProgramSatisfactionFormIntro from "@/components/surveyform/programSatisfactionSteps/ProgramSatisfactionFormIntro";
import ProgramSatisfactionForm from "@/components/surveyform/programSatisfactionSteps/Page1-ProgramSatisfactionForm";

type Step = "intro" | "form";

export default function ProgramSatisfactionFormPage() {
  const [step, setStep] = useState<Step>("intro");
  const router = useRouter();

  const handleSetActivePage = (page: string) => {
    if (page === "home") router.push("/alumni");
    if (page === "exit") router.push("/alumni/programSatisfactionForm");
    if (page === "tracer") router.push("/alumni/alumniTracerForm");
  };

  return (
    <div style={styles.shell}>
      {/* Sidebar lives here — only once, at the top level */}
      <AlumniSidebar activePage="exit" setActivePage={handleSetActivePage} />

      <main style={styles.main}>
        {step === "intro" && (
          <ProgramSatisfactionFormIntro onProceed={() => setStep("form")} />
        )}
        {step === "form" && (
          <ProgramSatisfactionForm onSubmit={() => { /* handle final submission */ }} />
        )}
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    padding: "40px 48px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
};