"use client";

import { useLayoutEffect, useState } from "react";
import HomePage from "./HomePage";
import MobileHome from "./MobileHome";

export default function HandleHomePage() {
  const [isSmallScreen, setIsSmallScreen] = useState(null);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleScreenChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    handleScreenChange(mediaQuery);
    mediaQuery.addEventListener("change", handleScreenChange);
    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  if (isSmallScreen === null) {
    return (
      <>
        <div className="loader position-absolute top-50 start-50 translate-middle">
          <span className="loader-text position-absolute top-0 fs-5">loading</span>
          <span className="load"></span>
        </div>
      </>
    );
  }

  return isSmallScreen ? <MobileHome /> : <HomePage />;
}
