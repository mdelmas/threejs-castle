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
  COVER_TYPE,
  BOOK_STATE,
} from "../constants.js";

export default function Book() {
  const [isOpen, setIsOpen] = useState(false);

  const pagesRefs = useRef([]);
  const [currentPage, setCurrentPage] = useState(null);

  const { dimensions, coverDimensions } = useControls("book", {
    dimensions: { width: 1, height: 1.5, thickness: 0.15 },
    coverDimensions: { value: { padding: 0.02, thickness: 0.02 } },
  });

  const turnPage = (event, clickedPageNumber) => {
    event.stopPropagation();

    // const action =
    //   currentPageNumber <= clickedPageNumber ? "forward" : "backward";
    // console.log("in turnPage", clickedPageNumber, currentPageNumber, action);

    // setCurrentPageNumber(clickedPageNumber + (action === "forward" ? 1 : 0));
    // turn page
    // gsap.to(pagesRefs.current[clickedPageNumber].rotation, {
    //   y: action === "forward" ? OPEN_PAGE_ROTATION : 0,
    //   duration: 1,
    // });
  };

  return (
    <>
      {/* <axesHelper args={[2]} /> */}
      {/* Left page */}
      <Cover
        type={COVER_TYPE.FRONT}
        isOpen={isOpen}
        dimensions={dimensions}
        coverDimensions={coverDimensions}
        openBook={(event) => {
          event.stopPropagation();
          setIsOpen(!isOpen);
        }}
      />

      {/* Inside pages */}
      {/* {Array.from({ length: DOUBLE_PAGE_COUNT - 1 }).map((_, i) => {
        return (
          <Page
            key={`page${i}`}
            index={i}
            ref={(el) => (pagesRefs.current[i] = el)}
            dimensions={dimensions}
            turnPage={(event) => turnPage(event, i)}
          ></Page>
        );
      })}*/}

      {/* Right cover */}
      <Cover
        type={COVER_TYPE.BACK}
        isOpen={isOpen}
        dimensions={dimensions}
        coverDimensions={coverDimensions}
      />

      {/* Edge */}
      <Edge
        isOpen={isOpen}
        dimensions={dimensions}
        coverDimensions={coverDimensions}
      />
    </>
  );
}
