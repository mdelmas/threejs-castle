import * as THREE from "three";
import { PADDING } from "../constants";
import { useControls } from "leva";

export default function Page({ index, ref, dimensions, turnPage, children }) {
  const { thickness, innerPageRotation } = useControls("book pages", {
    thickness: { value: 0.1 },
    innerPageRotation: {
      value: 0,
      min: -Math.PI,
      max: 0,
      step: Math.PI / 6,
    },
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Left page */}
      <mesh
        position={[dimensions.width / 2, 0, -thickness / 2 + PADDING]}
        onClick={turnPage}
      >
        <boxGeometry
          args={[
            dimensions.width - PADDING,
            dimensions.height - PADDING,
            thickness,
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
