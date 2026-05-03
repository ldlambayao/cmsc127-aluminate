"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlumniSidebar from "@/components/layout/sidebar/AlumniSidebar";
import ProgramSatisfactionFormIntro from "@/components/programsatisfactionform/ProgramSatisfactionFormIntro";
import ProgramSatisfactionForm from "@/components/programsatisfactionform/ProgramSatisfactionForm";

export default function ProgramSatisfactionFormPage() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/alumni");
  };

  return (
    <div style={styles.shell}>
      <AlumniSidebar />

      {showForm ? (
        <ProgramSatisfactionForm onSubmit={handleSubmit} />
      ) : (
        <ProgramSatisfactionFormIntro onProceed={() => setShowForm(true)} />
      )}
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
};