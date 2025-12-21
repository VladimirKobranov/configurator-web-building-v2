// store.ts
import { create } from "zustand";
import { cameraConfig, buildingConfig } from "@/config/config";

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
  offset: number;
}

interface AppState {
  autoRotateSpeed: number;
  camProps: CameraProps;
  logicWorker: Worker | null;
  buildingProps?: BuildingProps;
  building: any[];
  isScattered: boolean;
  offsets: [number, number, number];
  setAutoRotateSpeed: (speed: number) => void;
  setCamProps: (props: Partial<CameraProps>) => void;
  setBuildingProps: (props: Partial<BuildingProps>) => void;
  resetBuildingProps: () => void;
  setBuilding: (building: any[]) => void;
  setScattered: (scattered: boolean) => void;
  initWorker: () => void;
  cleanupWorker: () => void;
  sendWorkerMessage: (payload?: BuildingProps) => void;
}

const createLogicWorker = (onMessage: (data: any) => void) => {
  const worker = new Worker(new URL("@/workers/logic.ts", import.meta.url), {
    type: "module",
  });

  // Listen for messages from the worker
  worker.onmessage = (event) => {
    console.log("Received from worker:", event.data);
    onMessage(event.data);
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
  building: [],
  isScattered: false,
  offsets: [0, 0, 0],

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

  resetBuildingProps: () => set({ buildingProps: buildingConfig }),

  setBuilding: (building) => set({ building }),
  setScattered: (isScattered) => set({ isScattered }),

  initWorker: () => {
    const state = get();
    if (!state.logicWorker) {
      const worker = createLogicWorker((data) => {
        if (data.status === "success" && data.result) {
          const { sizeX, sizeZ } = data.dimensions;
          const { offset } = get().buildingProps || { offset: 0.1 };
          const spacing = 1 + offset;

          const offsetX = -((sizeX - 1) * spacing) / 2;
          const offsetZ = -((sizeZ - 1) * spacing) / 2;
          const offsetY = 0.5;

          set({
            building: data.result,
            offsets: [offsetX, offsetY, offsetZ],
            isScattered: true,
          });
          console.log("Building data stored:", data.result);
        }
      });
      set({ logicWorker: worker });
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
      // Reset scattered state when new build is requested
      set({ isScattered: false, building: [] });
      state.logicWorker.postMessage({ payload });
    }
  },
}));
