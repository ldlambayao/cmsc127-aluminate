import { create } from 'zustand';

// Define exactly what fields you want to collect across all 5 pages
export interface SurveyData {
  // ---- Page 1 ----
  date: string,
  studentNumber: string,
  timelinessRating: number | null,
  learnAbout: {
    upWebsite: boolean | null;
    faculty: boolean | null;
    friend: boolean | null;
    other: boolean | null;
    otherText: string;
  };
  enrollmentFactors: Record<string, number>;
  transitionDifficulty: number | null;
  transitionReason: string;
  transitionHelp: {
    bridging: boolean | null;
    refresher: boolean | null;
    other: boolean | null;
    otherText: string;
  };

  preparationSuggestion: string;

    // ---- Page 2 ----
  experienceSatisfaction: Record<string, string | null>;
  learningOutcomeSatisfaction: Record<string, string | null>;

  // ---- Page 3 ----
  cultureRatings: Record<string, string | null>;
  cultureExplanation: string;
  servicesSatisfaction: Record<string, string | null>;
  servicesOther: string;

  // ---- Page 4 ----
  factorInfluences: Record<string, string | null>;
  factorsOther: string;
  consideredLeaving: string;
  leavingWhy: string;
  favoriteYearSemester: string;
  favoriteWhy: string;
  mostHelpfulCourse: string;
  helpfulFutureEndeavors: string;
  shouldNotInclude: string;
  shouldBeAdded: string;
  otherChallenges: string;

  // ---- Page 5 ----
  page5Data: {
    strengths: Record<string, boolean | string>;
    weaknesses: Record<string, boolean | string>;
    improvementSuggestion: string;
    recommendProgram: string;
    recommendWhy: string;
    overallImprovementSuggestion: string;
    additionalComments: string;
  }
}

interface FormState {
  formData: SurveyData;
  // ---- Page 1 setters ----
  setField: (field: keyof SurveyData, value: any) => void;
  setFactorRating: (factorName: string, rating: number) => void;

  // ---- Page 2 setters ----
  setExperienceRating: (item: string, rating: string) => void;
  setLearningRating: (item: string, rating: string) => void;

  // ---- Page 3 setters ----
  setCultureChange: (item: string, rating: string) => void;
  setServicesChange: (item: string, rating: string) => void;


  // ---- Page 4 setters ----
  setFactorChange: (item: string, rating: string) => void;

  resetForm: () => void;
}

const initialState: SurveyData = {
  // ---- Page 1 ----
  date: new Date().toISOString().split('T')[0],
  studentNumber: "",
  timelinessRating: null,
  learnAbout: {
    upWebsite: null,
    faculty: null,
    friend: null,
    other: null,
    otherText: "",
  },
  enrollmentFactors: {},
  transitionDifficulty: null,
  transitionReason: "",
  transitionHelp: {
    bridging: null,
    refresher: null,
    other: null,
    otherText: "",
  },
  preparationSuggestion: "",

  // ---- Page 2 ----
  experienceSatisfaction: {},
  learningOutcomeSatisfaction: {},

  // ---- Page 3 ----
  cultureRatings: {},
  cultureExplanation: "",
  servicesSatisfaction: {},
  servicesOther: "",

  // ---- Page 4 ----
  factorInfluences: {},
  factorsOther: "",
  consideredLeaving: "",
  leavingWhy: "",
  favoriteYearSemester: "",
  favoriteWhy: "",
  mostHelpfulCourse: "",
  helpfulFutureEndeavors: "",
  shouldNotInclude: "",
  shouldBeAdded: "",
  otherChallenges: "",

  // ---- Page 5 ----
  page5Data: {
    strengths: {},
    weaknesses: {},
    improvementSuggestion: "",
    recommendProgram: "",
    recommendWhy: "",
    overallImprovementSuggestion: "",
    additionalComments: "",
  }
};

export const useFormStore = create<FormState>((set) => ({
  formData: initialState,

  // ---- Page 1 setters ----
  setField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value
      }
    })),

  setFactorRating: (factorName, rating) =>
    set((state) => ({
      formData: {
        ...state.formData,
        enrollmentFactors: { ...state.formData.enrollmentFactors, [factorName]: rating, },
      },
    })),

  // ---- Page 2 setters ----
  setExperienceRating: (item, rating) =>
    set((state) => ({
      formData: {
        ...state.formData,
        experienceSatisfaction: { ...state.formData.experienceSatisfaction, [item]: rating },
      },
    })),

  setLearningRating: (item, rating) =>
    set((state) => ({
      formData: {
        ...state.formData,
        learningOutcomeSatisfaction: { ...state.formData.learningOutcomeSatisfaction, [item]: rating },
      },
    })),


  // ---- Page 3 setters ----
  setCultureChange: (item, rating) =>
    set((state) => ({
      formData: {
        ...state.formData,
        cultureRatings: { ...state.formData.cultureRatings, [item]: rating },
      },
    })),

  setServicesChange: (item, rating) =>
    set((state) => ({
      formData: {
        ...state.formData,
        servicesSatisfaction: { ...state.formData.servicesSatisfaction, [item]: rating },
      },
    })),


  // ---- Page 4 setters ----
  setFactorChange: (factorName, rating) =>
    set((state) => ({
      formData: {
        ...state.formData,
        factorInfluences: { ...state.formData.factorInfluences, [factorName]: rating },
      },
    })),

  resetForm: () => set({ formData: initialState }),
}));
