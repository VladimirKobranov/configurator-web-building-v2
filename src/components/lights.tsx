import { useAppStore } from "@/store";
import { useRef, useState, useEffect, useMemo } from "react";
import { useHelper } from "@react-three/drei";

import * as THREE from "three";

export default function Lights() {
  const sceneProps = useAppStore((s) => s.sceneProps);
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  // light helpers
  useHelper(
    sceneProps.showHelpers ? lightRef : null,
    THREE.DirectionalLightHelper,
    1,
    "red"
  );

  // camera shadow helper (size)
  const [shadowCam, setShadowCam] = useState<THREE.Camera | null>(null);

  useEffect(() => {
    if (lightRef.current && !shadowCam) {
      setShadowCam(lightRef.current.shadow.camera);
    }
  }, [shadowCam]);

  const shadowCamRef = useMemo(
    () => (shadowCam ? { current: shadowCam } : null),
    [shadowCam]
  );

  useHelper(
    sceneProps.showHelpers && shadowCamRef ? shadowCamRef : null,
    THREE.CameraHelper
  );

  return (
    <directionalLight
      ref={lightRef}
      castShadow
      position={[10, 10, 10]}
      intensity={4}
      // shadow
      shadow-mapSize={[4096, 4096]}
      shadow-bias={-0.0001}
      shadow-normalBias={0.02}
      // shadow-camera
      shadow-camera-near={1}
      shadow-camera-far={40}
      shadow-camera-left={-15}
      shadow-camera-right={15}
      shadow-camera-top={15}
      shadow-camera-bottom={-15}
    />
  );
}
