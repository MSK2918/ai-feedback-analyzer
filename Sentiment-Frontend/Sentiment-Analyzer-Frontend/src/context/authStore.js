import { create } from 'zustand';
import { getUser } from '../api/userApi';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  fetchUser: async () => {
    try {
      const response = await getUser();
      if (response) {
        set({
          user: response,
          isAuthenticated: true,
        });
        localStorage.setItem('user', JSON.stringify(response));
      } else {
        set({
          user: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('user');
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
      });
      localStorage.removeItem('user');
    } finally {
      set({ loading: false });
    }
  },
}));


export { useAuthStore };

