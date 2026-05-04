import { create } from 'zustand';

// Define exactly what fields you want to collect across all 5 pages
interface FormState {
  formData: {
    // ---- Page 1 ----
    date: string,
    studentNumber: string,
    timelinessRating: number,
    learnAbout: {
      upWebsite: boolean;
      faculty: boolean;
      friend: boolean;
      other: boolean;
      otherText: string;
    };

  }
}

interface FormState {
  formData: SurveyFormData;
  // This helper updates one field at a time
  setField: (field: keyof SurveyFormData, value: any) => void;
  // This clears the form after submission
  resetForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  formData: {}, // Starts empty
  setField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value
      }
    })),
  resetForm: () => set({ formData: {} }),
}));
