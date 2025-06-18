import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { OPEN_PAGE_ROTATION, COVER_TYPE } from "../constants";

import { map } from "../utils";
import { getDebug } from "../hooks/useDebugControls";

const OPEN_LENGTH_FACTOR = 0.8873;

export default function Cover({
  type,
  openProgressRef,
  dimensions,
  coverDimensions,
  openBook,
}) {
  const groupRef = useRef();
  const coverRef = useRef();

  const debug = getDebug();

  const length = dimensions.width + coverDimensions.padding;

  useFrame(() => {
    const openProgress = openProgressRef.current.value;

    // rotate front cover when open
    if (type === COVER_TYPE.FRONT) {
      groupRef.current.rotation.y = map(openProgress, 0, OPEN_PAGE_ROTATION);
    }

    // adjutst cover length and position (shorter when open)
    coverRef.current.scale.x = map(openProgress, 1, OPEN_LENGTH_FACTOR);
    coverRef.current.position.x = map(
      openProgress,
      length - length / 2,
      length - (length * OPEN_LENGTH_FACTOR) / 2
    );
  });

  return (
    <group ref={groupRef}>
      {/* Cover */}
      <mesh
        ref={coverRef}
        position-z={
          (type === COVER_TYPE.FRONT ? 1 : -1) *
          (dimensions.thickness + coverDimensions.thickness / 2)
        }
        onClick={openBook}
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
      {/* Pages block */}
      <mesh
        position={[
          dimensions.width / 2,
          0,
          (type === COVER_TYPE.FRONT ? 1 : -1) * (dimensions.thickness / 2),
        ]}
        onClick={openBook}
      >
        <boxGeometry
          args={[dimensions.width, dimensions.height, dimensions.thickness]}
        />
        <meshStandardMaterial color="hotpink" wireframe={debug} />
      </mesh>
    </group>
  );
}
