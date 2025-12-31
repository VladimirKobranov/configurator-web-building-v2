import { useFrame, useThree } from "@react-three/fiber";
import { useAppStore } from "@/store";

import type { OrbitControlsLike } from "@/types/types";

export default function CameraDebugger() {
  const setCamProps = useAppStore((s) => s.setCamProps);

  const { camera, controls } = useThree();
  const orbitControls = controls as unknown as OrbitControlsLike;

  useFrame(() => {
    const pos = camera.position;
    const rot = camera.rotation;
    const target = orbitControls?.target;

    setCamProps({
      position: [pos.x, pos.y, pos.z],
      rotation: [rot.x, rot.y, rot.z],
      target: target ? [target.x, target.y, target.z] : [0, 0, 0],
    });
  });

  return null;
}
