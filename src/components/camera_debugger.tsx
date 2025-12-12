import { useFrame, useThree } from "@react-three/fiber";
import { useAppStore } from "@/store";

export default function CameraDebugger() {
  const setCamProps = useAppStore((s) => s.setCamProps);

  const { camera } = useThree();

  useFrame(() => {
    const pos = camera.position;
    const rot = camera.rotation;

    setCamProps({
      position: [pos.x, pos.y, pos.z],
      rotation: [rot.x, rot.y, rot.z],
    });
  });

  return null;
}
