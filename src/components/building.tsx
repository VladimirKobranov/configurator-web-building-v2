import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useAppStore } from "@/store";

// @ts-ignore
import buildingUrl from "@/assets/building.glb";

const tempObject = new THREE.Object3D();

export function InstancedBuilding({ data }: { data: any[] }) {
  const meshRefs = {
    first_floor_0: useRef<THREE.InstancedMesh>(null!),
    first_floor_1: useRef<THREE.InstancedMesh>(null!),
    first_floor_2: useRef<THREE.InstancedMesh>(null!),
    first_floor_3: useRef<THREE.InstancedMesh>(null!),
    first_floor_corner: useRef<THREE.InstancedMesh>(null!),
    main_floor_0: useRef<THREE.InstancedMesh>(null!),
    main_floor_1: useRef<THREE.InstancedMesh>(null!),
    main_floor_2: useRef<THREE.InstancedMesh>(null!),
    main_floor_3: useRef<THREE.InstancedMesh>(null!),
    main_floor_corner: useRef<THREE.InstancedMesh>(null!),
    roof_cap: useRef<THREE.InstancedMesh>(null!),
    roof_corner: useRef<THREE.InstancedMesh>(null!),
    roof_wall_0: useRef<THREE.InstancedMesh>(null!),
  };

  const offsets = useAppStore((s) => s.offsets);
  const buildingProps = useAppStore((s) => s.buildingProps);
  const { nodes } = useGLTF(buildingUrl) as any;

  const groupedData = useMemo(() => {
    const groups: Record<string, any[]> = {};
    Object.keys(meshRefs).forEach((key) => (groups[key] = []));

    data.forEach((item) => {
      if (groups[item.type]) {
        groups[item.type].push(item);
      }
    });

    return groups;
  }, [data]);

  useEffect(() => {
    const spacing = 1 + (buildingProps?.offset || 0);

    Object.entries(meshRefs).forEach(([type, ref]) => {
      const mesh = ref.current;
      const items = groupedData[type];
      if (!mesh || !items) return;

      items.forEach((item, i) => {
        tempObject.position.set(
          item.position.x * spacing + offsets[0],
          item.position.y * spacing + offsets[1],
          item.position.z * spacing + offsets[2],
        );

        tempObject.rotation.set(0, item.rotationY || 0, 0);
        tempObject.updateMatrix();
        mesh.setMatrixAt(i, tempObject.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
  }, [groupedData, offsets]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#888888",
        roughness: 0.7,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const typeConfig = useMemo(() => {
    const config: Record<string, { geometry: any }> = {};
    Object.keys(meshRefs).forEach((type) => {
      if (nodes[type]) {
        config[type] = {
          geometry: nodes[type].geometry,
        };
      }
    });
    return config;
  }, [nodes]);

  return (
    <group>
      {Object.entries(typeConfig).map(([type, config]) => {
        const items = groupedData[type];
        if (!items || items.length === 0) return null;

        return (
          <instancedMesh
            key={type}
            ref={meshRefs[type as keyof typeof meshRefs]}
            args={[config.geometry, material, items.length]}
            castShadow
            receiveShadow
          />
        );
      })}
    </group>
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
