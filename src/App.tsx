import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { OrbitControls, Grid, PerspectiveCamera } from "@react-three/drei";

import UiPanel from "@/components/ui";

import { useAppStore } from "./store";
import { gridConfig, orbitControlsConfig } from "./config/config";

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((_state, delta) => (meshRef.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "#2f74c0"} />
    </mesh>
  );
}

export default function App() {
  const autoRotateSpeed = useAppStore((s) => s.autoRotateSpeed);

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
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />

        <Grid {...gridConfig} />

        <PerspectiveCamera makeDefault fov={40} />
        <OrbitControls
          {...orbitControlsConfig}
          autoRotateSpeed={autoRotateSpeed}
        />
      </Canvas>

      <UiPanel />
    </div>
  );
}
