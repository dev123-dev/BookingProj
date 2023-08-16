import React from "react";
import assetArr from "../component/Page1";

export default function Page2({ data }) {
  return (
    <>
      <div>
        {data &&
          data.map((category, index) => {
            return (
              <div
                key={category._id}
                className="col-lg-6 col-md-4 my-2 text-left"
              >
                {category.assetName}
              </div>
            );
          })}
      </div>
    </>
  );
}
