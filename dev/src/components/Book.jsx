import { useRef, useState } from "react";
import { Float } from "@react-three/drei";
import { gsap } from "gsap";
import { useControls } from "leva";

const OPEN_PAGE_ROTATION = (-5 * Math.PI) / 6;

export default function Book() {
  const leftPageRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const { width, height, thickness, leftPageRotation, wireframe } = useControls(
    "book",
    {
      width: { value: 1 },
      height: { value: 1.4 },
      thickness: { value: 0.1 },
      leftPageRotation: {
        value: 0,
        min: -Math.PI,
        max: 0,
        step: Math.PI / 6,
      },
      wireframe: { value: false },
    }
  );
  const floatControls = useControls("book float", {
    speed: { value: 1, min: 0, max: 5, step: 0.01 },
    rotationIntensity: { value: 1, min: 0, max: 5, step: 0.01 },
    floatIntensity: { value: 1, min: 0, max: 5, step: 0.01 },
    floatingRange: { value: [-0.1, 0.1], min: -1, max: 1, step: 0.01 },
  });

  const openPageOnClick = () => {
    setIsOpen(!isOpen);

    gsap.to(leftPageRef.current.rotation, {
      y: isOpen ? 0 : OPEN_PAGE_ROTATION,
      duration: 1,
    });
  };

  return (
    <Float {...floatControls}>
      {/* Left page */}
      <group ref={leftPageRef} rotation={[0, leftPageRotation, 0]}>
        <mesh
          position={[width / 2, 0, thickness / 2]}
          onClick={openPageOnClick}
        >
          <boxGeometry args={[width, height, thickness]} />
          <meshStandardMaterial color="hotpink" wireframe={wireframe} />
        </mesh>
        <axesHelper />
      </group>
      {/* Right page */}
      <mesh position={[width / 2, 0, -thickness / 2]}>
        <boxGeometry args={[width, height, thickness]} />
        <meshStandardMaterial color="cornflowerblue" wireframe={wireframe} />
        <axesHelper />
      </mesh>
    </Float>
  );
}
