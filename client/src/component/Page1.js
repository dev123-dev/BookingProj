import React from "react";
import axios from "axios";
import "../component/style.css";
import { useState, useEffect } from "react";
import Page2 from "./Page2";

export default function Page1() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [catArr, setCatArr] = useState([]);
  const [assetArr, setAssetArr] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [subcategory2, setSubCategory2] = useState([]);
  const [subcategory3, setSubCategory3] = useState([]);

  //to maintain the state of div for sub categories
  const [showSubCat, setShowSubCat] = useState(false);
  const [catSubSelect, setCatSubSelect] = useState(false);

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
          setSubCategory(response.data);
          setCatSubSelect(true);
          setShowSubCat(false);

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
      setSubCategory2([]);
      setCatSubSelect(false);
      setShowSubCat(false);

      filteredCategories = filteredCategoriesRecursive(category, 0);
      setCatArr(
        catArr.filter((category) => !filteredCategories.includes(category._id))
      );

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

  const handleClick1 = async (e, category) => {
    let filteredCategories;
    const { checked } = e.target;

    if (checked) {
      await axios
        .post(`http://localhost:5000/api`, { belongsToId: category._id })
        .then((response) => {
          const hasAssetFields = response.data.some((obj) =>
            obj.hasOwnProperty("assetName")
          );
          // setSubCategory2(response.data);

          setSubCategory2((prevAssetArr) => [
            ...prevAssetArr,
            ...response.data,
          ]);
          setShowSubCat(true);

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
      setShowSubCat(false);
      setSubCategory2([]);

      filteredCategories = filteredCategoriesRecursive(category, 0);
      setCatArr(
        catArr.filter((category) => !filteredCategories.includes(category._id))
      );

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
  const handleClick2 = async (e, category) => {
    let filteredCategories;
    const { checked } = e.target;

    if (checked) {
      await axios
        .post(`http://localhost:5000/api`, { belongsToId: category._id })
        .then((response) => {
          const hasAssetFields = response.data.some((obj) =>
            obj.hasOwnProperty("assetName")
          );
          setSubCategory3(response.data);

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
      setCatArr(
        catArr.filter((category) => !filteredCategories.includes(category._id))
      );

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

  // console.log("assetArr", assetArr);
  // console.log("catArray", catArr);
  // console.log("selectedCategoriesOutside", selectedCategories);

  //category array for ground level categories

  let categoryArr = [];
  categoryArr = catArr && catArr.filter((cat) => cat.belongsToId === null);
  //category array for subcategories
  let sub = [];
  sub = subcategory && subcategory.filter((sub) => sub.categoryName);

  // const [divs, setDivs] = useState([]);
  // const addDiv = () => {

  //   const newDivs = [
  //     ...divs,
  //     <div className="dynamic-div">
  //       {" "}
  //       {selectedCategories &&
  //         sub &&
  //         sub.map((category, index) => {
  //           return (
  //             <div key={category._id} className="col-lg-6 col-md-4 my-2 ">
  //               <input
  //                 key={category._id}
  //                 name={category.categoryName}
  //                 type="checkbox"
  //                 onChange={(e) => handleClick1(e, category)}
  //                 onClick={addDiv}
  //               />
  //               &nbsp;
  //               {category.categoryWithCount}
  //             </div>
  //           );
  //         })}
  //     </div>,
  //   ];
  //   setDivs(newDivs);
  // };

  return (
    <div>
      <div
        style={{ border: "2px solid black", height: "800px", width: "520px" }}
        className="main"
      >
        <h4 className="text-left ml-2">Category</h4>
        <div className="row col-lg-12 col-md-12 col-12">
          {categoryArr &&
            categoryArr.map((category, index) => {
              return (
                <div
                  key={category._id}
                  className="col-lg-6 col-md-4 my-2 text-left"
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
        {catSubSelect ? (
          <>
            {/* <h4 className="text-left ml-2">Rooms</h4> */}
            <div
              className="row col-lg-12 col-md-12 col-12 "
              style={{ border: "1px solid black" }}
            >
              {sub &&
                sub.map((category, index) => {
                  return (
                    <div key={category._id} className="col-lg-6 col-md-4 my-2 ">
                      <input
                        key={category._id}
                        name={category.categoryName}
                        type="checkbox"
                        onChange={(e) => handleClick1(e, category, index)}
                      />
                      &nbsp;
                      {category.categoryWithCount}
                    </div>
                  );
                })}
              {showSubCat ? (
                <>
                  {" "}
                  <div
                    className="row col-lg-12 col-md-12 col-12 ml-1"
                    style={{ border: "1px solid black" }}
                  >
                    {subcategory2 &&
                      subcategory2.map((category, index) => {
                        return (
                          <div key={index} className="col-lg-6 col-md-4 my-2 ">
                            <input
                              key={category._id}
                              name={category.categoryName}
                              type="checkbox"
                              onChange={(e) => handleClick2(e, category)}
                            />
                            &nbsp;
                            {category.categoryWithCount}
                          </div>
                        );
                      })}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}

        <div id="bottom">
          <button className="btnResult">
            Showing &nbsp;{assetArr.length} results
          </button>
        </div>
        {/* <div className="container">
          {divs.map((divElement, index) => (
            <div key={index}>{divElement}</div>
          ))}
        </div> */}
      </div>
      {/* <div className="row col-lg-12 col-md-12 col-12">
        {categoryArr1 &&
          categoryArr1.map((category, index) => {
            return (
              <div
                key={category._id}
                className="col-lg-6 col-md-4 my-2 text-left"
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
      </div> */}
      <Page2 data={assetArr} />
    </div>
  );
}
