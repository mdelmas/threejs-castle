import { useRef } from "react";
import { DirectionalLightHelper } from "three";
import { useHelper } from "@react-three/drei";
import { useControls } from "leva";

export default function Lights({ debug }) {
  const { directionalLightPosition } = useControls("lights", {
    directionalLightPosition: { value: [1, 0.5, 0.75] },
  });

  const directionalLightRef = useRef();

  useHelper(
    debug && directionalLightRef,
    DirectionalLightHelper,
    0.5,
    "orange"
  );

  return (
    <>
      <ambientLight />
      <directionalLight
        ref={directionalLightRef}
        position={directionalLightPosition}
      />
    </>
  );
}
