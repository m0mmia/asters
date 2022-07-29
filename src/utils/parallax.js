import React, { useRef, useEffect, useState, useContext } from "react";
import { TweenMax } from "gsap";
import VisibilitySensor from "react-visibility-sensor";
import { Transition } from "react-transition-group";
const visibilitySensorOptions = {
  partialVisibility: true,
  minTopValue: 0,
  scrollCheck: true,
};
const ParallaxContext = React.createContext();
export const ParallaxItem = ({
  children,
  y = 0,
  x = 0,
  z = 0,
  smoothness = 0.1,
  clamp = false,
}) => {
  const { percentage, isVisible, isDisabled } = useContext(ParallaxContext);
  const ref = children.ref || useRef();
  const currentPercentage = useRef(0.0);
  useEffect(() => {
    if (!isVisible || isDisabled) return;
    let animationFrameID;
    const animate = () => {
      currentPercentage.current +=
        (percentage - currentPercentage.current) * smoothness;

      if (clamp) {
        currentPercentage.current = Math.max(
          0,
          Math.min(1, currentPercentage.current)
        );
      }

      TweenMax.set(ref.current, {
        x: x * currentPercentage.current,
        y: y * currentPercentage.current,
        z,
      });

      animationFrameID = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameID);
    };
  }, [isVisible, percentage, isDisabled]);
  return React.cloneElement(children, { ref });
};

export const ParallaxContainer = ({ children, isDisabled = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [percentage, setPercentage] = useState(0.0);
  const ref = children.ref || useRef();

  useEffect(() => {
    if (!isVisible || isDisabled) return;
    const { current } = ref;
    const getPercentage = () => {
      const { top, bottom, height } = current.getBoundingClientRect();
      let nextPercentage = 0;
      if (top > 0) {
        nextPercentage = top / height;
      } else {
        nextPercentage = 1 - bottom / height;
        nextPercentage = -nextPercentage;
      }
      return Math.min(1, Math.max(-1, nextPercentage));
    };
    const onScroll = () => setPercentage(getPercentage());
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isVisible]);

  return (
    <VisibilitySensor {...visibilitySensorOptions}>
      {({ isVisible }) => (
        <Transition
          in={isVisible}
          appear
          onEnter={() => setIsVisible(true)}
          onExit={() => setIsVisible(false)}
          timeout={1500}
        >
          <ParallaxContext.Provider
            value={{ percentage, isVisible, isDisabled }}
          >
            {React.cloneElement(children, { ref })}
          </ParallaxContext.Provider>
        </Transition>
      )}
    </VisibilitySensor>
  );
};
