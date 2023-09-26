import React from "react";
import "../component/styles/Slider.css";
import "../component/styles/Filter.css";
import closebtn from "../asset/close.png";
import FilterList from "./FilterList";

function SlidingPage({ isOpen, onClose }) {
  const pageStyles = {
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
  };

  return (
    <div
      className={`sliding-page ${isOpen ? "open" : "closed"}`}
      style={pageStyles}
    >
      <div className="sliding-page-content">
        <div className="row mt-4 col-lg-12 col-sm-12 col-md-12">
          <div className="col-lg-6 col-sm-2 col-md-6 Heading">
            {" "}
            Check Availabilty
          </div>
          <div className="text-right col-lg-6 col-sm-2 col-md-6">
            <img
              src={closebtn}
              onClick={onClose}
              className="closeimg"
              alt="close"
            />
          </div>
        </div>

        <div className="justify-content-center ml-3 mt-3">
          <FilterList />
        </div>
      </div>
    </div>
  );
}

export default SlidingPage;
