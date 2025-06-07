import * as THREE from "three";
import { useRef, useState } from "react";
import { Float } from "@react-three/drei";
import { gsap } from "gsap";
import { useControls } from "leva";

import Page from "./Page";

const OPEN_PAGE_ROTATION = (-5 * Math.PI) / 6;
const DOUBLE_PAGE_COUNT = 3;

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
    event.stopPropagation();

    setIsOpen(!isOpen);
    gsap.to(leftPageRef.current.rotation, {
      y: !isOpen ? OPEN_PAGE_ROTATION : 0,
      duration: 1,
    });
  };

  const turnPage = (event, clickedPageNumber) => {
    event.stopPropagation();

    const action =
      currentPageNumber <= clickedPageNumber ? "forward" : "backward";
    console.log(
      "clicked page",
      clickedPageNumber,
      "currentPageNumber",
      currentPageNumber,
      "action",
      action
    );

    setCurrentPageNumber(clickedPageNumber + (action === "forward" ? 1 : 0));

    gsap.to(pagesRef.current[clickedPageNumber].rotation, {
      y: action === "forward" ? OPEN_PAGE_ROTATION : 0,
      duration: 1,
    });
  };

  console.log(pagesRef.current);

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
      {Array.from({ length: DOUBLE_PAGE_COUNT - 1 }).map((_, i) => {
        return (
          <Page
            key={`page${i}`}
            index={i}
            width={width}
            height={height}
            turnPage={turnPage}
            setRef={(ref) => (pagesRef.current[i] = ref)}
          >
            {/* <mesh>
              <planeGeometry />
              <meshStandardMaterial color="green" />
            </mesh> */}
          </Page>
        );
      })}

      {/* Right page */}
      <mesh position={[width / 2, 0, -thickness / 2]}>
        <boxGeometry args={[width, height, thickness]} />
        <meshStandardMaterial color="cornflowerblue" wireframe={wireframe} />
      </mesh>
    </Float>
  );
}
