import React, { useState, createContext } from "react";

export const ThreeShoeContext = createContext();
export const ThreeShoelaceContext = createContext();
export const ThreeShoelaceTexture1Context = createContext();
export const ThreeShoelaceTexture2Context = createContext();

export default React.memo(({ children }) => {
  const [shoeLoaded, setShoeLoaded] = useState({});
  const [shoelaceLoaded, setShoelaceLoaded] = useState({});
  const [texture1Loader, setTexture1Loaded] = useState({});
  const [texture2Loader, setTexture2Loaded] = useState({});
  const [three, setThree] = useState(null);
  return (
    <ThreeShoeContext.Provider value={[shoeLoaded, setShoeLoaded]}>
      <ThreeShoelaceContext.Provider value={[shoelaceLoaded, setShoelaceLoaded]}>
          <ThreeShoelaceTexture1Context.Provider value={[texture1Loader, setTexture1Loaded]}>
            <ThreeShoelaceTexture2Context.Provider value={[texture2Loader, setTexture2Loaded]}>
              
                {children}
  
            </ThreeShoelaceTexture2Context.Provider >
          </ThreeShoelaceTexture1Context.Provider >
      </ThreeShoelaceContext.Provider >
    </ThreeShoeContext.Provider >
  );
});
