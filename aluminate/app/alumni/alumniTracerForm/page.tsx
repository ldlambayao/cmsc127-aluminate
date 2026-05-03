"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlumniSidebar from "@/components/layout/sidebar/AlumniSidebar";
import AlumniTracerFormIntro from "@/components/surveyform/AlumniTracerFormIntro";
import AlumniTracerForm from "@/components/surveyform/AlumniTracerForm";

type View = "intro" | "form";

export default function SurveyFormPage() {
  const [view, setView] = useState<View>("intro");
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/alumni");
  };

  return (
    <div style={styles.shell}>
      <AlumniSidebar />

      <main style={styles.main}>
        {view === "intro" ? (
          <AlumniTracerFormIntro onProceed={() => setView("form")} />
        ) : (
          <AlumniTracerForm onSubmit={handleSubmit} />
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