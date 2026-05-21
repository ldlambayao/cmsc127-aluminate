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

  const handleFinalSubmit = async (e: any, finalPageData?: any) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    const supabase = getSupabaseBrowserClient();

    const { data: alumnusData } = await supabase
      .from('alumni')
      .select('alumnus_id')
      .eq('student_number', formData.studentNumber)
      .single() as { data: { alumnus_id: any } };

    const alumnusId = alumnusData.alumnus_id;

    const section1_payload = {
      q1c1: formData.learnAbout.upWebsite,
      q1c2: formData.learnAbout.faculty,
      q1c3: formData.learnAbout.friend,
      q1t1: formData.learnAbout.otherText,
      q2: formData.enrollmentFactors["Reputation of UP Mindanao"],
      q3: formData.enrollmentFactors["Reputation of UP Mindanao Department of Math, Physics and Computer Science"],
      q4: formData.enrollmentFactors["Reputation of the BSAM program"],
      q5: formData.enrollmentFactors["Reputation/Expertise of the Faculty members"],
      q6: formData.enrollmentFactors["The program matches my interests"],
      q7: formData.enrollmentFactors["Financial consideration"],
      q8: formData.enrollmentFactors["Recommendation of a friend"],
      q9: formData.enrollmentFactors["Encouragement of parent/s or relatives"],
      q10: formData.enrollmentFactors["Encouragement of a faculty member"]
    }

    const { data: section1ID, error: section1InsertError } = await (supabase
      .from("satisfaction_section1") as any)
      .insert([section1_payload])
      .select("section1_id")
      .single();

    if (section1InsertError) {
      console.error("Error inserting section 1 info: ", section1InsertError);
    }

    const section2_payload = {
      q1: formData.transitionDifficulty,
      q2: formData.transitionReason,
      q3c1: formData.transitionHelp.bridging,
      q3c2: formData.transitionHelp.refresher,
      q3c3: formData.transitionHelp.other,
      q3t1: formData.transitionHelp.otherText,
      q4: formData.preparationSuggestion,
    }

    const { data: section2ID, error: section2InsertError } = await (supabase
      .from("satisfaction_section2") as any)
      .insert([section2_payload])
      .select("section2_id")
      .single();

    if (section2InsertError) {
      console.error("Error inserting section 2 info: ", section2InsertError);
    }

    const section3_payload = {
      q1: formData.experienceSatisfaction["Overall BSAM curriculum at UP Mindanao"],
      q2: formData.experienceSatisfaction["Overall experience at the Department of Math, Physics, and Computer Science"],
      q3: formData.experienceSatisfaction["Your academic experience at UP Mindanao"],
      q4: formData.experienceSatisfaction["The atmosphere of the faculty"],
      q5: formData.experienceSatisfaction["In meeting/fulfilling the expected program outcomes"],
      q6: formData.experienceSatisfaction["Alignment of the module learning outcomes with the program learning outcomes"],
      q7: formData.learningOutcomeSatisfaction["Development of a holistic understanding of the same general education (GE) courses"],
      q8: formData.learningOutcomeSatisfaction['Mastery of "foundational concepts of mathematics"'],
      q9: formData.learningOutcomeSatisfaction['Mastery of "fundamental concepts of statistics"'],
      q10: formData.learningOutcomeSatisfaction['Mastery of "fundamental concepts of computer science"'],
      q11: formData.learningOutcomeSatisfaction["Enhanced academic thinking skills through solving complex mathematical and technical problems"],
      q12: formData.learningOutcomeSatisfaction["Ability to use appropriate numerical/GIS tools based on effectiveness of the solution process"],
      q13: formData.learningOutcomeSatisfaction["Ability to use R/R tools to efficiently aid the solution process"],
      q14: formData.learningOutcomeSatisfaction["Ability to use statistical methods and efficiency of the various disciplines"],
      q15: formData.learningOutcomeSatisfaction["Implementation/Specification of computer programs to support multiple computations"],
      q16: formData.learningOutcomeSatisfaction["Ability to apply data analytics techniques to support research programs"],
      q17: formData.learningOutcomeSatisfaction["Readiness in confidence to pursue a master's degree in applied mathematics"],
      q18: formData.learningOutcomeSatisfaction["Readiness in confidence to pursue a master's degree in statistics"],
      q19: formData.learningOutcomeSatisfaction["Readiness in confidence to pursue a master's degree in computer science"],
    }

    const { data: section3ID, error: section3InsertError } = await (supabase
      .from("satisfaction_section3") as any)
      .insert([section3_payload])
      .select("section3_id")
      .single();

    if (section3InsertError) {
      console.log("Error inserting section 3 info: ", section3InsertError);
    }

    const section4_payload = {
      q1: formData.cultureRatings["Immersion to the values of a liberal arts background"],
      q2: formData.cultureRatings["Faculty members are exemplars of 'honor and excellence'"],
      q3: formData.cultureRatings["Students are encouraged to participate"],
      q4: formData.cultureRatings["The expertise of the faculty"],
      q5: formData.cultureExplanation,
    }

    const { data: section4ID, error: section4InsertError } = await (supabase
      .from("satisfaction_section4") as any)
      .insert([section4_payload])
      .select("section4_id")
      .single();

    if (section4InsertError) {
      console.log("Error inserting section 4 info: ", section4InsertError);
    }

    const section5_payload = {
      q1: formData.servicesSatisfaction["DMPCS Staff"],
      q2: formData.servicesSatisfaction["Faculty members in general"],
      q3: formData.servicesSatisfaction["Faculty members who handle the courses"],
      q4: formData.servicesSatisfaction["Office of the University Registrar"],
      q5: formData.servicesSatisfaction["Dean's Office"],
      q6: formData.servicesSatisfaction["Guidance and Counseling Office"],
      q7: formData.servicesSatisfaction["University Library"],
      q8: formData.servicesSatisfaction["ICT Office"],
      q9: formData.servicesSatisfaction["Office of Student Affairs"],
      q10: formData.servicesSatisfaction["Canteen"],
      q11: formData.servicesSatisfaction["Guards"],
      q12: formData.servicesOther,
    }

    const { data: section5ID, error: section5InsertError } = await (supabase
      .from("satisfaction_section5") as any)
      .insert([section5_payload])
      .select("section5_id")
      .single();

    if (section5InsertError) {
      console.log("Error inserting section 5 info: ", section5InsertError);
    }

    const section6_payload = {
      q1: formData.factorInfluences["Family obligations"],
      q2: formData.factorInfluences["Challenges of requirements for each course"],
      q3: formData.factorInfluences["Volume of requirements for each course"],
      q4: formData.factorInfluences["Lack of access to the intended faculty"],
      q5: formData.factorInfluences["Work conditions/demands"],
      q6: formData.factorInfluences["Financial concerns"],
      q7: formData.factorInfluences["Lack of motivation"],
      q8: formData.factorInfluences["Health issues"],
      q9: formData.factorInfluences["Challenges about the program in general"],
      q10: formData.factorInfluences["Challenges about the faculty in general"],
      q11: formData.factorsOther,
      q12: formData.consideredLeaving,
      q13: formData.leavingWhy,
      q14: formData.favoriteYearSemester,
      q15: formData.favoriteWhy,
      q16: formData.mostHelpfulCourse,
      q17: formData.helpfulFutureEndeavors,
      q18: formData.shouldNotInclude,
      q19: formData.shouldBeAdded,
      q20: formData.otherChallenges,
    }

    const { data: section6ID, error: section6InsertError } = await (supabase
      .from("satisfaction_section6") as any)
      .insert([section6_payload])
      .select("section6_id")
      .single();

    if (section6InsertError) {
      console.log("Error inserting section 6 info: ", section6InsertError);
    }

    const section7_payload = {
      q1c1: formData.page5Data.strengths.curriculumStructure,
      q1c2: formData.page5Data.strengths.adequateFacilities,
      q1c3: formData.page5Data.strengths.classroomsAndSoftware,
      q1c4: formData.page5Data.strengths.facultyExpertise,
      q1c5: formData.page5Data.strengths.supportiveFaculty,
      q1c6: formData.page5Data.strengths.supportiveNonTeaching,
      q1c7: formData.page5Data.strengths.other,
      q1t1: formData.page5Data.strengths.otherText,
      q2c1: formData.page5Data.weaknesses.irrelevantCourses,
      q2c2: formData.page5Data.weaknesses.inadequateFacilities,
      q2c3: formData.page5Data.weaknesses.insufficientResources,
      q2c4: formData.page5Data.weaknesses.lackFacultyExpertise,
      q2c5: formData.page5Data.weaknesses.lackFacultySupport,
      q2c6: formData.page5Data.weaknesses.lackNonTeachingSupport,
      q2c7: formData.page5Data.weaknesses.other,
      q2t1: formData.page5Data.weaknesses.otherText,
      q3: formData.page5Data.improvementSuggestion,
      q4: formData.page5Data.recommendProgram,
      q5: formData.page5Data.recommendWhy,
      q6: formData.page5Data.overallImprovementSuggestion,
      q7: formData.page5Data.additionalComments,
    }

    const { data: section7ID, error: section7InsertError } = await (supabase
      .from("satisfaction_section7") as any)
      .insert([section7_payload])
      .select("section7_id")
      .single();

    if (section7InsertError) {
      console.log("Error inserting section 7 info: ", section7InsertError);
    }

    const main_payload = {
      submission_date: formData.date,
      alumnus_id: alumnusId,
      q1: formData.timelinessRating,
      section1_id: section1ID.section1_id,
      section2_id: section2ID.section2_id,
      section3_id: section3ID.section3_id,
      section4_id: section4ID.section4_id,
      section5_id: section5ID.section5_id,
      section6_id: section6ID.section6_id,
      section7_id: section7ID.section7_id,
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
      .from("ssatisfaction_survey_response") as any)
      .insert([main_payload]);

    if (insertError) {
      console.error("Submission error:", insertError);
      alert("Error submitting form. Please try again.");
    } else {
      const { error: updateError } = await (supabase as any)
        .from('alumni')
        .update({ satisfaction_survey_status: "Completed" })
        .eq('alumnus_id', currentAlumnusId);

        if(updateError) {
          throw updateError;
        } else {
          alert("Thank you for your feedback!");
        }

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
