import * as THREE from "three";
import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { OrbitControls, Grid, PerspectiveCamera } from "@react-three/drei";

import UiPanel from "@/components/ui";

import { useAppStore } from "./store";
import CameraDebugger from "./components/camera_debugger";
import { gridConfig, orbitControlsConfig } from "./config/config";

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"gray"} />
    </mesh>
  );
}

export default function App() {
  const autoRotateSpeed = useAppStore((s) => s.autoRotateSpeed);
  const camProps = useAppStore((s) => s.camProps);

  const initWorker = useAppStore((s) => s.initWorker);
  const cleanupWorker = useAppStore((s) => s.cleanupWorker);
  const building = useAppStore((s) => s.building);
  const isScattered = useAppStore((s) => s.isScattered);

  useEffect(() => {
    initWorker();
    return () => cleanupWorker();
  }, [initWorker, cleanupWorker]);

  return (
    <div className="w-dvw h-dvh p-4">
      <Canvas className="bg-neutral-800">
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {/* <Box position={[-1.2, 0, 0]} /> */}
        {/* <Box position={[1.2, 0, 0]} /> */}

        <Grid {...gridConfig} />

        <PerspectiveCamera
          makeDefault
          position={camProps.position}
          fov={camProps.fov}
        />
        <OrbitControls
          {...orbitControlsConfig}
          autoRotateSpeed={autoRotateSpeed}
          maxDistance={20}
          minDistance={1}
        />
        <CameraDebugger />
        {isScattered &&
          building.map((item, idx) => (
            <Box
              key={idx}
              position={[
                item.position.x * 1.1,
                item.position.y * 1.1,
                item.position.z * 1.1,
              ]}
            />
          ))}
      </Canvas>

      <UiPanel />
    </div>
  );
}
