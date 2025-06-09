import * as THREE from "three";
import { useEffect, useRef } from "react";
import { PADDING } from "../constants";

const OPEN_PAGE_ROTATION = (-5 * Math.PI) / 6;

export default function Page({
  children,
  index,
  dimensions,
  pageThickness,
  // state,
  turnPage,
  setRef,
}) {
  // console.log("Page component rendered", index, width, height);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setRef(ref.current);
    }
  }, [ref, setRef]);

  return (
    <group ref={ref} position={[PADDING, 0, PADDING]}>
      {/* Pages */}
      {/* Left page */}
      <mesh
        position={[dimensions.width / 2, 0, 0]}
        onClick={(event) => turnPage(event, index)}
      >
        <boxGeometry
          args={[
            dimensions.width - PADDING,
            dimensions.height - PADDING,
            pageThickness,
          ]}
        />
        <meshStandardMaterial
          color={index % 2 === 0 ? "yellow" : "orange"}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Right page */}
      {/* <mesh
        position={[width / 2, 0, 0]}
        onClick={(event) => turnPage(event, index)}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color={index % 2 === 0 ? "yellow" : "orange"}
          side={THREE.DoubleSide}
        />
      </mesh> */}
      {/* Content */}
      {children}
    </group>
  );
}
