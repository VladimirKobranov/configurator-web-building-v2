import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

type ThemeState = {
  theme: Theme;
  systemDark: boolean;
  setTheme: (theme: Theme) => void;
  setSystemDark: (systemDark: boolean) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      systemDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
      setTheme: (theme) => set({ theme }),
      setSystemDark: (systemDark) => set({ systemDark }),
    }),
    {
      name: "building-configurator-theme",
      partialize: ({ theme }) => ({ theme }),
    },
  ),
);
