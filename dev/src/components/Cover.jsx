import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { getDebug } from "../hooks/useDebugControls";
import { OPEN_PAGE_ROTATION, COVER_TYPE } from "../constants";

const OPEN_LENGTH_FACTOR = 0.8873;

export default function Cover({
  type,
  isOpen,
  dimensions,
  coverDimensions,
  openBook,
}) {
  const debug = getDebug();

  const groupRef = useRef();
  const coverRef = useRef();

  const length = dimensions.width + coverDimensions.padding;

  useEffect(() => {
    if (!groupRef.current || !coverRef.current) return;

    if (type === COVER_TYPE.FRONT) {
      // rotate front cover when open
      gsap.to(groupRef.current.rotation, {
        y: isOpen ? OPEN_PAGE_ROTATION : 0,
        duration: 1,
        ease: "power1.out",
      });
    }

    // adjust cover length and position (shorter when open)
    gsap.to(coverRef.current.scale, {
      x: isOpen ? OPEN_LENGTH_FACTOR : 1,
      duration: 1,
      ease: "power1.out",
    });

    gsap.to(coverRef.current.position, {
      x: isOpen
        ? length - (length * OPEN_LENGTH_FACTOR) / 2
        : length - length / 2,
      duration: 1,
      ease: "power1.out",
    });
  }, [length, type, isOpen]);

  return (
    <group ref={groupRef}>
      {/* Cover */}
      <mesh
        ref={coverRef}
        position-x={length - length / 2}
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
