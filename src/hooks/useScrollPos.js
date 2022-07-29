import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { useTicker } from "../context/Ticker";

const clamp = (min, max, value) => Math.min(Math.max(value, min), max);
const approx = (x, y) => Math.abs(x - y) < Number.EPSILON;

function PERF_getBoundingClientRect(element) {
  if (!element.__BOUNDING_CLIENT_RECT) {
    element.__BOUNDING_CLIENT_RECT = element.getBoundingClientRect();
    window.__CLIENT_RECT_ARRAY.push(element);
  }
  return element.__BOUNDING_CLIENT_RECT;
}

export function useScrollPos(active = true, callback = () => {}) {
  const ticker = useTicker();
  const ref = useRef();
  const valueRef = useRef();

  useEffect(() => {
    const range = window.innerHeight;

    function animate() {
      const bounds = PERF_getBoundingClientRect(ref.current);
      const centerTopPos = bounds.top + bounds.height / 2;
      const onScreen = centerTopPos / range + 0.5;
      const top = clamp(0, 1, 1 - bounds.top / range);
      const bottom = clamp(0, 1, 1 - (bounds.top + bounds.height) / range);
      const total = Math.round((top + bottom + Number.EPSILON) * 100) / 100;
      const value = total / 2;

      if (!approx(valueRef.current, value)) {
        callback(onScreen, value);
      }

      valueRef.current = value;
    }

    if (active) {
      ticker.add(animate);
    }

    return () => {
      ticker.remove(animate);
    };
  }, [active]);

  return [ref];
}
