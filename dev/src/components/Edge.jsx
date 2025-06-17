import { useRef } from "react";
import { useControls } from "leva";

import { OPEN_PAGE_ROTATION, PADDING } from "../constants.js";
import { useFrame } from "@react-three/fiber";

export default function Edge({ openProgressRef, dimensions, debug }) {
  const groupRef = useRef();

  const { extraThickness, extraCover, length } = useControls("book edge", {
    extraThickness: { value: 0.02 },
    extraCover: { value: 0.02, min: 0, max: 1, step: 0.01 },
    length: {
      value: dimensions.thickness + 0.02,
      min: 0,
      max: dimensions.thickness + 0.02,
      step: 0.001,
    },
  });

  useFrame(() => {
    const openProgress = openProgressRef.current.value;
    groupRef.current.rotation.y = openProgress * (OPEN_PAGE_ROTATION / 2);
  });

  return (
    <group ref={groupRef}>
      {/* apply rotation on group */}
      <mesh
        position={[
          0 -
            (dimensions.thickness + extraThickness + extraCover / 2) -
            PADDING,
          0,
          0,
        ]}
      >
        <boxGeometry
          args={[
            extraCover,
            dimensions.height + extraCover * 2,
            dimensions.thickness * 2 + extraCover * 2,
          ]}
        />
        <meshStandardMaterial color="deeppink" wireframe={debug} />
      </mesh>
      <mesh
        position={[
          -(dimensions.thickness + extraThickness) - PADDING + length / 2,
          0,
          dimensions.thickness + extraCover / 2,
        ]}
      >
        <boxGeometry
          args={[length, dimensions.height + extraCover * 2, extraThickness]}
        />
        <meshStandardMaterial color="deeppink" wireframe={debug} />
      </mesh>

      <mesh
        position={[
          -(dimensions.thickness + extraThickness) - PADDING + length / 2,
          0,
          -dimensions.thickness - extraCover / 2,
        ]}
      >
        <boxGeometry
          args={[length, dimensions.height + extraCover * 2, extraThickness]}
        />
        <meshStandardMaterial color="deeppink" wireframe={debug} />
      </mesh>

      {/* small edge */}
      <mesh
        position-x={0 - (dimensions.thickness + extraThickness) / 2 - PADDING}
      >
        <boxGeometry
          args={[
            dimensions.thickness + extraThickness,
            dimensions.height - PADDING,
            dimensions.thickness * 2,
          ]}
        />
        <meshStandardMaterial color="orchid" wireframe={debug} />
      </mesh>
    </group>
  );
}
