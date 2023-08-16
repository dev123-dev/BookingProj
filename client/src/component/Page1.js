import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Page1() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [catArr, setCatArr] = useState([]);
  const [assetArr, setAssetArr] = useState([]);

  // Make a Post request to the backend API endpoint to Fetch All First Level Categories
  useEffect(() => {
    axios
      .post("http://localhost:5000/api", { belongsToId: null })
      .then((response) => {
        setCatArr(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //Handle First Level Category Click
  const handleClick = async (e, category) => {
    let filteredCategories;
    const { checked } = e.target;

    if (checked) {
      await axios
        .post(`http://localhost:5000/api`, { belongsToId: category._id })
        .then((response) => {
          const hasAssetFields = response.data.some((obj) =>
            obj.hasOwnProperty("assetName")
          );

          if (hasAssetFields) {
            setAssetArr((prevAssetArr) => [...prevAssetArr, ...response.data]);
          } else {
            setCatArr((prevCatArr) => [...prevCatArr, ...response.data]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setSelectedCategories([...selectedCategories, category._id]);
    } else {
      filteredCategories = filteredCategoriesRecursive(category, 0);
      setCatArr(catArr.filter(category => !filteredCategories.includes(category._id)));

      filteredCategories.push(category._id);  // Adding the Category selected 
      setSelectedCategories(selectedCategories.filter((catId) => !filteredCategories.includes(catId)));
      setAssetArr(assetArr.filter((assetObj) => !filteredCategories.includes(assetObj._id)));
    }
  };

  const filteredCategoriesRecursive = (category, index) => {
    const filteredCategories = category && (!category.belongsToId || index === 0) ? [] : [category._id];

    const childCategories = catArr.filter(cat => cat.belongsToId === category._id);

    for (const childCategory of childCategories) {
      filteredCategories.push(...filteredCategoriesRecursive(childCategory, ++index));
    }

    return filteredCategories;
  }

  // console.log("assetArr", assetArr);
  //console.log("catArray", catArr);
  //console.log("selectedCategoriesOutside", selectedCategories);


  return (
    <div>
      <div
        style={{ border: "1px solid red", height: "900px", width: "500px" }}
        className="main"
      >
        <h4 className="text-left ml-2">Category</h4>
        <div className="row col-lg-12 col-md-12 col-12">
          {catArr &&
            catArr.map((category, index) => {
              return (
                <div key={category._id} className="col-lg-6 col-md-4 my-2 text-left">
                  <input
                    key={category._id}
                    name={category.categoryName}
                    type="checkbox"
                    onChange={(e) => handleClick(e, category)}
                  />
                  &nbsp;
                  {category.categoryWithCount}
                </div>
              );
            })}
        </div>
        <div id="bottom">
          <button className="btnResult">
            Showing &nbsp;{assetArr.length} results
          </button>
        </div>
      </div>
    </div>
  );
}
