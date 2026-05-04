"use client";

import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

interface AlumniTracerFormProps {
  onSubmit?: () => void;
}

type SatisfactionLevel = "Very Satisfied" | "Satisfied" | "Neutral" | "Dissatisfied" | "Very Dissatisfied" | "";
type InterviewAnswer = "Yes" | "No" | "Maybe, I'll join later at some other time" | "";

interface FormData {
  lastName: string;
  firstName: string;
  middleInitial: string;
  monthYearGraduated: string;
  studentNumber: string;
  workField: string;
  pursuingHigherStudies: string;
  degreesHeld: string;
  employed: string;
  workRelated: string;
  suggestions: string;
  satisfaction: SatisfactionLevel;
  satisfactionReasons: string;
  degreeHelpfulness: string;
  programImprovements: string;
  emailUpdates: string;
  alumniInterview: InterviewAnswer;
  timeToFindJob: string;
  currentEmploymentStatus: string;
  dateHired: string;
  currentWorkplace: string;
  currentPosition: string;
}

export default function AlumniTracerForm({ onSubmit }: AlumniTracerFormProps) {
  const supabase = getSupabaseBrowserClient();
  const [loading, setLoading] = useState(true);

  //const variables to store user input into
  const [natureOfWork, setNatureOfWork] = useState("");
  const [higherStudies, setHigherStudies] = useState("");
  const [listOfHigherStudies, setListOfHigherStudies] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [workRelation, setWorkRelation] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [satisfactionLevel, setSatisfactionLevel] = useState<SatisfactionLevel>("");
  const [satisfactionReason, setSatisfactionReason] = useState("");
  const [waysDegprogHelped, setWaysDegprogHelped] = useState("");
  const [degprogSuggestions, setDegprogSuggestions] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState("");
  const [interviewInterest, setInterviewInterest] = useState<InterviewAnswer>("");
  const [dateAnswered, setDateAnswered] = useState(new Date().toISOString().split('T')[0]);
  const [timeToFindJob, setTimeToFindJob] = useState("");
  const [currentEmploymentStatus, setCurrentEmploymentStatus] = useState("");
  const [dateHired, setDateHired] = useState("");
  const [currentWorkplace, setCurrentWorkplace] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState<FormData>({
    lastName: "",
    firstName: "",
    middleInitial: "",
    monthYearGraduated: "",
    studentNumber: "",
    workField: "",
    pursuingHigherStudies: "",
    degreesHeld: "",
    employed: "",
    workRelated: "",
    suggestions: "",
    satisfaction: "",
    satisfactionReasons: "",
    degreeHelpfulness: "",
    programImprovements: "",
    emailUpdates: "",
    alumniInterview: "",
    timeToFindJob: "",
    currentEmploymentStatus: "",
    dateHired: "",
    currentWorkplace: "",
    currentPosition: "",
  });

  useEffect(() => {
    async function getProfile() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Supabase auth error:", userError);
        setLoading(false);
        return;
      }

      if (user) {
        const result: any = await supabase
          .from('users')
          .select('fname, mname, lname, alumni!inner(student_number, graduation_month, graduation_year)')
          .eq('uuid', user.id)
          .single();

        if (result.error) {
          console.error("Profile query error:", result.error);
          setLoading(false);
          return;
        }

        if (!result.data) {
          console.warn("No profile data found for user", user.id);
          setLoading(false);
          return;
        }

        const data = result.data;
        const alumni = data.alumni;
        const month = alumni?.graduation_month;
        const year = alumni?.graduation_year;
        const monthYearGraduated = month && year ? `${year}-${String(month).padStart(2, "0")}` : "";
        setForm((prev) => ({
          ...prev,
          lastName: data.lname || "",
          firstName: data.fname || "",
          middleInitial: data.mname ? data.mname.charAt(0) : "",
          studentNumber: alumni?.student_number ?? "",
          monthYearGraduated,
        }));
      }

      setLoading(false);
    }

    getProfile();
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!natureOfWork || !higherStudies || !listOfHigherStudies || !employmentStatus || !workRelation || !suggestions || !satisfactionLevel || !satisfactionReason || !waysDegprogHelped || !degprogSuggestions || !receiveUpdates || !interviewInterest || !timeToFindJob || !currentEmploymentStatus || !currentWorkplace || !currentPosition) {
      setFormError('Please fill out all  fields before submitting the form.');
      console.error("Form submission error: Missing required fields");
      return;
    } else {
      setFormError('');
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
      .from('tracer_survey_response')
      .insert([
        {
          alumnus_id: currentAlumnusId,
          nature_of_work: natureOfWork,
          higher_studies: higherStudies,
          list_for_higher_studies: listOfHigherStudies,
          employment_status: employmentStatus,
          work_relation: workRelation,
          share_suggestions: suggestions,
          satisfaction_level: satisfactionLevel,
          satisfaction_reason: satisfactionReason,
          ways_degprog_helped: waysDegprogHelped,
          degprog_suggestions: degprogSuggestions,
          receive_updates: receiveUpdates,
          interview_interest: interviewInterest,
          time_to_find_job: timeToFindJob,
          current_employment_status: currentEmploymentStatus,
          date_hired: dateHired || null,
          current_workplace: currentWorkplace,
          current_position: currentPosition,
          date_answered: dateAnswered,
        }
      ] as any) as any);

      if (insertError) {
        console.error("Insert failed:", insertError.message);
        alert("Error saving survey response.");
      } else {
        alert("Survey submitted successfully!");
        const { error: updateError } = await (supabase as any)
          .from('alumni')
          .update({ tracer_survey_status: "Completed" })
          .eq('alumnus_id', currentAlumnusId);
      }

    onSubmit?.();
  };


  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const satisfactionLevels: SatisfactionLevel[] = [
    "Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied",
  ];

  const interviewOptions: InterviewAnswer[] = [
    "Yes", "No", "Maybe, I'll join later at some other time",
  ];

  if (loading) {
    return (
      <div style={styles.content}>
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.content}>

      {/* Page Header */}
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Alumni Tracer Form</h1>
        <p style={styles.pageSubtitle}>
          Complete the Alumni Tracer form to contribute valuable feedback and data.
        </p>
      </div>

      <div style={styles.formContainer}>

        {/* ── PERSONAL INFORMATION ── */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Personal Information</h2>
          <div style={styles.divider} />

          <div style={styles.twoColumnRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Last Name</label>
              <input style={styles.textInput} value={form.lastName} onChange={set("lastName")} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>First Name</label>
              <input style={styles.textInput} value={form.firstName} onChange={set("firstName")} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Middle Initial</label>
              <input style={styles.textInput} value={form.middleInitial} onChange={set("middleInitial")} maxLength={3} />
            </div>
          </div>

          <div style={{ ...styles.twoColumnRow, maxWidth: "500px" }}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Month and Year Graduated</label>
              <input style={styles.textInput} type="month" value={form.monthYearGraduated} onChange={set("monthYearGraduated")} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Student Number</label>
              <input style={styles.textInput} value={form.studentNumber} onChange={set("studentNumber")} />
            </div>
          </div>
        </div>

        {/* ── EMPLOYMENT / EDUCATION ── */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Employment Details, Further Education, and Career Outcomes</h2>
          <div style={styles.divider} />

          <div style={styles.twoColumnRow}>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>How long did it take you to find a job after graduation?</label>
              <select style={styles.textInput} value={form.timeToFindJob} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setTimeToFindJob(e.target.value); set("timeToFindJob")(e); }}>
                <option value="">Select option</option>
                <option>Less than 1 month</option>
                <option>1–3 months</option>
                <option>4–6 months</option>
                <option>7–12 months</option>
                <option>More than 1 year</option>
                <option>Not applicable</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>Current status of employment</label>
              <select style={styles.textInput} value={form.currentEmploymentStatus} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setCurrentEmploymentStatus(e.target.value); set("currentEmploymentStatus")(e); }}>
                <option value="">Select option</option>
                <option>Employed (Full-time)</option>
                <option>Employed (Part-time)</option>
                <option>Self-employed / Business owner</option>
                <option>Unemployed (looking for work)</option>
                <option>Unemployed (not looking for work)</option>
                <option>Further studies / Not yet employed</option>
              </select>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Date hired in present employment if employed, self-employed or with business:
            </label>
            <p style={styles.helperText}>
              (If you cannot recall the exact date, just provide the month and year, and input the day as 1. For example, if you were hired sometime in June 2019, input June 1, 2019.)
            </p>
            <input style={{ ...styles.textInput, maxWidth: "260px" }} type="date" value={form.dateHired} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDateHired(e.target.value); set("dateHired")(e); }} />
          </div>

          <div style={styles.twoColumnRow}>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>Where do you work now? (Please specify company name and location.)</label>
              <input style={styles.textInput} value={form.currentWorkplace} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCurrentWorkplace(e.target.value); set("currentWorkplace")(e); }} placeholder="" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>What is your current position for your job?</label>
              <input style={styles.textInput} value={form.currentPosition} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCurrentPosition(e.target.value); set("currentPosition")(e); }} placeholder="" />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What is the nature of your work? (Education, IT/ICT Position in the
              Organization/Company, Business, Research and Development, Others, etc.)
              If currently employed, please provide the name of your employer.
            </label>
            <textarea style={styles.textarea} rows={4} value={form.workField} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setNatureOfWork(e.target.value); set("workField")(e)}}
              placeholder="Share with us the nature of your work..." />
          </div>

          <div style={styles.twoColumnRow}>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>Are you pursuing higher studies?</label>
              <select style={styles.textInput} value={form.pursuingHigherStudies} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setHigherStudies(e.target.value); set("pursuingHigherStudies")(e)}}>
                <option value="">Select option</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>
                Please specify degree program, field of study, and university.
              </label>
              <textarea style={styles.textarea} rows={3} value={form.degreesHeld} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setListOfHigherStudies(e.target.value); set("degreesHeld")(e)}}
                placeholder="List each program if applicable..." />
            </div>
          </div>

          <div style={styles.twoColumnRow}>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>Are you currently employed?</label>
              <div style={styles.checkboxList}>
                {["Yes", "No"].map((opt) => (
                  <label key={opt} style={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="employed"
                      value={opt}
                      checked={form.employed === opt}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmploymentStatus(e.target.value); set("employed")(e)}}
                      style={styles.checkboxInput}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.questionLabel}>Is your work related to your degree program?</label>
              <div style={styles.checkboxList}>
                {["Yes", "No"].map((opt) => (
                  <label key={opt} style={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="workRelated"
                      value={opt}
                      checked={form.workRelated === opt}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setWorkRelation(e.target.value); set("workRelated")(e)}}
                      style={styles.checkboxInput}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── PROGRAM FEEDBACK ── */}
        <div style={styles.sectionBlock}>
          <h2 style={styles.sectionTitle}>Program Feedback</h2>
          <div style={styles.divider} />

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Please share your suggestions for activities (programs, mentoring, etc.) that
              allow us to better help alumni find jobs after graduation. Please elaborate below.
            </label>
            <textarea style={styles.textarea} rows={5} value={form.suggestions} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setSuggestions(e.target.value); set("suggestions")(e)}}
              placeholder="Share your suggestions with us..." />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What is your level of satisfaction for your undergraduate study under the BSCS degree program?
            </label>
            <div style={styles.ratingCard}>
              {satisfactionLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  style={{
                    ...styles.satisfactionBtn,
                    ...(form.satisfaction === level ? styles.satisfactionBtnActive : {}),
                  }}
                  onClick={() => {setForm((prev) => ({ ...prev, satisfaction: level })); setSatisfactionLevel(level)}}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>Reasons for giving that rating above:</label>
            <textarea style={styles.textarea} rows={4} value={form.satisfactionReasons} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setSatisfactionReason(e.target.value); set("satisfactionReasons")(e)}}
              placeholder="Share your reasons with us..." />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              In what way did your degree program help you in your professional career?
            </label>
            <textarea style={styles.textarea} rows={4} value={form.degreeHelpfulness} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setWaysDegprogHelped(e.target.value); set("degreeHelpfulness")(e)}}
              placeholder="Share your thoughts with us..." />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              What are your suggestions on how to improve the program in terms of structure,
              content, teaching, assessments, etc.?
            </label>
            <textarea style={styles.textarea} rows={4} value={form.programImprovements} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setDegprogSuggestions(e.target.value); set("programImprovements")(e)}}
              placeholder="Share your suggestions with us..." />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Would you like to get updates regarding new DMPCS program offerings, trainings
              and/or activities for alumni? If yes, please provide your email below.
            </label>
            <input style={styles.textInput} type="email" value={form.emailUpdates} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setReceiveUpdates(e.target.value); set("emailUpdates")(e)}}
              placeholder="email@example.com" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.questionLabel}>
              Would you be interested in taking part as an alumni interviewer for the review
              and revision of the BSCS Program?
            </label>
            <div style={styles.checkboxList}>
              {interviewOptions.map((opt) => (
                <label key={opt} style={styles.checkboxLabel}>
                  <input
                    type="radio"
                    name="alumniInterview"
                    value={opt}
                    checked={form.alumniInterview === opt}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setInterviewInterest(e.target.value as InterviewAnswer); set("alumniInterview")(e)}}
                    style={styles.checkboxInput}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={styles.actionRow}>
          <button style={styles.nextBtn} onClick={handleSubmit}>
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}

// --- Styles --- (exact mirror of ProgramSatisfactionForm styles)
const styles: { [key: string]: React.CSSProperties } = {
  content: {
    width: "100%",
    maxWidth: "1400px",
  },
  pageHeader: {
    marginBottom: "48px",
  },
  pageTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 10px",
    letterSpacing: "-0.5px",
  },
  pageSubtitle: {
    fontSize: "13px",
    color: "#555",
    margin: 0,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    paddingBottom: "40px",
  },
  sectionBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#9b1d2a",
    margin: 0,
  },
  divider: {
    height: "1px",
    backgroundColor: "#e0e0e0",
    width: "100%",
    marginTop: "-10px",
  },
  twoColumnRow: {
    display: "flex",
    gap: "24px",
    width: "100%",
    maxWidth: "700px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
    width: "100%",
  },
  label: {
    fontSize: "12px",
    color: "#333",
    fontWeight: "500",
  },
  questionLabel: {
    fontSize: "13px",
    color: "#333",
    fontWeight: "500",
    lineHeight: "1.5",
    marginBottom: "4px",
  },
  helperText: {
    fontSize: "11px",
    color: "#777",
    margin: "-6px 0 0",
    lineHeight: "1.5",
    fontStyle: "italic",
  },
  textInput: {
    border: "1px solid #dcdcdc",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  textarea: {
    border: "1px solid #dcdcdc",
    borderRadius: "8px",
    padding: "16px",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    width: "100%",
    backgroundColor: "#ffffff",
    resize: "vertical" as const,
    fontFamily: "inherit",
  },
  ratingCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    border: "1px solid #eaeaea",
    borderRadius: "12px",
    padding: "24px 40px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    marginTop: "8px",
    width: "100%",
    flexWrap: "wrap" as const,
    gap: "10px",
  },
  satisfactionBtn: {
    padding: "7px 18px",
    borderRadius: "20px",
    border: "1px solid #dcdcdc",
    backgroundColor: "#ffffff",
    fontSize: "12px",
    color: "#555",
    cursor: "pointer",
    fontWeight: "500",
  },
  satisfactionBtnActive: {
    backgroundColor: "#9b1d2a",
    borderColor: "#9b1d2a",
    color: "#ffffff",
  },
  checkboxList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "4px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "13px",
    color: "#333",
    cursor: "pointer",
  },
  checkboxInput: {
    width: "16px",
    height: "16px",
    accentColor: "#9b1d2a",
    cursor: "pointer",
  },
  actionRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  nextBtn: {
    backgroundColor: "#9b1d2a",
    color: "#ffffff",
    border: "none",
    borderRadius: "24px",
    padding: "12px 64px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(155, 29, 42, 0.2)",
  },
};