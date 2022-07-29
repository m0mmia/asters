import React, { useContext, useEffect, useRef, useState } from "react";
import { PreloadContext, AnimationContext, ThreeContext } from "./Context";
import { preloadAll } from "../../utils";

export const Loader = ({ setIsFinished, debug = false, images = [] }) => {
  const [loaded, setLoaded] = useState(0);
  const [loading, setLoading] = useContext(PreloadContext);
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  const [threeLoaded] = useContext(ThreeContext);
  const [animation] = useContext(AnimationContext);
  const counterRef = useRef({ counter: 0 });

  const loadImages = async (imgs) => {
    await preloadAll(imgs);
    setAssetsLoaded(1);
  };

  useEffect(() => {
    setLoaded((assetsLoaded + threeLoaded) / 2);

    if ((assetsLoaded + threeLoaded) / 2 === 1) {
      setLoading(false);
    }
  }, [assetsLoaded, threeLoaded]);

  useEffect(() => {
    if (!loading && animation >= 1) {
      setIsFinished(true);
    }
  }, [loading, animation]);

  useEffect(() => {
    loadImages(images);
  }, []);

  return <>{debug && <p>{loaded}</p>}</>;
};
