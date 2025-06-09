import { COVER_TYPE } from "../constants";

export default function Cover({ ref, type, dimensions, openBook, debug }) {
  return (
    <group ref={ref}>
      <mesh
        position={[
          dimensions.width / 2,
          0,
          ((type === COVER_TYPE.FRONT ? 1 : -1) * dimensions.thickness) / 2,
        ]}
        onClick={openBook}
      >
        <boxGeometry
          args={[dimensions.width, dimensions.height, dimensions.thickness]}
        />
        <meshStandardMaterial color="hotpink" wireframe={debug} />
      </mesh>
    </group>
  );
}
