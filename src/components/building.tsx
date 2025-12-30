import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useAppStore } from "@/store";
import type { BuildingItem, GLTFResult } from "@/types";

// @ts-expect-error - GLB files are not recognized by TypeScript by default
import buildingUrl from "@/assets/building.glb";

const tempObject = new THREE.Object3D();

const MESH_KEYS = [
  "first_floor_0",
  "first_floor_1",
  "first_floor_2",
  "first_floor_3",
  "first_floor_corner",
  "first_floor_corner_brandmauer",
  "first_floor_corner_brandmauer_right",
  "main_floor_0",
  "main_floor_1",
  "main_floor_2",
  "main_floor_3",
  "main_floor_corner",
  "main_floor_brandmauer",
  "roof_cap",
  "roof_corner",
  "roof_wall_0",
  "roof_wall_brandmauer",
  "roof_corner_brandmauer",
  "roof_corner_brandmauer_right",
  "aircond_0",
  "aircond_1",
  "aircond_2",
  "first_floor_acc_0",
  "first_floor_acc_1",
  "first_floor_acc_2",
  "first_floor_acc_3",
] as const;

type MeshType = (typeof MESH_KEYS)[number];

export function InstancedBuilding({ data }: { data: BuildingItem[] }) {
  const meshRefs: Record<MeshType, React.RefObject<THREE.InstancedMesh>> = {
    first_floor_0: useRef<THREE.InstancedMesh>(null!),
    first_floor_1: useRef<THREE.InstancedMesh>(null!),
    first_floor_2: useRef<THREE.InstancedMesh>(null!),
    first_floor_3: useRef<THREE.InstancedMesh>(null!),
    first_floor_corner: useRef<THREE.InstancedMesh>(null!),
    first_floor_corner_brandmauer: useRef<THREE.InstancedMesh>(null!),
    first_floor_corner_brandmauer_right: useRef<THREE.InstancedMesh>(null!),
    main_floor_0: useRef<THREE.InstancedMesh>(null!),
    main_floor_1: useRef<THREE.InstancedMesh>(null!),
    main_floor_2: useRef<THREE.InstancedMesh>(null!),
    main_floor_3: useRef<THREE.InstancedMesh>(null!),
    main_floor_corner: useRef<THREE.InstancedMesh>(null!),
    main_floor_brandmauer: useRef<THREE.InstancedMesh>(null!),
    roof_cap: useRef<THREE.InstancedMesh>(null!),
    roof_corner: useRef<THREE.InstancedMesh>(null!),
    roof_wall_0: useRef<THREE.InstancedMesh>(null!),
    roof_wall_brandmauer: useRef<THREE.InstancedMesh>(null!),
    roof_corner_brandmauer: useRef<THREE.InstancedMesh>(null!),
    roof_corner_brandmauer_right: useRef<THREE.InstancedMesh>(null!),
    aircond_0: useRef<THREE.InstancedMesh>(null!),
    aircond_1: useRef<THREE.InstancedMesh>(null!),
    aircond_2: useRef<THREE.InstancedMesh>(null!),
    first_floor_acc_0: useRef<THREE.InstancedMesh>(null!),
    first_floor_acc_1: useRef<THREE.InstancedMesh>(null!),
    first_floor_acc_2: useRef<THREE.InstancedMesh>(null!),
    first_floor_acc_3: useRef<THREE.InstancedMesh>(null!),
  };

  // Memoize meshRefs to keep the object stable across renders
  const stableMeshRefs = useMemo(
    () => meshRefs,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(meshRefs)
  );

  const { selectedItem, setSelectedItem } = useAppStore();

  const { nodes } = useGLTF(buildingUrl) as unknown as GLTFResult;

  const groupedData = useMemo(() => {
    const groups: Record<string, BuildingItem[]> = {};
    MESH_KEYS.forEach((key) => (groups[key] = []));

    data.forEach((item) => {
      if (groups[item.type]) {
        groups[item.type].push(item);
      }
    });

    return groups;
  }, [data]);

  const defaultColor = useMemo(() => new THREE.Color("#888888"), []);
  const highlightColor = useMemo(() => new THREE.Color("#5f6a82"), []);

  useEffect(() => {
    Object.entries(stableMeshRefs).forEach(([type, ref]) => {
      const mesh = ref.current;
      const items = groupedData[type];
      if (!mesh || !items) return;

      if (!mesh.instanceColor) {
        const colorArray = new Float32Array(items.length * 3);
        mesh.instanceColor = new THREE.InstancedBufferAttribute(colorArray, 3);
      }

      items.forEach((item, i) => {
        tempObject.position.set(
          item.position.x,
          item.position.y,
          item.position.z
        );

        tempObject.rotation.set(0, item.rotationY || 0, 0);
        tempObject.updateMatrix();
        mesh.setMatrixAt(i, tempObject.matrix);

        // Handle highlighting
        const isSelected =
          selectedItem?.type === type && selectedItem?.instanceId === i;
        mesh.setColorAt(i, isSelected ? highlightColor : defaultColor);
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });
  }, [groupedData, stableMeshRefs, selectedItem, defaultColor, highlightColor]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff", // Use white so instance colors show through accurately
        roughness: 0.7,
        side: THREE.DoubleSide,
      }),
    []
  );

  const typeConfig = useMemo(() => {
    const config: Record<string, { geometry: THREE.BufferGeometry }> = {};
    MESH_KEYS.forEach((type) => {
      if (nodes[type]) {
        config[type] = {
          geometry: nodes[type].geometry,
        };
      }
    });
    return config;
  }, [nodes]);

  const handleClick = (type: string, instanceId: number) => {
    const items = groupedData[type];
    if (!items || instanceId >= items.length) return;

    const item = items[instanceId];
    setSelectedItem({ item, type, instanceId });
  };

  return (
    <group>
      {Object.entries(typeConfig).map(([type, config]) => {
        const items = groupedData[type];
        if (!items || items.length === 0) return null;

        return (
          <instancedMesh
            key={type}
            ref={stableMeshRefs[type as MeshType]}
            args={[config.geometry, material, items.length]}
            castShadow
            receiveShadow
            onClick={(e) => {
              e.stopPropagation();
              if (e.instanceId !== undefined) {
                handleClick(type, e.instanceId);
              }
            }}
          />
        );
      })}
    </group>
  );
}

export function Model(props: React.ComponentPropsWithoutRef<"group">) {
  const { nodes } = useGLTF(buildingUrl) as unknown as GLTFResult;
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
