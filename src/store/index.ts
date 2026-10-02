// store.ts
import { create } from "zustand";
import { cameraConfig, buildingConfig, sceneConfig } from "@/config/config";
import { mulberry32 } from "@/utils/utils";
import type { BuildingItem, BuildingProps, AppState } from "@/types/types";

const createLogicWorker = (
  onMessage: (data: {
    status: string;
    result: BuildingItem[];
    dimensions: { sizeX: number; sizeY: number; sizeZ: number };
  }) => void,
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

      // Rule: If firewall is true, stairsSide cannot be 2 or 3
      if (updatedProps.firewall && updatedProps.stairsSide > 1) {
        updatedProps.stairsSide = 0; // Reset to a safe side
      }

      return {
        buildingProps: updatedProps,
      };
    });

    const state = get();
    if (state.sceneProps.autoUpdate) {
      state.sendWorkerMessage(state.buildingProps);
    }
  },

  // building functions
  randomizeSeed: () => {
    const rand = mulberry32(Date.now());
    const props = get().buildingProps || buildingConfig;

    const randomInRange = (min: number, max: number) =>
      Math.floor(rand() * (max - min + 1)) + min;
    const randomBool = () => rand() > 0.5;

    const newFirewall = randomBool();
    const newSizeX = randomInRange(props.sizeXMin, props.sizeXMax);
    const newSizeY = randomInRange(props.sizeYMin, props.sizeYMax);
    const newSizeZ = randomInRange(props.sizeZMin, props.sizeZMax);

    // Rule: side 2 and 3 are firewall sides.
    // If firewall is ON, stairs can only be on side 0 or 1.
    const newStairsSide = newFirewall
      ? randomInRange(0, 1)
      : randomInRange(0, 3);

    const sideLimit = newStairsSide < 2 ? newSizeX : newSizeZ;
    const newStairsIndex = randomInRange(1, Math.max(1, sideLimit - 2));

    get().setBuildingProps({
      randomSeed: Math.floor(rand() * 99999),
      sizeX: newSizeX,
      sizeY: newSizeY,
      sizeZ: newSizeZ,
      aircond: randomBool(),
      aircondPercent: randomInRange(0, 100),
      firstFloorAcc: randomBool(),
      firstFloorAccPercent: randomInRange(0, 100),
      roofAcc: randomBool(),
      roofAccPercent: randomInRange(0, 100),
      firewall: newFirewall,
      stairs: randomBool(),
      stairsSide: newStairsSide,
      stairsIndex: newStairsIndex,
    });
  },
  resetBuildingProps: () =>
    set({
      buildingProps: buildingConfig,
      sceneProps: sceneConfig,
      camProps: cameraConfig,
      autoRotateSpeed: 0,
      selectedItem: null,
    }),

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
    set((state) => {
      const updatedSceneProps = {
        ...state.sceneProps,
        ...props,
      };

      const newState: Partial<AppState> = {
        sceneProps: updatedSceneProps,
      };

      if (props.showInfoPanel === false) {
        newState.selectedItem = null;
      }

      return newState;
    }),
}));
