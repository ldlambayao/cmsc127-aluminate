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

};

export const useFormStore = create<FormState>((set) => ({
  formData: initialState,

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
        enrollmentFactors: {
          ...state.formData.enrollmentFactors,
          [factorName]: rating,
        },
      },
    })),

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
  resetForm: () => set({ formData: initialState }),
}));
