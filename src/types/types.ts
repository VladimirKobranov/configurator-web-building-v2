import * as THREE from "three";

export type Vec3 = [number, number, number];

export interface BuildingItem {
  type: string;
  position: { x: number; y: number; z: number };
  rotationY?: number;
  sideIndex?: number;
}

export interface CameraProps {
  position: Vec3;
  target: Vec3;
  rotation: Vec3;
  fov: number;
}

export interface BuildingProps {
  sizeX: number;
  sizeXMin: number;
  sizeXMax: number;
  sizeY: number;
  sizeYMin: number;
  sizeYMax: number;
  sizeZ: number;
  sizeZMin: number;
  sizeZMax: number;
  offset: number;
  aircond: boolean;
  aircondPercent: number;
  firstFloorAcc: boolean;
  firstFloorAccPercent: number;
  roofAcc: boolean;
  roofAccPercent: number;
  stairs: boolean;
  stairsIndex: number;
  stairsSide: number;
  brandmauer: boolean;
  randomSeed: number;
}

export interface SceneProps {
  showGrid: boolean;
  showHelpers: boolean;
  autoUpdate: boolean;
  showInfoPanel: boolean;
}

export interface GeometryStats {
  triangles: number;
  vertices: number;
}

export interface AppState {
  // init states
  autoRotateSpeed: number;
  camProps: CameraProps;
  logicWorker: Worker | null;
  buildingProps?: BuildingProps;
  building: BuildingItem[];
  isScattered: boolean;
  sceneProps: SceneProps;

  // selection
  selectedItem: {
    item: BuildingItem;
    type: string;
    instanceId: number;
    geometryStats?: GeometryStats;
  } | null;
  setSelectedItem: (
    selection: {
      item: BuildingItem;
      type: string;
      instanceId: number;
      geometryStats?: GeometryStats;
    } | null,
  ) => void;

  // actions
  // camera props
  setAutoRotateSpeed: (speed: number) => void;
  setCamProps: (props: Partial<CameraProps>) => void;

  //building props
  setBuildingProps: (props: Partial<BuildingProps>) => void;
  resetBuildingProps: () => void;
  randomizeSeed: () => void;
  setBuilding: (building: BuildingItem[]) => void;
  setScattered: (scattered: boolean) => void;

  // scene props
  setSceneProps: (props: Partial<SceneProps>) => void;

  // worker
  initWorker: () => void;
  cleanupWorker: () => void;
  sendWorkerMessage: (payload?: BuildingProps) => void;
}

export interface GLTFResult {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
}

export interface OrbitControlsLike {
  target: THREE.Vector3;
}
