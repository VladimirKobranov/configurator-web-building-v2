export interface BuildingItem {
  type: string;
  position: { x: number; y: number; z: number };
  rotationY?: number;
  sideIndex?: number;
}
