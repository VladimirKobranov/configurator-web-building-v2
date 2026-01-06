import * as THREE from "three";
import { selectionConfig } from "@/config/config";

export const buildingShader = {
  uniforms: {
    wirelineColor: { value: new THREE.Color(selectionConfig.wirelineColor) },
    wirelineThickness: { value: selectionConfig.wirelineThickness },
  },

  vertexShader: {
    header: `
        attribute vec3 barycentric;
        attribute float instanceSelected;
        varying vec3 vBarycentric;
        varying float vInstanceSelected;
    `,
    main: `
        vBarycentric = barycentric;
        vInstanceSelected = instanceSelected;
    `,
  },
  fragmentShader: {
    header: `
        uniform vec3 wirelineColor;
        uniform float wirelineThickness;
        varying vec3 vBarycentric;
        varying float vInstanceSelected;

        float edgeFactor() {
          vec3 d = fwidth(vBarycentric);
          vec3 a3 = smoothstep(vec3(0.0), d * wirelineThickness, vBarycentric);
          return min(min(a3.x, a3.y), a3.z);
        }
    `,
    main: `
        if (vInstanceSelected > 0.5) {
          float edge = edgeFactor();
          if (edge < 0.1) {
            gl_FragColor = vec4(wirelineColor, 1.0);
          }
        }
    `,
  },
};

export const patchBuildingMaterial = (shader: any) => {
  shader.uniforms.wirelineColor = buildingShader.uniforms.wirelineColor;
  shader.uniforms.wirelineThickness = buildingShader.uniforms.wirelineThickness;

  shader.vertexShader = `
    ${buildingShader.vertexShader.header}
    ${shader.vertexShader}
  `.replace(
    "#include <begin_vertex>",
    `#include <begin_vertex>\n${buildingShader.vertexShader.main}`,
  );

  shader.fragmentShader = `
    ${buildingShader.fragmentShader.header}
    ${shader.fragmentShader}
  `.replace(
    "#include <opaque_fragment>",
    `#include <opaque_fragment>\n${buildingShader.fragmentShader.main}`,
  );
};
