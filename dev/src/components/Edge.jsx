import { useControls } from "leva";

import { PADDING } from "../constants.js";

export default function Edge({ ref, dimensions, debug }) {
  const { extraThickness } = useControls("book edge", {
    extraThickness: { value: 0.02 },
  });

  return (
    <>
      {/* apply rotation on group */}
      <group ref={ref}>
        <mesh
          position-x={0 - (dimensions.thickness + extraThickness) / 2 - PADDING}
        >
          <boxGeometry
            args={[
              dimensions.thickness + extraThickness,
              dimensions.height + PADDING,
              dimensions.thickness * 2,
            ]}
          />
          <meshStandardMaterial color="plum" wireframe={debug} />
        </mesh>
      </group>
    </>
  );
}
