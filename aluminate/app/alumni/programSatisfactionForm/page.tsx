"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlumniSidebar from "@/components/layout/sidebar/AlumniSidebar";
import ProgramSatisfactionFormIntro from "@/components/surveyform/programSatisfactionSteps/ProgramSatisfactionFormIntro";
import Page1 from "@/components/surveyform/programSatisfactionSteps/Page1-ProgramSatisfactionForm";
import Page2 from "@/components/surveyform/programSatisfactionSteps/Page2-ProgramSatisfactionForm";
import Page3 from "@/components/surveyform/programSatisfactionSteps/Page3-ProgramSatisfactionForm";
import Page4 from "@/components/surveyform/programSatisfactionSteps/Page4-ProgramSatisfactionForm";
import Page5 from "@/components/surveyform/programSatisfactionSteps/Page5-ProgramSatisfactionForm";

type Step = "intro" | "page1" | "page2" | "page3" | "page4" | "page5";

export default function ProgramSatisfactionFormPage() {
  const [step, setStep] = useState<Step>("intro");
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const handleSetActivePage = (page: string) => {
    if (page === "home") router.push("/alumni");
    if (page === "exit") router.push("/alumni/programSatisfactionForm");
    if (page === "tracer") router.push("/alumni/alumniTracerForm");
  };

  const saveAndAdvance = (data: object, next: Step) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(next);
  };

  return (
    <div style={styles.shell}>
      <AlumniSidebar activePage="exit" setActivePage={handleSetActivePage} />

      <main style={styles.main}>
        {step === "intro" && (
          <ProgramSatisfactionFormIntro onProceed={() => setStep("page1")} />
        )}
        {step === "page1" && (
          <Page1
            onSubmit={(data) => saveAndAdvance(data, "page2")}
          />
        )}
        {step === "page2" && (
          <Page2
            onBack={() => setStep("page1")}
            onSubmit={(data) => saveAndAdvance(data, "page3")}
          />
        )}
        {step === "page3" && (
          <Page3
            onBack={() => setStep("page2")}
            onSubmit={(data) => saveAndAdvance(data, "page4")}
          />
        )}
        {step === "page4" && (
          <Page4
            onBack={() => setStep("page3")}
            onSubmit={(data) => saveAndAdvance(data, "page5")}
          />
        )}
        {step === "page5" && (
          <Page5
            onBack={() => setStep("page4")}
            onSubmit={(data) => {
              const finalData = { ...formData, ...data };
              console.log("Final submission:", finalData);
              // TODO: send finalData to your API
              router.push("/alumni"); // redirect after submit
            }}
          />
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
  },
  main: {
    flex: 1,
    padding: "40px 48px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
};