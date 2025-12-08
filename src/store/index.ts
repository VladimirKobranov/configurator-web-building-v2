// store.ts
import { create } from "zustand";

// Define types for state & actions
interface AppState {
  autoRotateSpeed: number;
  setAutoRotateSpeed: (speed: number) => void;
}

// Create store using the curried form of `create`
export const useAppStore = create<AppState>()((set) => ({
  autoRotateSpeed: 0,

  setAutoRotateSpeed: (speed) => set({ autoRotateSpeed: speed }),
}));
