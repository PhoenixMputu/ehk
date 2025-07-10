import { create } from 'zustand';
import { RegisterForm } from '@/types/form.type';

interface RegisterState {
  formData: RegisterForm;
  updateFormData: (field: keyof RegisterForm, value: string) => void;
  resetForm: () => void; // Ajout d'une fonction de réinitialisation
}

const initialFormState: RegisterForm = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  name: '',
  phone: ''
};

export const useRegisterStore = create<RegisterState>((set) => ({
  formData: { ...initialFormState },

  updateFormData: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value
      }
    }));
  },
  
  resetForm: () => {
    set({ formData: { ...initialFormState } });
  }
}));