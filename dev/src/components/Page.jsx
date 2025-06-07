import * as THREE from "three";
import { useEffect, useRef } from "react";

const OPEN_PAGE_ROTATION = (-5 * Math.PI) / 6;

export default function Page({
  children,
  index,
  width,
  height,
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
    <group ref={ref} position={[0.0001, 0, 0.0001]}>
      <mesh
        position={[width / 2, 0, 0]}
        onClick={(event) => turnPage(event, index)}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color={index % 2 === 0 ? "yellow" : "orange"}
          side={THREE.DoubleSide}
        />
      </mesh>
      <axesHelper />
      {children}
    </group>
  );
}
