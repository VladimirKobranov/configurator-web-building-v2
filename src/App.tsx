import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { OrbitControls, Grid, PerspectiveCamera } from "@react-three/drei";

import { useAppStore } from "./store";

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
  const setAutoRotateSpeed = useAppStore((s) => s.setAutoRotateSpeed);

  function BearCounter() {
    return (
      <div className="z-100 text-white fixed top-10 left-10">
        <h1>{autoRotateSpeed} bears around</h1>
        <input
          type="range"
          min={0}
          max={5}
          step={0.25}
          defaultValue={autoRotateSpeed}
          onChange={(e) => setAutoRotateSpeed(Number(e.target.value))}
        />
      </div>
    );
  }

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

        <Grid
          cellSize={0.5}
          cellThickness={1}
          cellColor="#6f6f6f"
          sectionSize={2}
          sectionThickness={1.5}
          sectionColor="#9d4b4b"
          fadeDistance={50}
          fadeStrength={5}
          followCamera={false}
          infiniteGrid={true}
        />

        <PerspectiveCamera makeDefault fov={40} />
        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          target={[-0.02, 0.55, -0.28]}
          minDistance={3}
          maxDistance={10}
          enableDamping
          makeDefault
          autoRotate
          autoRotateSpeed={autoRotateSpeed}
        />
      </Canvas>

      <BearCounter />
    </div>
  );
}
