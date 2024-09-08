// store.js
import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),

  loadUserFromStorage: async () => {
    const storedUser = await AsyncStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const now = new Date();
      // Vérifiez si les informations de l'utilisateur sont toujours valides (moins de 7 jours)
      if (now.getTime() - new Date(userData.storedAt).getTime() < 7 * 24 * 60 * 60 * 1000) {
        set({ user: userData });
      } else {
        await AsyncStorage.removeItem('userData');
        set({ user: null });
      }
    }
  }
}));

export default useUserStore;