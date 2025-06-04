import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import Lights from "./components/Lights";
import Book from "./components/Book";

export default function App() {
  const { debug } = useControls("general", { debug: true });

  return (
    <Canvas>
      {/* Setup */}
      {debug && (
        <>
          <Stats />
          {/* <axesHelper /> */}
        </>
      )}
      <OrbitControls />
      {/* Lights */}
      <Lights debug={debug} />
      {/* Elements */}
      <Book />
    </Canvas>
  );
}
