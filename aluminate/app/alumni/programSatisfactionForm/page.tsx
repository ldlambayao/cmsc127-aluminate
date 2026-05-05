"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/../lib/store/useFormStore";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
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
  const supabase = getSupabaseBrowserClient();
  const { formData, resetForm } = useFormStore();
  const router = useRouter();

  const handleSetActivePage = (page: string) => {
    if (page === "home") router.push("/alumni");
    if (page === "exit") router.push("/alumni/programSatisfactionForm");
    if (page === "tracer") router.push("/alumni/alumniTracerForm");
  };

  const handleFinalSubmit = async() => {
    const payload = {
      // ---- Page 1 ----
      submission_date: formData.date,
      p1q1: formData.timelinessRating,
      p1q2c1: formData.learnAbout.upWebsite,
      p1q2c2: formData.learnAbout.faculty,
      p1q2c3: formData.learnAbout.friend,
      p1q2t1: formData.learnAbout.otherText,
      p1q3: formData.transitionDifficulty,
      p1q4: formData.transitionReason,
      p1q4c1: formData.transitionHelp.bridging,
      p1q4c2: formData.transitionHelp.refresher,
      p1q4c3: formData.transitionHelp.other,
      p1q4t1: formData.transitionHelp.otherText, // CHANGE THIS
      p1q5: formData.preparationSuggestion,
      p1q6q1: formData.enrollmentFactors["Reputation of UP Mindanao"],
      p1q6q2: formData.enrollmentFactors["Reputation of UP Mindanao Department of Math, Physics and Computer Science"],
      p1q6q3: formData.enrollmentFactors["Reputation of the BSAM program"],
      p1q6q4: formData.enrollmentFactors["Reputation/Expertise of the Faculty members"],
      p1q6q5: formData.enrollmentFactors["The program matches my interests"],
      p1q6q6: formData.enrollmentFactors["Financial consideration"],
      p1q6q7: formData.enrollmentFactors["Recommendation of a friend"],
      p1q6q8: formData.enrollmentFactors["Encouragement of parent/s or relatives"],
      p1q6q9: formData.enrollmentFactors["Encouragement of a faculty member"],

      // ---- Page 2 ----
      p2q1: formData.experienceSatisfaction["Overall BSAM curriculum at UP Mindanao"],
      p2q2: formData.experienceSatisfaction["Overall experience at the Department of Math, Physics, and Computer Science"],
      p2q3: formData.experienceSatisfaction["Your academic experience at UP Mindanao"],
      p2q4: formData.experienceSatisfaction["The atmosphere of the faculty"],
      p2q5: formData.experienceSatisfaction["In meeting/fulfilling the expected program outcomes"],
      p2q6: formData.experienceSatisfaction["Alignment of the module learning outcomes with the program learning outcomes"],
      p2q7: formData.learningOutcomeSatisfaction["Development of a holistic understanding of the same general education (GE) courses"],
      p2q8: formData.learningOutcomeSatisfaction['Mastery of "foundational concepts of mathematics"'],
      p2q9: formData.learningOutcomeSatisfaction['Mastery of "fundamental concepts of statistics"'],
      p2q10: formData.learningOutcomeSatisfaction['Mastery of "fundamental concepts of computer science"'],
      p2q11: formData.learningOutcomeSatisfaction["Enhanced academic thinking skills through solving complex mathematical and technical problems"],
      p2q12: formData.learningOutcomeSatisfaction["Ability to use appropriate numerical/GIS tools based on effectiveness of the solution process"],
      p2q13: formData.learningOutcomeSatisfaction["Ability to use R/R tools to efficiently aid the solution process"],
      p2q14: formData.learningOutcomeSatisfaction["Ability to use statistical methods and efficiency of the various disciplines"],
      p2q15: formData.learningOutcomeSatisfaction["Implementation/Specification of computer programs to support multiple computations"],
      p2q16: formData.learningOutcomeSatisfaction["Ability to apply data analytics techniques to support research programs"],
      p2q17: formData.learningOutcomeSatisfaction["Readiness in confidence to pursue a master's degree in applied mathematics"],
      p2q18: formData.learningOutcomeSatisfaction["Readiness in confidence to pursue a master's degree in statistics"],
      p2q19: formData.learningOutcomeSatisfaction["Readiness in confidence to pursue a master's degree in computer science"],

      // ---- Page 3 ----

      // ---- Page 4 ----

      // ---- Page 5 ----


    }
    const { error } = await supabase
      .from("satisfaction_survey_responses")
      .insert([payload]);

    if (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again.");
    } else {
      alert("Thank you for your feedback!");
      resetForm();
      router.push("/alumni");
    }
  }

  return (
    <div style={styles.shell}>
      <AlumniSidebar activePage="exit" setActivePage={handleSetActivePage} />

      <main style={styles.main}>
        {step === "intro" && (
          <ProgramSatisfactionFormIntro onProceed={() => setStep("page1")} />
        )}
        {step === "page1" && (
          <Page1 onNext={() => setStep("page2")} />
        )}
        {step === "page2" && (
          <Page2
            onBack={() => setStep("page1")}
            onNext={() => setStep("page3")}
          />
        )}
        {step === "page3" && (
          <Page3
            onBack={() => setStep("page2")}
            onNext={() => setStep("page4")}
          />
        )}
        {step === "page4" && (
          <Page4
            onBack={() => setStep("page3")}
            onNext={() => setStep("page5")}
          />
        )}
        {step === "page5" && (
          <Page5
            onBack={() => setStep("page4")}
            onSubmit={handleFinalSubmit}
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
