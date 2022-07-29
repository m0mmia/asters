import React from "react";

const TickerContext = React.createContext();

function PERF_clearClientRectCache() {
  const rects = window.__CLIENT_RECT_ARRAY;

  for (let i = 0; i < rects.length; i++) {
    rects[i].__BOUNDING_CLIENT_RECT = null;
  }

  window.__CLIENT_RECT_ARRAY = [];
}

export const TickerProvider = (props) => {
  const pool = React.useRef([]);
  const context = {
    add(callback) {
      pool.current = pool.current.concat(callback);
    },
    remove(callback) {
      pool.current = pool.current.filter((item) => item !== callback);
    },
  };

  function onScroll() {
    PERF_clearClientRectCache();
  }

  function onResize() {
    PERF_clearClientRectCache();
  }

  React.useEffect(() => {
    window.__CLIENT_RECT_ARRAY = [];

    function tick() {
      pool.current.forEach((callback) => callback());
      requestAnimationFrame(tick);
    }

    tick();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <TickerContext.Provider value={context}>
      {props.children}
    </TickerContext.Provider>
  );
};

export const useTicker = () => React.useContext(TickerContext);
