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
import { InstancedBuilding } from "@/components/Building";
import ShadowCatcher from "@/components/shadow_catcher";
import Lights from "./lights";

export default function Scene() {
  const autoRotateSpeed = useAppStore((s) => s.autoRotateSpeed);
  const camProps = useAppStore((s) => s.camProps);
  const building = useAppStore((s) => s.building);
  const isScattered = useAppStore((s) => s.isScattered);
  const sceneProps = useAppStore((s) => s.sceneProps);

  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas className="bg-neutral-800" dpr={dpr} shadows="soft">
      {/* environment */}
      <Environment
        preset="city"
        background={false}
        environmentIntensity={0.4}
      />

      {/* lights */}
      <Lights />

      {/* grid */}
      {sceneProps.showGrid && <Grid {...gridConfig} />}

      {/* camera */}
      <PerspectiveCamera makeDefault {...camProps} />
      <CameraDebugger />
      <OrbitControls
        {...orbitControlsConfig}
        target={camProps.target}
        autoRotateSpeed={autoRotateSpeed}
      />

      {/* building */}
      {isScattered && <InstancedBuilding data={building} />}

      {/* shadow catcher */}
      <ShadowCatcher />

      {/* performance monitor */}
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
      />
    </Canvas>
  );
}
