import React, { useContext, useEffect } from "react";
import { ThreeDshoe } from "./components/threeDshoe/index";
import { Sections } from "./sections";
import { SiteContentContext } from "./components/SiteContext";

export default React.memo(() => {
  const [siteContent] = useContext(SiteContentContext);
  console.log("PAGE RENDER");

  useEffect(() => {
    if (!siteContent) return;

    var divsToHide = document.getElementsByClassName("s-footer");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.height = "auto";
    }
  }, [siteContent]);

  return <>{siteContent && <Sections />}</>;
});
