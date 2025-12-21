import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useAppStore } from "@/store";

// @ts-ignore
import buildingUrl from "@/assets/building.glb";

const tempObject = new THREE.Object3D();

export function InstancedBuilding({ data }: { data: any[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const offsets = useAppStore((s) => s.offsets);
  const buildingProps = useAppStore((s) => s.buildingProps);
  const { nodes, materials } = useGLTF(buildingUrl) as any;

  useEffect(() => {
    if (!meshRef.current || !buildingProps) return;

    const { sizeX, sizeZ } = buildingProps;

    data.forEach((item, i) => {
      tempObject.position.set(
        item.position.x * 1.1 + offsets[0],
        item.position.y * 1.1 + offsets[1],
        item.position.z * 1.1 + offsets[2]
      );

      let rotationY = 0;
      if (item.position.z === 0) {
        rotationY = -Math.PI / 2;
      } else if (item.position.z === sizeZ - 1) {
        rotationY = Math.PI / 2;
      } else if (item.position.x === 0) {
        rotationY = 0;
      } else if (item.position.x === sizeX - 1) {
        rotationY = Math.PI;
      }

      tempObject.rotation.set(0, rotationY, 0);

      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [data, offsets, buildingProps]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[nodes.MainWallWindow1.geometry, materials.Material, data.length]}
      castShadow
      receiveShadow
    />
  );
}

export function Model(props: any) {
  const { nodes } = useGLTF(buildingUrl) as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainWallCorner.geometry}
        material={nodes.MainWallCorner.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.roofcap1.geometry}
        material={nodes.roofcap1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.roofmainwall1.geometry}
        material={nodes.roofmainwall1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.roofcorner1.geometry}
        material={nodes.roofcorner1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.firstfloorwall1.geometry}
        material={nodes.firstfloorwall1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.firstfloorcorner1.geometry}
        material={nodes.firstfloorcorner1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.aircond1.geometry}
        material={nodes.aircond1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainWallWindow2.geometry}
        material={nodes.MainWallWindow2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainWallWindow3.geometry}
        material={nodes.MainWallWindow3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainWallWindow4.geometry}
        material={nodes.MainWallWindow4.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.aircond2.geometry}
        material={nodes.aircond2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.roofaccessories1.geometry}
        material={nodes.roofaccessories1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.roofaccessories2.geometry}
        material={nodes.roofaccessories2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.roofaccessories3.geometry}
        material={nodes.roofaccessories3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.firstfloorwall2.geometry}
        material={nodes.firstfloorwall2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainWallWindow1.geometry}
        material={nodes.MainWallWindow1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.aircond3.geometry}
        material={nodes.aircond3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.firstfloorwall3.geometry}
        material={nodes.firstfloorwall3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.firstfloorwall4.geometry}
        material={nodes.firstfloorwall4.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.firstflooraccessories1.geometry}
        material={nodes.firstflooraccessories1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.firstflooraccessories2.geometry}
        material={nodes.firstflooraccessories2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.firstflooraccessories3.geometry}
        material={nodes.firstflooraccessories3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.firstflooraccessories4.geometry}
        material={nodes.firstflooraccessories4.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.roofcornerbrandmauer1.geometry}
        material={nodes.roofcornerbrandmauer1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.firstfloorcornerbrandmauer1.geometry}
        material={nodes.firstfloorcornerbrandmauer1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.roofmainwallbrandmauer1.geometry}
        material={nodes.roofmainwallbrandmauer1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.MainWallbrandmauer1.geometry}
        material={nodes.MainWallbrandmauer1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stairsmain001.geometry}
        material={nodes.stairsmain001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stairslast.geometry}
        material={nodes.stairslast.material}
        scale={[0.4, 1, 0.429]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stairsfirst.geometry}
        material={nodes.stairsfirst.material}
        scale={[0.4, 1, 0.429]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.laundry1.geometry}
        material={nodes.laundry1.material}
      />
    </group>
  );
}

useGLTF.preload(buildingUrl);
