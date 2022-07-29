import React, { useState, createContext } from "react";

export const PreloadContext = createContext();
export const AnimationContext = createContext();
export const ThreeContext = createContext();
export const AssetContext = createContext();

export const PreloadContextProvider = ({
  waitFor3D = false,
  waitForAnimation = false,
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState(waitForAnimation ? 0 : 1);
  const [threeLoaded, setThreeLoaded] = useState(waitFor3D ? 0 : 1);
  const [assetsLoaded, setAssetsLoaded] = useState(0);
console.log(threeLoaded,"on context", animation)
  return (
    <PreloadContext.Provider value={[loading, setLoading]}>
      <AnimationContext.Provider value={[animation, setAnimation]}>
        <ThreeContext.Provider value={[threeLoaded, setThreeLoaded]}>
          <AssetContext.Provider value={[assetsLoaded, setAssetsLoaded]}>
            {children}
          </AssetContext.Provider>
        </ThreeContext.Provider>
      </AnimationContext.Provider>
    </PreloadContext.Provider>
  );
};
