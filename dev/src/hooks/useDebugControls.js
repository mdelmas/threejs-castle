import { useControls } from "leva";

let cachedDebug;

export const getDebug = () => cachedDebug;

export const useDebugControls = () => {
  const { debug } = useControls("debug", {
    debug: { value: false },
  });
  cachedDebug = debug;
  return { debug };
};
