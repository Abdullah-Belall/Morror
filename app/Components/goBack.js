"use client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const BackButton = () => {
  useEffect(() => {
    const goBack = () => {
      if (typeof window !== "undefined") {
        window.history.back();
      }
    };
    const button = document.getElementById("backButton");
    if (button) {
      button.addEventListener("click", goBack);
    }
    return () => {
      if (button) {
        button.removeEventListener("click", goBack);
      }
    };
  }, []);
  return (
    <p id="backButton" className="backButton w-fit main-color m-0 fs-5 fw-normal d-flex align-items-center gap-2 normal pointer">
      <FontAwesomeIcon icon={faArrowLeft} /> Go back
    </p>
  );
};

export default BackButton;
