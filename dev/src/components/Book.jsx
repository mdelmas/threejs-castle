import { useControls } from "leva";

export default function Book() {
  const { width, height, thickness } = useControls("book", {
    width: { value: 1 },
    height: { value: 1.4 },
    thickness: { value: 0.1 },
  });

  return (
    <>
      {/* Right page */}
      <mesh>
        <boxGeometry args={[width, height, thickness]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      {/* Left page */}
      <mesh position={[0, 0, thickness]}>
        <boxGeometry args={[width, height, thickness]} />
        <meshStandardMaterial color="cornflowerblue" />
      </mesh>
    </>
  );
}
