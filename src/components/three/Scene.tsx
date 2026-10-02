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
import { useThemeStore } from "@/store/theme";
import { gridConfig, orbitControlsConfig } from "@/config/config";
import CameraDebugger from "@/components/three/CameraDebugger";
import { InstancedBuilding } from "@/components/three/Building";
import ShadowCatcher from "@/components/three/ShadowCatcher";
import Lights from "@/components/three/Lights";

export default function Scene() {
  const autoRotateSpeed = useAppStore((s) => s.autoRotateSpeed);
  const camProps = useAppStore((s) => s.camProps);
  const building = useAppStore((s) => s.building);
  const isScattered = useAppStore((s) => s.isScattered);
  const sceneProps = useAppStore((s) => s.sceneProps);
  const dark = useThemeStore(
    (s) => s.theme === "dark" || (s.theme === "system" && s.systemDark),
  );

  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas className="scene-canvas" dpr={dpr} shadows="soft">
      {/* environment */}
      <Environment
        preset="city"
        background={false}
        environmentIntensity={0.4}
      />

      {/* lights */}
      <Lights />

      {/* grid */}
      {sceneProps.showGrid && (
        <Grid
          {...gridConfig}
          cellColor={dark ? "#545454" : gridConfig.cellColor}
          sectionColor={dark ? "#51738a" : gridConfig.sectionColor}
        />
      )}

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
