"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
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
import FormProgressBar from "@/components/surveyform/programSatisfactionSteps/FormProgressBar";

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
    const supabase = getSupabaseBrowserClient();

    const { data: alumnusData } = await supabase
      .from('alumni')
      .select('alumnus_id')
      .eq('student_number', formData.studentNumber)
      .single() as { data: { alumnus_id: any } };

    const alumnusId = alumnusData.alumnus_id;

    const payload = {
      // ---- Page 1 ----
      submission_date: formData.date,
      alumnus_id: alumnusId,
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
      p1q4t1: formData.transitionHelp.otherText,
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
      p3q1: formData.cultureRatings["Immersion to the values of a liberal arts background"],
      p3q2: formData.cultureRatings["Faculty members are exemplars of 'honor and excellence'"],
      p3q3: formData.cultureRatings["Students are encouraged to participate"],
      p3q4: formData.cultureRatings["The expertise of the faculty"],
      p3q5: formData.cultureExplanation,
      p3q6: formData.servicesSatisfaction["DMPCS Staff"],
      p3q7: formData.servicesSatisfaction["Faculty members in general"],
      p3q8: formData.servicesSatisfaction["Faculty members who handle the courses"],
      p3q9: formData.servicesSatisfaction["Office of the University Registrar"],
      p3q10: formData.servicesSatisfaction["Dean's Office"],
      p3q11: formData.servicesSatisfaction["Guidance and Counseling Office"],
      p3q12: formData.servicesSatisfaction["University Library"],
      p3q13: formData.servicesSatisfaction["ICT Office"],
      p3q14: formData.servicesSatisfaction["Office of Student Affairs"],
      p3q15: formData.servicesSatisfaction["Canteen"],
      p3q16: formData.servicesSatisfaction["Guards"],
      p3q17: formData.servicesOther,

      // ---- Page 4 ----
      p4q1: formData.factorInfluences["Family obligations"],
      p4q2: formData.factorInfluences["Challenges of requirements for each course"],
      p4q3: formData.factorInfluences["Volume of requirements for each course"],
      p4q4: formData.factorInfluences["Lack of access to the intended faculty"],
      p4q5: formData.factorInfluences["Work conditions/demands"],
      p4q6: formData.factorInfluences["Financial concerns"],
      p4q7: formData.factorInfluences["Lack of motivation"],
      p4q8: formData.factorInfluences["Health issues"],
      p4q9: formData.factorInfluences["Challenges about the program in general"],
      p4q10: formData.factorInfluences["Challenges about the faculty in general"],
      p4q11: formData.factorsOther,
      p4q12: formData.consideredLeaving,
      p4q13: formData.leavingWhy,
      p4q14: formData.favoriteYearSemester,
      p4q15: formData.favoriteWhy,
      p4q16: formData.mostHelpfulCourse,
      p4q17: formData.helpfulFutureEndeavors,
      p4q18: formData.shouldNotInclude,
      p4q19: formData.shouldBeAdded,
      p4q20: formData.otherChallenges,

      // ---- Page 5 ----
      p5q1c1: formData.page5Data.strengths.curriculumStructure,
      p5q1c2: formData.page5Data.strengths.adequateFacilities,
      p5q1c3: formData.page5Data.strengths.classroomsAndSoftware,
      p5q1c4: formData.page5Data.strengths.facultyExpertise,
      p5q1c5: formData.page5Data.strengths.supportiveFaculty,
      p5q1c6: formData.page5Data.strengths.supportiveNonTeaching,
      p5q1c7: formData.page5Data.strengths.other,
      p5q2: formData.page5Data.strengths.otherText,
      p5q3c1: formData.page5Data.weaknesses.irrelevantCourses,
      p5q3c2: formData.page5Data.weaknesses.inadequateFacilities,
      p5q3c3: formData.page5Data.weaknesses.insufficientResources,
      p5q3c4: formData.page5Data.weaknesses.lackFacultyExpertise,
      p5q3c5: formData.page5Data.weaknesses.lackFacultySupport,
      p5q3c6: formData.page5Data.weaknesses.lackNonTeachingSupport,
      p5q3c7: formData.page5Data.weaknesses.other,
      p5q4: formData.page5Data.weaknesses.otherText,
      p5q5: formData.page5Data.improvementSuggestion,
      p5q6: formData.page5Data.recommendProgram,
      p5q7: formData.page5Data.recommendWhy,
      p5q8: formData.page5Data.overallImprovementSuggestion,
      p5q9: formData.page5Data.additionalComments,
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("No user found! Please log in to submit form data.");
      alert("No user found! Please log in to submit form data.");
      return;
    }

    const { data: alumniData, error: alumniError } = await supabase
      .from('alumni')
      .select('alumnus_id')
      .eq('uuid', user.id)
      .single() as { data: { alumnus_id: any } | null, error: any };
    if (alumniError || !alumniData) {
      console.error("Alumnus record not found:", alumniError);
      alert("Could not find your alumni profile.");
      return;
    }

    const currentAlumnusId = alumniData.alumnus_id;

    const { error: insertError } = await (supabase
      .from("satisfaction_survey_response") as any)
      .insert([payload]);

    if (insertError) {
      console.error("Submission error:", insertError);
      alert("Error submitting form. Please try again.");
    } else {
      alert("Thank you for your feedback!");
      const { error: updateError } = await (supabase as any)
        .from('alumni')
        .update({ satisfaction_survey_status: "Completed" })
        .eq('alumnus_id', currentAlumnusId);
    }
    resetForm();
    router.push("/alumni");
  }

  return (
    <div style={styles.shell}>
      <AlumniSidebar activePage="exit" setActivePage={handleSetActivePage} />

      <main style={styles.main}>
        {step === "intro" && (
          <ProgramSatisfactionFormIntro onProceed={() => setStep("page1")} />
        )}
        {step !== "intro" && (
          <>
            {step === "page1" && (
              <Page1
                onNext={() => setStep("page2")}
                progressBar={<FormProgressBar currentStep={step} />}
              />
            )}
            {step === "page2" && (
              <Page2
                onBack={() => setStep("page1")}
                onNext={() => setStep("page3")}
                progressBar={<FormProgressBar currentStep={step} />}
              />
            )}
            {step === "page3" && (
              <Page3
                onBack={() => setStep("page2")}
                onNext={() => setStep("page4")}
                progressBar={<FormProgressBar currentStep={step} />}
              />
            )}
            {step === "page4" && (
              <Page4
                onBack={() => setStep("page3")}
                onNext={() => setStep("page5")}
                progressBar={<FormProgressBar currentStep={step} />}
              />
            )}
            {step === "page5" && (
              <Page5
                onBack={() => setStep("page4")}
                onSubmit={handleFinalSubmit}
                progressBar={<FormProgressBar currentStep={step} />}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

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