// store.ts
import { create } from "zustand";
import { cameraConfig } from "../config/config";

type Vec3 = [number, number, number];

interface CameraProps {
  position: Vec3;
  rotation: Vec3;
  fov: number;
}

interface AppState {
  autoRotateSpeed: number;
  camProps: CameraProps;
  logicWorker: Worker | null;
  setAutoRotateSpeed: (speed: number) => void;
  setCamProps: (props: Partial<CameraProps>) => void;
  initWorker: () => void;
  cleanupWorker: () => void;
  sendWorkerMessage: (payload?: string) => void;
}

const createLogicWorker = () => {
  const worker = new Worker(new URL("@/workers/logic.ts", import.meta.url), {
    type: "module",
  });
  return worker;
};

export const useAppStore = create<AppState>()((set, get) => ({
  autoRotateSpeed: 0,
  camProps: {
    position: cameraConfig.position,
    rotation: cameraConfig.rotation,
    fov: cameraConfig.fov,
  },
  logicWorker: null,

  setAutoRotateSpeed: (speed) => set({ autoRotateSpeed: speed }),

  setCamProps: (props) =>
    set((state) => ({
      camProps: {
        ...state.camProps,
        ...props,
      },
    })),

  initWorker: () => {
    const state = get();
    if (!state.logicWorker) {
      set({ logicWorker: createLogicWorker() });
    }
  },

  cleanupWorker: () => {
    const state = get();
    if (state.logicWorker) {
      state.logicWorker.terminate();
      set({ logicWorker: null });
    }
  },

  sendWorkerMessage: (payload?: string) => {
    const state = get();
    if (state.logicWorker) {
      state.logicWorker.postMessage({ payload });
    }
  },
}));
