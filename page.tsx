"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlumniSidebar from "@/components/layout/sidebar/AlumniSidebar";
import SurveyFormIntro from "@/components/surveyform/SurveyFormIntro";
import SurveyForm from "@/components/surveyform/SurveyForm";

type View = "intro" | "form";

export default function SurveyFormPage() {
  const [activePage, setActivePage] = useState("survey");
  const [view, setView] = useState<View>("intro");
  const router = useRouter();

  const handleSetActivePage = (page: string) => {
    setActivePage(page);
    if (page === "home") router.push("/alumni");
    if (page === "survey") router.push("/alumni/surveyform");
  };

  const handleSubmit = () => {
    // After submission — navigate back to home or show a success state
    router.push("/alumni");
  };

  return (
    <div style={styles.shell}>
      <AlumniSidebar activePage={activePage} setActivePage={handleSetActivePage} />

      <main style={styles.main}>
        {view === "intro" ? (
          <SurveyFormIntro onProceed={() => setView("form")} />
        ) : (
          <SurveyForm onSubmit={handleSubmit} />
        )}
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    display: "flex",
    overflowY: "auto",
  },
};