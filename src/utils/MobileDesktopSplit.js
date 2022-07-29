import React, { useEffect, useState } from "react";
import { getIsMobileWidth } from "./getIsMobile";

export const MobileDesktopSplit = ({ DesktopContent, MobileContent }) => {
  const [isMobile, setIsMobile] = useState(getIsMobileWidth());

  const onResize = () => {
    setIsMobile(getIsMobileWidth());
  };

  const addDomEvents = () => {
    window.addEventListener("resize", onResize);
  };

  const removeDomEvents = () => {
    window.removeEventListener("resize", onResize);
  };

  useEffect(() => {
    addDomEvents();
    return () => {
      removeDomEvents();
    };
  }, []);
  return <div>{isMobile ? MobileContent : DesktopContent}</div>;
};
