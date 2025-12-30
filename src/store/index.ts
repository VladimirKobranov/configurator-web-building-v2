// store.ts
import { create } from "zustand";
import { cameraConfig, buildingConfig, sceneConfig } from "@/config/config";
import { mulberry32 } from "@/etc/utils";
import type { BuildingItem, BuildingProps, AppState } from "@/types";

const createLogicWorker = (
  onMessage: (data: {
    status: string;
    result: BuildingItem[];
    dimensions: { sizeX: number; sizeY: number; sizeZ: number };
  }) => void
) => {
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
  // INIT STATES
  // camera props
  autoRotateSpeed: 0,
  camProps: cameraConfig,

  // worker
  logicWorker: null,

  // scene props
  sceneProps: sceneConfig,
  autoUpdate: true,

  // building props
  isScattered: false,
  buildingProps: buildingConfig,
  building: [],
  selectedItem: null,

  // ACTIONS
  setSelectedItem: (selectedItem) => set({ selectedItem }),
  // camera functions
  setAutoRotateSpeed: (speed) => set({ autoRotateSpeed: speed }),

  setCamProps: (props) =>
    set((state) => ({
      camProps: {
        ...state.camProps,
        ...props,
      },
    })),

  setBuildingProps: (props) => {
    set((state) => {
      const updatedProps = {
        ...state.buildingProps,
        ...props,
      } as BuildingProps;

      return {
        buildingProps: updatedProps,
      };
    });

    const state = get();
    if (state.autoUpdate) {
      state.sendWorkerMessage(state.buildingProps);
    }
  },

  // building functions
  randomizeSeed: () => {
    const rand = mulberry32(Date.now());
    get().setBuildingProps({
      randomSeed: Math.floor(rand() * 99999), // five digits
    });
  },
  resetBuildingProps: () =>
    set({ buildingProps: buildingConfig, selectedItem: null }),

  setAutoUpdate: (autoUpdate) => set({ autoUpdate }),

  setBuilding: (building) => set({ building }),

  setScattered: (isScattered) => set({ isScattered }),

  // worker functions
  initWorker: () => {
    const state = get();
    if (!state.logicWorker) {
      const worker = createLogicWorker((data) => {
        if (data.status === "success" && data.result) {
          const { sizeX, sizeZ } = data.dimensions;

          set({
            building: data.result,
            isScattered: true,
            buildingProps: {
              ...(get().buildingProps || buildingConfig),
              sizeX,
              sizeZ,
            },
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
      set({ selectedItem: null });
      state.logicWorker.postMessage({ payload });
    }
  },

  // scene functions
  setSceneProps: (props) =>
    set((state) => ({
      sceneProps: {
        ...state.sceneProps,
        ...props,
      },
    })),
}));
