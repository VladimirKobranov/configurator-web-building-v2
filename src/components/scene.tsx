import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  OrbitControls,
  Grid,
  PerspectiveCamera,
  PerformanceMonitor,
  Environment,
  useHelper,
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
  const sceneProps = useAppStore((s) => s.sceneProps);

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
        environmentIntensity={0.4}
      />

      <Lights />

      {sceneProps.showGrid && <Grid {...gridConfig} />}

      <PerspectiveCamera
        makeDefault
        {...camProps}
        // position={camProps.position}
        // fov={camProps.fov}
        // near={camProps.near}
        // far={camProps.far}
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

function Lights() {
  const sceneProps = useAppStore((s) => s.sceneProps);
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  useHelper(
    sceneProps.showHelpers ? lightRef : null,
    THREE.DirectionalLightHelper,
    1,
    "red"
  );

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
