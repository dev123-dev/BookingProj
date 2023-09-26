//New code
import React from "react";
import axios from "axios";
import "../component/styles/style.css";
import { useState, useEffect } from "react";
import Page2 from "./Page2";
import cancel from "../asset/cancel.png";

export default function Page1() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [catArr, setCatArr] = useState([]);
  const [assetArr, setAssetArr] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [openDivs, setOpenDivs] = useState({});

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

  //handle the checkbox select operation
  const [selectCheckbox, setSelectCheckbox] = useState([]);
  const [categoryDataFetched, setCategoryDataFetched] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleClick = async (e, category) => {
    let filteredCategories;
    const { checked } = e.target;
    if (selectCheckbox.includes(category._id)) {
      setSelectCheckbox(selectCheckbox.filter((item) => item !== category._id));
    } else {
      setSelectCheckbox([...selectCheckbox, category._id]);
    }

    if (checked && !categoryDataFetched.includes(category._id)) {
      // Only fetch data if it hasn't been fetched for this category before
      axios
        .post(`http://localhost:5000/api`, { belongsToId: category._id })
        .then((response) => {
          const hasAssetFields = response.data.some((obj) =>
            obj.hasOwnProperty("assetName")
          );

          setSubCategory((prevSubCategories) => {
            return [...prevSubCategories, ...response.data];
          });

          if (hasAssetFields) {
            setAssetArr((prevAssetArr) => [...prevAssetArr, ...response.data]);
            setSelectedCheckboxes([...selectedCheckboxes, category]);
          } else {
            setCatArr((prevCatArr) => [...prevCatArr, ...response.data]);
            setSelectedCheckboxes(
              selectedCheckboxes.filter((item) => item._id !== category._id)
            );
          }

          // Mark this category as fetched
          setCategoryDataFetched([...categoryDataFetched, category._id]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item._id !== category._id)
      );
      filteredCategories = filteredCategoriesRecursive(category, 0);
      setCatArr(catArr.filter((cat) => !filteredCategories.includes(cat._id)));

      filteredCategories.push(category._id); // Adding the Category selected
      setSelectedCategories(
        selectedCategories.filter(
          (catId) => !filteredCategories.includes(catId)
        )
      );
      setAssetArr(
        assetArr.filter(
          (assetObj) => !filteredCategories.includes(assetObj._id)
        )
      );
    }
  };

  const filteredCategoriesRecursive = (category, index) => {
    const filteredCategories =
      category && (!category.belongsToId || index === 0) ? [] : [category._id];

    const childCategories = catArr.filter(
      (cat) => cat.belongsToId === category._id
    );

    for (const childCategory of childCategories) {
      filteredCategories.push(
        ...filteredCategoriesRecursive(childCategory, ++index)
      );
    }

    return filteredCategories;
  };

  //category array for ground level categories

  let categoryArr = [];
  categoryArr = catArr && catArr.filter((cat) => cat.belongsToId === null);
  //category array for subcategories containing only categoryName
  let sub = [];
  sub = subcategory && subcategory.filter((sub) => sub.categoryName);

  const handleDeselect = (category) => {
    const updatedSelectedCheckboxes = selectedCheckboxes.filter(
      (item) => item._id !== category._id
    );
    setSelectedCheckboxes(updatedSelectedCheckboxes);

    const checkbox = document.getElementsByName(category.categoryName)[0];
    if (checkbox) {
      checkbox.checked = false;
      handleClick({ target: checkbox }, category);
    }
  };

  const clearFilter = () => {
    // Uncheck all selected checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedCheckboxes([]);
    setAssetArr([]);
    setSubCategory([]);
    setSelectCheckbox([]);
    setSelectedCategories([]);
  };
  return (
    <div className="justify-content-center">
      <div>
        <h5>
          <button
            style={{ fontSize: "16px" }}
            className="btnclear"
            onClick={() => clearFilter()}
          >
            Clear
          </button>
        </h5>
      </div>

      <div
        className="col-lg-12 col-md-12 col-sm-12 selection"
        style={{ width: "350px" }}
      >
        {selectedCheckboxes &&
          selectedCheckboxes.map((selectedCategory, index) => (
            <div key={index} style={{ margin: "5px" }}>
              {selectedCategory.categoryName}
              <img
                src={cancel}
                alt="cancel"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeselect(selectedCategory)}
                width="20px"
                height="20px"
              />
            </div>
          ))}
      </div>

      {/*show ground level categories*/}
      <div
        style={{ height: "700px", width: "450px" }}
        className="main col-lg-12 col-sm-12 col-md-12"
      >
        <h4 className="text-left ml-2">Category</h4>
        <div className="row col-lg-12 col-md-12 col-12 ">
          {categoryArr &&
            categoryArr.map((category, index) => {
              return (
                <div key={index} className="col-lg-6 col-md-4 my-2 text-left">
                  <input
                    key={category._id}
                    name={category.categoryName}
                    type="checkbox"
                    onChange={(e) => handleClick(e, category)}
                    // checked={selectCheckbox.includes(category._id)}
                  />
                  &nbsp;
                  {category.categoryWithCount}
                </div>
              );
            })}
        </div>
        {/* End of showing ground level categories */}
        {/* show subcategories */}
        {selectCheckbox.map((selectedId, index) => (
          <>
            <div
              key={index}
              style={{ border: "1px solid green" }}
              className="col-lg-12 col-sm-12 col-md-12 my-1"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {sub.find((item) => item._id === selectedId)?.categoryName}

                {
                  categoryArr.find((item) => item._id === selectedId)
                    ?.categoryName
                }

                <div
                  onClick={() => {
                    setOpenDivs((prevState) => ({
                      ...prevState,
                      [selectedId]: !prevState[selectedId],
                    }));
                  }}
                  style={{
                    cursor: "pointer",
                    marginLeft: "auto",
                  }}
                >
                  {openDivs[selectedId] ? "▼" : "▲"}
                </div>
              </div>

              {!openDivs[selectedId] && (
                <div>
                  {sub &&
                    sub
                      .filter((category) => category.belongsToId === selectedId)
                      .map((category, index) => {
                        return (
                          <div
                            key={index}
                            className="col-lg-12 col-sm-12 col-md-12 my-2 "
                          >
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
              )}
            </div>
          </>
        ))}
        {/*End of show subcategories*/}
        {/* Button showing count of assets */}

        <div id="bottom">
          <button className="btnResult">
            Showing &nbsp;{assetArr.length}&nbsp;results
          </button>
        </div>
      </div>

      <Page2 data={assetArr} />
    </div>
  );
}
