import * as THREE from "three";
import { useRef, useState } from "react";
import { Float } from "@react-three/drei";
import { gsap } from "gsap";
import { useControls } from "leva";

const OPEN_PAGE_ROTATION = (-5 * Math.PI) / 6;
const DOUBLE_PAGE_COUNT = 4;

export default function Book() {
  const leftPageRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const pagesRef = useRef([]);

  const {
    width,
    height,
    thickness,
    // pageThickness,
    leftCoverRotation,
    innerPageRotation,
    wireframe,
  } = useControls("book", {
    width: { value: 1 },
    height: { value: 1.4 },
    thickness: { value: 0.1 },
    // pageThickness: { value: 0.005 },
    leftCoverRotation: {
      value: 0,
      min: -Math.PI,
      max: 0,
      step: Math.PI / 6,
    },
    innerPageRotation: {
      value: 0,
      min: -Math.PI,
      max: 0,
      step: Math.PI / 6,
    },
    wireframe: { value: false },
  });
  const floatControls = useControls("book float", {
    speed: { value: 1, min: 0, max: 5, step: 0.01 },
    rotationIntensity: { value: 1, min: 0, max: 5, step: 0.01 },
    floatIntensity: { value: 1, min: 0, max: 5, step: 0.01 },
    floatingRange: { value: [-0.1, 0.1], min: -1, max: 1, step: 0.01 },
  });

  const openBook = (event) => {
    const newIsOpen = !isOpen;

    setIsOpen(newIsOpen);
    gsap.to(leftPageRef.current.rotation, {
      y: newIsOpen ? OPEN_PAGE_ROTATION : 0,
      duration: 1,
    });

    event.stopPropagation();
  };

  const turnPage = (event, clickedPageNumber) => {
    event.stopPropagation();

    const action =
      currentPageNumber <= clickedPageNumber ? "forward" : "backward";

    setCurrentPageNumber(clickedPageNumber + (action === "forward" ? 1 : 0));

    pagesRef.current[clickedPageNumber].y += 10;
    gsap.to(pagesRef.current[clickedPageNumber].rotation, {
      y: action === "forward" ? OPEN_PAGE_ROTATION : 0,
      duration: 1,
    });
  };

  return (
    <Float {...floatControls}>
      {/* Left page */}
      <group ref={leftPageRef} rotation={[0, leftCoverRotation, 0]}>
        <mesh position={[width / 2, 0, thickness / 2]} onClick={openBook}>
          <boxGeometry args={[width, height, thickness]} />
          <meshStandardMaterial color="hotpink" wireframe={wireframe} />
        </mesh>
      </group>

      {/* Inside pages */}
      {Array.from({ length: DOUBLE_PAGE_COUNT - 1 }).map((_, i) => (
        <group
          ref={(ref) => (pagesRef.current[i] = ref)}
          position={[0.0001, 0, 0.0001]}
          rotation={[0, innerPageRotation, 0]}
          key={`page${i}`}
        >
          <mesh
            position={[width / 2, 0, 0]}
            onClick={(event) => turnPage(event, i)}
          >
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "yellow" : "orange"}
              wireframe={wireframe}
              side={THREE.DoubleSide}
            />
          </mesh>
          <axesHelper />
        </group>
      ))}

      {/* Right page */}
      <mesh position={[width / 2, 0, -thickness / 2]}>
        <boxGeometry args={[width, height, thickness]} />
        <meshStandardMaterial color="cornflowerblue" wireframe={wireframe} />
      </mesh>
    </Float>
  );
}
