import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { getDebug } from "../hooks/useDebugControls";
import { map } from "../utils";

import { OPEN_PAGE_ROTATION, PADDING } from "../constants.js";

const OPEN_LENGTH_FACTOR = 0.3567; // edge length when open = 0.055

export default function Edge({ openProgressRef, dimensions, coverDimensions }) {
  const debug = getDebug();

  const groupRef = useRef();
  const coverSidesRef = useRef([]);

  const length = dimensions.thickness + 0.02;

  useFrame(() => {
    const openProgress = openProgressRef.current.value;
    groupRef.current.rotation.y = openProgress * (OPEN_PAGE_ROTATION / 2);

    const sideLength = map(openProgress, 1, OPEN_LENGTH_FACTOR);
    coverSidesRef.current[0].scale.x = sideLength;
    coverSidesRef.current[1].scale.x = sideLength;

    const sidePosition = map(
      openProgress,
      -length + length / 2,
      -length + (length * OPEN_LENGTH_FACTOR) / 2
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
            (dimensions.thickness +
              coverDimensions.thickness +
              coverDimensions.padding / 2) -
            PADDING,
          0,
          0,
        ]}
      >
        <boxGeometry
          args={[
            coverDimensions.padding,
            dimensions.height + coverDimensions.padding * 2,
            dimensions.thickness * 2 + coverDimensions.padding * 2,
          ]}
        />
        <meshStandardMaterial color="deeppink" wireframe={debug} />
      </mesh>
      {/* sides */}
      <mesh
        ref={(el) => (coverSidesRef.current[0] = el)}
        position={[
          -(dimensions.thickness + coverDimensions.thickness) -
            PADDING +
            length / 2,
          0,
          dimensions.thickness + coverDimensions.padding / 2,
        ]}
      >
        <boxGeometry
          args={[
            length,
            dimensions.height + coverDimensions.padding * 2,
            coverDimensions.thickness,
          ]}
        />
        <meshStandardMaterial color="deeppink" wireframe={debug} />
      </mesh>

      <mesh
        ref={(el) => (coverSidesRef.current[1] = el)}
        position={[
          -(dimensions.thickness + coverDimensions.thickness) -
            PADDING +
            length / 2,
          0,
          -dimensions.thickness - coverDimensions.padding / 2,
        ]}
      >
        <boxGeometry
          args={[
            length,
            dimensions.height + coverDimensions.padding * 2,
            coverDimensions.thickness,
          ]}
        />
        <meshStandardMaterial color="deeppink" wireframe={debug} />
      </mesh>

      {/* inside */}
      <mesh
        position-x={
          0 - (dimensions.thickness + coverDimensions.thickness) / 2 - PADDING
        }
      >
        <boxGeometry
          args={[
            dimensions.thickness + coverDimensions.thickness,
            dimensions.height - PADDING,
            dimensions.thickness * 2,
          ]}
        />
        <meshStandardMaterial color="orchid" wireframe={debug} />
      </mesh>
    </group>
  );
}
