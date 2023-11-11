import create from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: '',
  setAuth: (isAuthenticated, user) => set({ isAuthenticated, user }),
}));

export default useAuthStore;