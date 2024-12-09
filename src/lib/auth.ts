import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  token: string;
  avatar: string;
  email: string;
  login: (
    username: string,
    token: string,
    avatar: string,
    email: string
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: !!Cookies.get("accessToken"),
      username: "",
      token: "",
      avatar: "",
      email: "",
      login: (
        username: string,
        token: string,
        avatar: string,
        email: string
      ) => {
        set({
          isLoggedIn: !!token,
          username,
          token,
          avatar,
          email,
        });
      },
      logout: () => {
        set({
          isLoggedIn: false,
          username: "",
          token: "",
          avatar: "",
          email: "",
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
