export const cameraConfig = {
  fov: 40,
  position: [0, 5, 10] as [number, number, number],
  rotation: [0, 0, 0] as [number, number, number],
};

export const orbitControlsConfig = {
  minPolarAngle: 0,
  maxPolarAngle: Math.PI / 2,
  target: [-0.02, 0.55, -0.28] as [number, number, number],
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
  sizeX: 4,
  sizeY: 5,
  sizeZ: 3,
  offset: 0.0,
  randomSeed: 45678,
};
