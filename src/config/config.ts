export const cameraConfig = {
  fov: 40,
  position: [-6.48, 5.47, 9.21] as [number, number, number],
  target: [-0.14, 1.52, -0.7] as [number, number, number],
  rotation: [-0.38, -0.54, -0.2] as [number, number, number],
};

export const orbitControlsConfig = {
  minPolarAngle: 0,
  maxPolarAngle: Math.PI / 2,
  minDistance: 1,
  maxDistance: 40,
  enableDamping: true,
  makeDefault: true,
  autoRotate: true,
};

export const gridConfig = {
  cellSize: 0.5,
  cellThickness: 1,
  cellColor: "#6f6f6f",

  sectionSize: 2,
  sectionThickness: 1.5,
  sectionColor: "#9d4b4b",

  fadeDistance: 50,
  fadeStrength: 5,

  followCamera: false,
  infiniteGrid: true,
};

export const sceneConfig = {
  showGrid: true,
  showHelpers: false,
};

export const buildingConfig = {
  sizeX: 6,
  sizeY: 5,
  sizeZ: 5,
  offset: 0.0,
  aircond: true,
  aircondPercent: 20,
  firstFloorAcc: true,
  firstFloorAccPercent: 50,
  roofAcc: true,
  roofAccPercent: 50,
  brandmauer: false,
  stairs: true,
  stairsIndex: 4,
  stairsSide: 1,
  randomSeed: 52221,
};

export const selectionConfig = {
  wirelineColor: "#ffffff",
  wirelineThickness: 4,
};
