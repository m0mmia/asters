import React, { useRef, useEffect, useContext } from "react";
import bodymovin from "lottie-web";
import styled from "styled-components";
import { assetUrl, proportional } from "../../utils";
import gsap from "gsap";
import {
  AnimationContext,
  PreloadContext,
} from "../../components/preloader";

const Container = styled.div.attrs({ width: [150, 200] })`
  ${proportional}
`;

export const LoaderAnimation = () => {
  const [animation, setAnimation] = useContext(AnimationContext);
  const [loading] = useContext(PreloadContext);
  const containerRef = useRef();
  const animRef = useRef();
  const dataRef = useRef({ frame: 0 });
  const fps = 30;
  const frameStop = 100;
  const frameEnd = 150;

  function setFrame(animRef, dataRef) {
    animRef.current.goToAndStop(dataRef.current.frame, true);
  }

  const playStart = () => {
    gsap.to(dataRef.current, frameStop / fps, {
      frame: frameStop,
      ease: "none",
      onUpdate: () => {
        setFrame(animRef, dataRef);
      },
      onComplete: () => {
        setAnimation(0.5);
      },
    });
  };

  const playEnd = () => {
    gsap.to(dataRef.current, (frameEnd - frameStop) / fps, {
      frame: frameEnd,
      ease: "none",
      onUpdate: () => {
        setFrame(animRef, dataRef);
      },
      onComplete: () => {
        setAnimation(1);
      },
    });
  };

  useEffect(() => {
    animRef.current = bodymovin.loadAnimation({
      container: containerRef.current,
      path: assetUrl("/lottie/karlkani2/preloader.json"),
      renderer: "svg",
      autoplay: false,
    });

    animRef.current.addEventListener("DOMLoaded", playStart);
  }, []);

  useEffect(() => {
    if (animation >= 0.5 && !loading) {
      playEnd();
    }
  }, [animation, loading]);

  return <Container ref={containerRef}></Container>;
};
