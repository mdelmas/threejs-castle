import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./components/Lights";
import Book from "./components/Book";

import { useDebugControls } from "./hooks/useDebugControls";

export default function App() {
  const { debug } = useDebugControls();

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
      <Lights />
      {/* Elements */}
      <Book />
    </Canvas>
  );
}
