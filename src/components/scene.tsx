import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Grid,
  PerspectiveCamera,
  PerformanceMonitor,
  Environment,
} from "@react-three/drei";
import { useAppStore } from "@/store";
import { gridConfig, orbitControlsConfig } from "@/config/config";
import CameraDebugger from "@/components/camera_debugger";
import { InstancedBuilding } from "@/components/building";
import ShadowCatcher from "@/components/shadow_catcher";

export default function Scene() {
  const autoRotateSpeed = useAppStore((s) => s.autoRotateSpeed);
  const camProps = useAppStore((s) => s.camProps);
  const building = useAppStore((s) => s.building);
  const isScattered = useAppStore((s) => s.isScattered);

  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas className="bg-neutral-800" dpr={dpr} shadows={"soft"}>
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
      />
      <Environment
        preset="city"
        background={false}
        environmentIntensity={0.5}
      />

      <directionalLight
        castShadow
        position={[10, 10, 10]}
        intensity={5}
        shadow-normalBias={0.01}
        shadow-mapSize={[4096, 4096]}
      />

      <Grid {...gridConfig} />

      <PerspectiveCamera
        makeDefault
        position={camProps.position}
        fov={camProps.fov}
      />
      <OrbitControls
        {...orbitControlsConfig}
        autoRotateSpeed={autoRotateSpeed}
      />
      {isScattered && <InstancedBuilding data={building} />}

      <ShadowCatcher />

      <CameraDebugger />
    </Canvas>
  );
}
