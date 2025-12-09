// store.ts
import { create } from "zustand";
import { cameraConfig, buildingConfig } from "../config/config";

type Vec3 = [number, number, number];

interface CameraProps {
  position: Vec3;
  rotation: Vec3;
  fov: number;
}

interface BuildingProps {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
}

interface AppState {
  autoRotateSpeed: number;
  camProps: CameraProps;
  logicWorker: Worker | null;
  buildingProps?: BuildingProps;
  setAutoRotateSpeed: (speed: number) => void;
  setCamProps: (props: Partial<CameraProps>) => void;
  setBuildingProps: (props: Partial<BuildingProps>) => void;
  initWorker: () => void;
  cleanupWorker: () => void;
  sendWorkerMessage: (payload?: BuildingProps) => void;
}

const createLogicWorker = () => {
  const worker = new Worker(new URL("@/workers/logic.ts", import.meta.url), {
    type: "module",
  });

  // Listen for messages from the worker
  worker.onmessage = (event) => {
    console.log("Received from worker:", event.data);
    // Here you can update the store or trigger other actions with the result
  };

  worker.onerror = (error) => {
    console.error("Worker error:", error);
  };

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
  buildingProps: buildingConfig,

  setAutoRotateSpeed: (speed) => set({ autoRotateSpeed: speed }),

  setCamProps: (props) =>
    set((state) => ({
      camProps: {
        ...state.camProps,
        ...props,
      },
    })),

  setBuildingProps: (props) =>
    set((state) => ({
      buildingProps: {
        ...state.buildingProps,
        ...props,
      } as BuildingProps,
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

  sendWorkerMessage: (payload?: BuildingProps) => {
    const state = get();
    if (state.logicWorker) {
      state.logicWorker.postMessage({ payload });
    }
  },
}));
