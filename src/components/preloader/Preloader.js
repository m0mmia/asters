import React, { useState } from "react";
import { PreloadContextProvider } from "./Context";
import { Loader } from "./Loader";

export default ({
  images = [],
  animation,
  children,
}) => {
  const [isFinished, setIsFinished] = useState(false);
  console.log("PRELOADER RENDER");

  return (
    <>
      {!isFinished && (
        <>
          {animation}
          <Loader setIsFinished={setIsFinished} images={images} />
        </>
      )}
      {isFinished && children}
    </>
  );
};
