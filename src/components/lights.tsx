import { useAppStore } from "@/store";
import { useRef } from "react";
import { useHelper } from "@react-three/drei";

import * as THREE from "three";

export default function Lights() {
  const sceneProps = useAppStore((s) => s.sceneProps);
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  // light helpers
  useHelper(
    sceneProps.showHelpers ? lightRef : null,
    THREE.DirectionalLightHelper,
    1,
    "red"
  );

  // camera shadow helper (size)
  useHelper(
    sceneProps.showHelpers && lightRef.current?.shadow?.camera
      ? { current: lightRef.current.shadow.camera }
      : null,
    THREE.CameraHelper
  );

  return (
    <directionalLight
      ref={lightRef}
      castShadow
      position={[10, 10, 10]}
      intensity={4}
      // shadow
      shadow-mapSize={[2048, 2048]}
      shadow-bias={-0.0005}
      shadow-normalBias={0.02}
      // shadow-camera
      shadow-camera-near={2}
      shadow-camera-far={40}
      shadow-camera-left={-20}
      shadow-camera-right={20}
      shadow-camera-top={20}
      shadow-camera-bottom={-20}
    />
  );
}
