import * as THREE from "three";
import { useRef, useState } from "react";
import { Float } from "@react-three/drei";
import { gsap } from "gsap";
import { useControls } from "leva";

import Page from "./Page";

import { OPEN_PAGE_ROTATION, DOUBLE_PAGE_COUNT } from "../constants.js";

const PADDING = 0.0001;

export default function Book() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const leftCoverRef = useRef();
  const pagesRef = useRef([]);
  const edgeRef = useRef();

  const bookControls = useControls("book", {
    width: { value: 1 },
    height: { value: 1.4 },
    thickness: { value: 0.1 },
    position: { value: { x: 0, y: 0, z: 0 } },
    groupPosition: { value: { x: 0, y: 0, z: 0 } },
    leftCoverRotation: {
      value: 0,
      min: -Math.PI,
      max: 0,
      step: Math.PI / 6,
    },
    positionOffset: { value: 0 },
    wireframe: { value: false },
  });
  // const floatControls = useControls("book float", {
  //   speed: { value: 1, min: 0, max: 5, step: 0.01 },
  //   rotationIntensity: { value: 1, min: 0, max: 5, step: 0.01 },
  //   floatIntensity: { value: 1, min: 0, max: 5, step: 0.01 },
  //   floatingRange: { value: [-0.1, 0.1], min: -1, max: 1, step: 0.01 },
  // });

  const pagesControls = useControls("book pages", {
    pagesCount: { value: 2, step: 1, min: 0 },
    pageThickness: { value: 0 },
    innerPageRotation: {
      value: 0,
      min: -Math.PI,
      max: 0,
      step: Math.PI / 6,
    },
  });

  const edgeControls = useControls("book edge", {
    rotation: { value: 0, min: -Math.PI / 2, max: 0 },
    groupRotation: { value: 0, min: -Math.PI / 2, max: 0 },
    position: { value: { x: -bookControls.thickness / 2, y: 0, z: 0 } },
    edgeExtraThickness: { value: 0.02 },
  });

  const openBook = (event) => {
    event.stopPropagation();

    setIsOpen(!isOpen);
    gsap.to(leftCoverRef.current.rotation, {
      y: !isOpen ? OPEN_PAGE_ROTATION : 0,
      duration: 1,
    });
    gsap.to(edgeRef.current.rotation, {
      y: !isOpen ? OPEN_PAGE_ROTATION / 2 : 0,
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

  return (
    <>
      {/* <Float {...floatControls}> */}
      <axesHelper args={[2]} />
      {/* Left page */}
      <group
        ref={leftCoverRef}
        rotation={[0, bookControls.leftCoverRotation, 0]}
        position={[-bookControls.positionOffset, 0, 0]}
      >
        <mesh
          position={[
            bookControls.width / 2 + bookControls.positionOffset,
            0,
            bookControls.thickness / 2 + bookControls.positionOffset,
          ]}
          onClick={openBook}
        >
          <boxGeometry
            args={[
              bookControls.width,
              bookControls.height,
              bookControls.thickness,
            ]}
          />
          <meshStandardMaterial
            color="hotpink"
            wireframe={bookControls.wireframe}
          />
        </mesh>
        <axesHelper args={[1]} />
      </group>
      {/* Inside pages */}
      {Array.from({ length: DOUBLE_PAGE_COUNT - 1 }).map((_, i) => {
        return (
          <Page
            key={`page${i}`}
            index={i}
            width={bookControls.width}
            height={bookControls.height}
            pageThickness={pagesControls.pageThickness}
            turnPage={turnPage}
            setRef={(ref) => (pagesRef.current[i] = ref)}
          ></Page>
        );
      })}
      {/* Right page */}
      {/* <group position={[0, 0, -positionOffset / 2]}> */}
      <mesh position={[bookControls.width / 2, 0, -bookControls.thickness / 2]}>
        <boxGeometry
          args={[
            bookControls.width,
            bookControls.height,
            bookControls.thickness,
          ]}
        />
        <meshStandardMaterial
          color="cornflowerblue"
          wireframe={bookControls.wireframe}
        />
      </mesh>
      {/* </group> */}
      {/* Side */}
      <group ref={edgeRef} rotation={[0, edgeControls.groupRotation, 0]}>
        <mesh
          position={[
            edgeControls.position.x -
              edgeControls.edgeExtraThickness / 2 -
              PADDING,
            edgeControls.position.y,
            edgeControls.position.z,
          ]}
          rotation={[0, edgeControls.rotation, 0]}
        >
          <boxGeometry
            args={[
              bookControls.thickness + edgeControls.edgeExtraThickness,
              bookControls.height + PADDING,
              bookControls.thickness * 2 +
                pagesControls.pageThickness * pagesControls.pagesCount,
            ]}
            wireframe={bookControls.wireframe}
          />
          <meshStandardMaterial
            color="plum"
            wireframe={bookControls.wireframe}
          />
        </mesh>
      </group>
      {/* </Float> */}
    </>
  );
}
