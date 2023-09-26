import React, { useState } from "react";
import SlidingPage from "./SlidingPage";

export default function MainPage() {
  const [isPageOpen, setIsPageOpen] = useState(false);

  const togglePage = () => {
    setIsPageOpen(!isPageOpen);
  };
  return (
    <>
      <div className="text-center">
        {" "}
        <button
          className="open-button btn-css  text-center"
          onClick={togglePage}
        >
          {isPageOpen ? "Availabilty" : "Availabilty"}
        </button>
      </div>
      <SlidingPage isOpen={isPageOpen} onClose={togglePage} />
    </>
  );
}
