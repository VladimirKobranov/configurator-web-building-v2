import * as THREE from "three";
import { useRef, useEffect } from "react";

const tempObject = new THREE.Object3D();

export function InstancedBuilding({ data }: { data: any[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  useEffect(() => {
    if (!meshRef.current) return;

    data.forEach((item, i) => {
      tempObject.position.set(
        item.position.x * 1.1,
        item.position.y * 1.1,
        item.position.z * 1.1
      );
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [data]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, data.length]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </instancedMesh>
  );
}
