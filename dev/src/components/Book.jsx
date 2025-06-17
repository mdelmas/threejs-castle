import * as THREE from "three";
import { useRef, useState } from "react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
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
  BOOK_STATE,
} from "../constants.js";

export default function Book({ debug }) {
  const openProgressRef = useRef({ value: BOOK_STATE.CLOSE });
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const pagesRef = useRef([]);

  const { dimensions, coverExtraLength, coverThickness } = useControls("book", {
    dimensions: { width: 1, height: 1.5, thickness: 0.15 },
    coverExtraLength: { value: 0.02, min: 0, max: 1, step: 0.01 },
    coverThickness: { value: 0.02, min: 0, max: 0.1, step: 0.001 },
  });

  const openBook = (event) => {
    event.stopPropagation();

    gsap.to(openProgressRef.current, {
      value:
        openProgressRef.current.value === BOOK_STATE.CLOSE
          ? BOOK_STATE.OPEN
          : BOOK_STATE.CLOSE,
      duration: 1,
    });

    //
    // cover length 0.884
    // edge length 0.055
  };

  // const turnPage = (event, clickedPageNumber) => {
  //   event.stopPropagation();

  //   const action =
  //     currentPageNumber <= clickedPageNumber ? "forward" : "backward";
  //   console.log("in turnPage", clickedPageNumber, currentPageNumber, action);

  //   setCurrentPageNumber(clickedPageNumber + (action === "forward" ? 1 : 0));
  //   // turn page
  //   gsap.to(pagesRef.current[clickedPageNumber].rotation, {
  //     y: action === "forward" ? OPEN_PAGE_ROTATION : 0,
  //     duration: 1,
  //   });
  // };

  return (
    <>
      {/* <axesHelper args={[2]} /> */}
      {/* Left page */}
      <Cover
        type={COVER_TYPE.FRONT}
        openProgressRef={openProgressRef}
        dimensions={dimensions}
        extraLength={coverExtraLength}
        thickness={coverThickness}
        openBook={openBook}
        debug={debug}
      />

      {/* Inside pages */}
      {/* {Array.from({ length: DOUBLE_PAGE_COUNT - 1 }).map((_, i) => {
        return (
          <Page
            key={`page${i}`}
            index={i}
            ref={(el) => (pagesRef.current[i] = el)}
            dimensions={dimensions}
            turnPage={(event) => turnPage(event, i)}
          ></Page>
        );
      })} */}

      {/* Right cover */}
      <Cover
        type={COVER_TYPE.BACK}
        openProgressRef={openProgressRef}
        dimensions={dimensions}
        extraLength={coverExtraLength}
        thickness={coverThickness}
        debug={debug}
      />

      {/* Edge */}
      <Edge
        openProgressRef={openProgressRef}
        dimensions={dimensions}
        debug={debug}
      />
    </>
  );
}
