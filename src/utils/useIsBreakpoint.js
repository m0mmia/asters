import { useEffect, useState } from "react";

export function useIsBreakpoint(breakpoint) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const onResize = () => {
      setValue(window.matchMedia(`(min-width: ${breakpoint})`).matches);
    };

    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return value;
}
