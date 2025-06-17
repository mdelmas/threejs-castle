import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

import { OPEN_PAGE_ROTATION, COVER_TYPE } from "../constants";

const map = (value, min, max) => min + value * (max - min);

const OPEN_LENGTH_FACTOR = 0.8784;

export default function Cover({
  type,
  dimensions,
  extraLength,
  thickness,
  openBook,
  debug,
  openProgressRef,
}) {
  const groupRef = useRef();
  const coverRef = useRef();

  const { openLengthFactor } = useControls("cover", {
    openLengthFactor: {
      value: OPEN_LENGTH_FACTOR,
      min: 0.7,
      max: 1,
      step: 0.0001,
    },
  });

  const length = dimensions.width + extraLength;

  useFrame(() => {
    const openProgress = openProgressRef.current.value;
    if (type === COVER_TYPE.FRONT) {
      groupRef.current.rotation.y = map(openProgress, 0, OPEN_PAGE_ROTATION);
    }

    // adjutst cover length and position (shorter when open)
    coverRef.current.scale.x = map(
      openProgress,
      length,
      length * openLengthFactor
    );
    coverRef.current.position.x = map(
      openProgress,
      length - length / 2,
      length - (length * openLengthFactor) / 2
    );
  });

  // cover length 0.884

  return (
    <group ref={groupRef}>
      {/* Cover */}
      <mesh
        ref={coverRef}
        position-z={
          (type === COVER_TYPE.FRONT ? 1 : -1) *
          (dimensions.thickness + thickness / 2)
        }
        onClick={openBook}
      >
        <boxGeometry
          args={[length, dimensions.height + extraLength * 2, thickness]}
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
