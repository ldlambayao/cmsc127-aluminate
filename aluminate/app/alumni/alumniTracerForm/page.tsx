"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlumniSidebar from "@/components/layout/sidebar/AlumniSidebar";
import AlumniTracerFormIntro from "@/components/surveyform/AlumniTracerFormIntro";
import AlumniTracerForm from "@/components/surveyform/AlumniTracerForm";

type View = "intro" | "form";

export default function AlumniTracerFormPage() {
  const [activePage, setActivePage] = useState("tracer");
  const [view, setView] = useState<View>("intro");
  const router = useRouter();

  const handleSetActivePage = (page: string) => {
    setActivePage(page);
    if (page === "home") router.push("/alumni");
    if (page === "exit") router.push("/alumni/programSatisfactionForm");
    if (page === "tracer") router.push("/alumni/alumniTracerForm");
  };

  const handleSubmit = () => {
    router.push("/alumni");
  };

  return (
    <div style={styles.shell}>
      <AlumniSidebar activePage={activePage} setActivePage={handleSetActivePage} />

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
    backgroundColor: "#f0f2f5",
  },
  main: {
    flex: 1,
    padding: "64px 72px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
};