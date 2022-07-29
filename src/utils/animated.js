import React, { useRef, useEffect, useState, useContext } from "react";
import { TimelineMax } from "gsap";
import VisibilitySensor from "react-visibility-sensor";
import { Transition } from "react-transition-group";
const defaultVisibilitySensorOptions = {
  partialVisibility: true,
  minTopValue: 0,
  scrollCheck: true,
};
const AnimationContext = React.createContext();
export const AnimatedItem = React.forwardRef(
  ({ children, animation = (tl, ref) => {} }, ref) => {
    const { tl, isVisible, isDisabled } = useContext(AnimationContext);
    ref = ref || useRef();

    useEffect(() => {
      animation(tl, ref);
    }, []);

    return React.cloneElement(children, { ref });
  }
);

export const AnimatedContainer = ({
  children,
  timelineOptions = { paused: true },
  isDisabled = false,
  visibilitySensorOptions = defaultVisibilitySensorOptions,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [didAnimate, setDidAnimate] = useState(false);
  const ref = children.ref || useRef();
  const tl = useRef(new TimelineMax(timelineOptions));

  useEffect(() => {
    if (!isVisible || didAnimate) return;
    tl.current.restart();
    setDidAnimate(true);
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
          <AnimationContext.Provider
            value={{ isVisible, isDisabled, tl: tl.current }}
          >
            {React.cloneElement(children, { ref })}
          </AnimationContext.Provider>
        </Transition>
      )}
    </VisibilitySensor>
  );
};
