import { useState, useEffect } from "react";

export const useIsSmallScreen = (breakpoint = 768) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < breakpoint);
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isSmallScreen;
};