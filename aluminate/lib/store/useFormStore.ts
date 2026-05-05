import { create } from 'zustand';

// Define exactly what fields you want to collect across all 5 pages
interface SurveyData {
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
  };
  preparationSuggestion: string;

    // ---- Page 2 ----

}

interface FormState {
  formData: SurveyData;
  setField: (field: keyof SurveyData, value: any) => void;
  setFactorRatings: (factorName: string, rating: number) => void;
  resetForm: () => void;
}

const initialState: SurveyData = {
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
  },
  preparationSuggestion: "",
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

  setFactorRatings: (factorName, rating) =>
    set((state) => ({
      formData: {
        ...state.formData,
        enrollmentFactors: {
          ...state.formData.enrollmentFactors,
          [factorName]: rating,
        },
      },
    })),
  resetForm: () => set({ formData: initialState }),
}));
