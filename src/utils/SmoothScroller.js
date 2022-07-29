import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap/gsap-core";
import PubSub from "pubsub-js";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: ${(props) => (props.zIndex ? props.zIndex : 0)};
  pointer-events: ${(props) => (props.mouseDisabled ? "none" : "")};
`;

let lasty = -1;

let interval;
let lastHeight = 0;
let mobile = false;
let disable = false;
let timeout;
let moveData = { diff: 0, lastdiff: 0 };
let lastdiff = 0;
let scrollTarget = 0;
let currentPos = 0;
let scrollfactor = 20;
export const SmoothScrollerContext = React.createContext();

export function SmoothScroller(props) {
  const wrapperRef = useRef();
  function checkInterval() {
    let sh = wrapperRef.current.scrollHeight;
    if (sh != lastHeight) {
      document.body.style.height = wrapperRef.current.scrollHeight + "px";
      lastHeight = sh;
    }
  }

  function CheckPos() {
    let newy = parseInt(wrapperRef.current.style.top);
    let diff = lasty - newy;
    PubSub.publish("ScrollSpeed", diff);
    lasty = newy;
  }

  function StopCheck() {
    PubSub.publish("ScrollSpeed", 0);
  }

  function CheckPos2() {
    let newy = parseInt(document.documentElement.scrollTop);
    scrollTarget = newy;

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(StopCheck, 100);
  }

  function Scroll(e) {
    if (mobile) {
      CheckPos2();
    } else {
      gsap.killTweensOf(wrapperRef.current);
      gsap.to(wrapperRef.current, {
        top: 0 - document.documentElement.scrollTop,
        duration: props.speed,
        ease: "expo.out",
        onUpdate: CheckPos,
      });
    }

  }

  useEffect(() => {
    let animationFrameID;

    const update = () => {
      animationFrameID = requestAnimationFrame(update);
      if (Math.round(scrollTarget) != Math.round(currentPos)) {
        currentPos = currentPos + (scrollTarget - currentPos) / scrollfactor;
        let diff = lasty - currentPos;
        PubSub.publish("ScrollSpeed", diff);

        lasty = currentPos;
      }
    };

    window.addEventListener("scroll", Scroll);
    if (window.innerWidth >= 768 && disable == false) {
      interval = setInterval(checkInterval, 250);
    } else {
      wrapperRef.current.style.position = "static";
      mobile = true;
      update();
    }
    return () => {
      cancelAnimationFrame(animationFrameID);
      window.removeEventListener("scroll", Scroll);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <Wrapper
      mouseDisabled={props.mouseDisabled}
      ref={wrapperRef}
      zIndex={props.zIndex}
    >
      {props.children}
    </Wrapper>
  );
}
