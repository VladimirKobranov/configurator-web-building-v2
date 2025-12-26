// store.ts
import { create } from "zustand";
import { cameraConfig, buildingConfig, sceneConfig } from "@/config/config";
import { mulberry32 } from "@/etc/utils";

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
  randomSeed: number;
}

interface SceneProps {
  showGrid: boolean;
  showHelpers: boolean;
}

interface AppState {
  // init states
  autoRotateSpeed: number;
  camProps: CameraProps;
  logicWorker: Worker | null;
  buildingProps?: BuildingProps;
  building: any[];
  isScattered: boolean;
  autoUpdate: boolean;
  sceneProps: SceneProps;

  // actions
  // camera props
  setAutoUpdate: (autoUpdate: boolean) => void;
  setAutoRotateSpeed: (speed: number) => void;
  setCamProps: (props: Partial<CameraProps>) => void;

  //building props
  setBuildingProps: (props: Partial<BuildingProps>) => void;
  resetBuildingProps: () => void;
  randomizeSeed: () => void;
  setBuilding: (building: any[]) => void;
  setScattered: (scattered: boolean) => void;

  // scene props
  setSceneProps: (props: Partial<SceneProps>) => void;

  // worker
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

  // ACTIONS
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
  resetBuildingProps: () => set({ buildingProps: buildingConfig }),

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
      set({ isScattered: false, building: [] });
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
