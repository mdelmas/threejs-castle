import * as THREE from "three";
import { useRef, useState } from "react";
import { Float } from "@react-three/drei";
import { gsap } from "gsap";
import { useControls } from "leva";

import Page from "./Page";
import Edge from "./Edge";
import Cover from "./Cover";

import {
  OPEN_PAGE_ROTATION,
  DOUBLE_PAGE_COUNT,
  PADDING,
  COVER_TYPE,
} from "../constants.js";

export default function Book({ debug }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const leftCoverRef = useRef();
  const pagesRef = useRef([]);
  const edgeRef = useRef();

  const { dimensions, leftCoverRotation } = useControls("book", {
    dimensions: { width: 1, height: 1.5, thickness: 0.15 },
    leftCoverRotation: { min: -Math.PI, max: 0, step: Math.PI / 6 },
  });

  const openBook = (event) => {
    event.stopPropagation();

    setIsOpen(!isOpen);
    // left cover rotation
    gsap.to(leftCoverRef.current.rotation, {
      y: !isOpen ? OPEN_PAGE_ROTATION : 0,
      duration: 1,
    });
    // edge rotation
    gsap.to(edgeRef.current.rotation, {
      y: !isOpen ? OPEN_PAGE_ROTATION / 2 : 0,
      duration: 1,
    });
  };

  const turnPage = (event, clickedPageNumber) => {
    event.stopPropagation();

    const action =
      currentPageNumber <= clickedPageNumber ? "forward" : "backward";
    console.log("in turnPage", clickedPageNumber, currentPageNumber, action);

    setCurrentPageNumber(clickedPageNumber + (action === "forward" ? 1 : 0));
    // turn page
    gsap.to(pagesRef.current[clickedPageNumber].rotation, {
      y: action === "forward" ? OPEN_PAGE_ROTATION : 0,
      duration: 1,
    });
  };

  console.log(pagesRef);

  return (
    <>
      <axesHelper args={[2]} />
      {/* Left page */}
      <Cover
        ref={leftCoverRef}
        type={COVER_TYPE.FRONT}
        dimensions={dimensions}
        openBook={openBook}
        debug={debug}
      />

      {/* Inside pages */}
      {Array.from({ length: DOUBLE_PAGE_COUNT - 1 }).map((_, i) => {
        return (
          <Page
            key={`page${i}`}
            index={i}
            ref={(el) => (pagesRef.current[i] = el)}
            dimensions={dimensions}
            turnPage={(event) => turnPage(event, i)}
          ></Page>
        );
      })}

      {/* Right cover */}
      <Cover type={COVER_TYPE.BACK} dimensions={dimensions} debug={debug} />

      {/* Edge */}
      <Edge ref={edgeRef} dimensions={dimensions} debug={debug} />
    </>
  );
}
