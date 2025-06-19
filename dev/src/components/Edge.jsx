import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { getDebug } from "../hooks/useDebugControls";
import { OPEN_PAGE_ROTATION, PADDING } from "../constants.js";

const OPEN_LENGTH_FACTOR = 0.3567; // edge length when open = 0.055

export default function Edge({ isOpen, dimensions, coverDimensions }) {
  const debug = getDebug();

  const groupRef = useRef();
  const coverSidesRef = useRef([]);

  const length = dimensions.thickness + 0.02;

  useEffect(() => {
    if (!groupRef.current || !coverSidesRef.current) return;

    // rotate edge when open
    gsap.to(groupRef.current.rotation, {
      y: isOpen ? OPEN_PAGE_ROTATION / 2 : 0,
      duration: 1,
      ease: "power1.out",
    });

    // shorten edge sides
    coverSidesRef.current.forEach((coverSide) => {
      gsap.to(coverSide.scale, {
        x: isOpen ? OPEN_LENGTH_FACTOR : 1,
        duration: 1,
        ease: "power1.out",
      });
      gsap.to(coverSide.position, {
        x: isOpen
          ? -length + (length * OPEN_LENGTH_FACTOR) / 2
          : -length + length / 2,
        duration: 1,
        ease: "power1.out",
      });
    });
  }, [length, isOpen]);

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
