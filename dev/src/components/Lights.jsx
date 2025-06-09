import { useRef } from "react";
import { DirectionalLightHelper } from "three";
import { useHelper } from "@react-three/drei";
// import { useControls } from "leva";

export default function Lights({ debug }) {
  const init = { directionalLightPosition: [1, 0.5, 0.75] };
  // const { directionalLightPosition } = useControls("lights", {
  //   directionalLightPosition: { value: init.directionalLightPosition },
  // });

  const directionalLightRef = useRef(null);

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
        position={init.directionalLightPosition}
      />
    </>
  );
}
