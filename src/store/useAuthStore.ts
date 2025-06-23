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
  login: (username: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    set({ isLoggedIn: true, user: username });
  },
  logout: () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    set({ isLoggedIn: false, user: null });
  },
}));
