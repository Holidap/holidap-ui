import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  user: null,
  login: (username: string) => set({ isLoggedIn: true, user: username }),
  logout: () => set({ isLoggedIn: false, user: null }),
}));
