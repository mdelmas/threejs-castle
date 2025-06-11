import * as THREE from "three";
import { PADDING, OPEN_PAGE_ROTATION } from "../constants";
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

  const angleToMiddle = (Math.PI + OPEN_PAGE_ROTATION) / 2;
  const rotationOffset = Math.tan(angleToMiddle) * (thickness / 2);

  return (
    <group
      ref={ref}
      position={[-rotationOffset, 0, -thickness / 2 + PADDING]}
      rotation={[0, innerPageRotation, 0]}
    >
      <axesHelper args={[2]} />

      {/* Left page */}
      <mesh
        position={[dimensions.width / 2 + rotationOffset - PADDING / 2, 0, 0]} // z = -thickness / 2 + PADDING
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
