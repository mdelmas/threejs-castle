import { useRef } from "react";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

import { OPEN_PAGE_ROTATION, PADDING } from "../constants.js";

import { map } from "../utils";

const OPEN_LENGTH_FACTOR = 0.3235;
// edge length 0.055

export default function Edge({ openProgressRef, dimensions, debug }) {
  const groupRef = useRef();
  const coverSidesRef = useRef([]);

  const { extraThickness, extraCover, openLengthFactor } = useControls(
    "book edge",
    {
      extraThickness: { value: 0.02 },
      extraCover: { value: 0.02, min: 0, max: 1, step: 0.01 },
      openLengthFactor: {
        value: OPEN_LENGTH_FACTOR,
        min: 0,
        max: 1,
        step: 0.0001,
      },
    }
  );
  console.log("openLengthFactor edge", openLengthFactor);

  const length = dimensions.thickness + 0.02;

  useFrame(() => {
    const openProgress = openProgressRef.current.value;
    groupRef.current.rotation.y = openProgress * (OPEN_PAGE_ROTATION / 2);

    const sideLength = map(openProgress, 1, openLengthFactor);
    coverSidesRef.current[0].scale.x = sideLength;
    coverSidesRef.current[1].scale.x = sideLength;

    const sidePosition = map(
      openProgress,
      -length + length / 2,
      -length + (length * openLengthFactor) / 2
    );
    coverSidesRef.current[0].position.x = sidePosition;
    coverSidesRef.current[1].position.x = sidePosition;
  });

  return (
    <group ref={groupRef}>
      {/* apply rotation on group */}
      {/* cover */}
      {/* center */}
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
      {/* sides */}
      <mesh
        ref={(el) => (coverSidesRef.current[0] = el)}
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
        ref={(el) => (coverSidesRef.current[1] = el)}
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

      {/* inside */}
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
