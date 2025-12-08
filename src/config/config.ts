export const orbitControlsConfig = {
  minPolarAngle: 0,
  maxPolarAngle: Math.PI / 2,
  target: [-0.02, 0.55, -0.28] as [number, number, number],
  minDistance: 3,
  maxDistance: 10,
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
