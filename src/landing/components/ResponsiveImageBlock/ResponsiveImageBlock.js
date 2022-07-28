import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getIsMobileWidth } from "../../../../utils";

const DiscoverBackground = styled.div`
  position: relative;
  background: url(${(props) => props.src});
  background-size: 100% 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  transform: translate3d(0, 0, 0);
`;

export const ImageContainer = styled.div`
  /* use a container to pass a width and height, use this one if you're in that way inclined.  */
`;

export default ({ image, imageMobile }) => {
  const [isMobile, setIsMobile] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const onResize = () => {
    setIsMobile(getIsMobileWidth());
  };

  const addDomEvents = () => {
    window.addEventListener("resize", onResize);
  };

  const removeDomEvents = () => {
    window.removeEventListener("resize", onResize);
  };

  const updateActiveImage = useCallback(() => {
    if (isMobile) {
      setActiveImage(imageMobile);
    } else {
      setActiveImage(image);
    }
  }, [isMobile]);

  useEffect(() => {
    updateActiveImage();
  }, [isMobile, updateActiveImage]);

  useEffect(() => {
    addDomEvents();
    onResize();
    return () => {
      removeDomEvents();
    };
  }, []);

  return activeImage && <DiscoverBackground src={activeImage} />;
};
