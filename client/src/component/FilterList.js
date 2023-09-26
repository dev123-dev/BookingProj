import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../component/styles/Filter.css";
import "../component/styles/Slider.css";
import FilterLevels from "./FilterLevels";
import cancel from "../asset/cancel1.png";

export default function FilterList() {
  const [catArr, setCatArr] = useState([]);
  const [assetArr, setAssetArr] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

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

  //assetorcategory : Category or Asset Array Received, checked : Checkbox Check and Uncheck, blnAssetOrCategory: Whether it is an Asset Or Category, category: Selected Category
  const handleAssetOnCategoryCheckUncheckFilters = (
    assetorcategory,
    checked,
    blnAssetOrCategory,
    category
  ) => {
    let filteredCategories;
    if (checked) {
      if (blnAssetOrCategory) {
        setAssetArr((prevAssetArr) => [...prevAssetArr, ...assetorcategory]);
        setSelectedCategories([...selectedCategories, category]);
      } else setSelectedCategories([...selectedCategories, assetorcategory]);
    } else {
      filteredCategories = handleFilteredCatHierarchyRecursive(
        assetorcategory,
        0
      );

      setAssetArr(
        assetArr.filter(
          (assetObj) =>
            !assetObj.category?.some((cat) => cat._id === assetorcategory._id)
        )
      );

      setSelectedCategories(
        selectedCategories.filter(
          (cat) => !filteredCategories.includes(cat._id)
        )
      ); //All those categories and their respective subcategories need to be removed from the selectedCategories
    }
  };

  //Special Recursive Function
  const handleFilteredCatHierarchyRecursive = (category, index) => {
    let filteredCategories = [];

    if (index === 0) {
      filteredCategories = [category._id];
    } else {
      filteredCategories.push(category._id);
    }

    const childCategories = selectedCategories.filter(
      (cat) => cat.belongsToId === category._id
    );
    for (const childCategory of childCategories) {
      filteredCategories.push(
        ...handleFilteredCatHierarchyRecursive(childCategory, index + 1)
      );
    }

    return filteredCategories;
  };

  const handleFirstLevelCategoryClick = async (e, category) => {
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
          } else if (response.data) {
            setCatArr((prevCatArr) =>
              prevCatArr.map((cat) =>
                cat._id === category._id
                  ? { ...category, levelData: response.data }
                  : cat
              )
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setSelectedCategories([...selectedCategories, category]);
    } else {
      filteredCategories = handleFilteredCatHierarchyRecursive(category, 0);

      setCatArr((prevCatArr) =>
        prevCatArr.map((cat) =>
          cat._id === category._id ? { ...cat, levelData: null } : cat
        )
      );
      setAssetArr(
        assetArr.filter(
          (assetObj) =>
            !assetObj.category?.some((cat) => cat._id === category._id)
        )
      );

      setSelectedCategories(
        selectedCategories.filter(
          (cat) => !filteredCategories.includes(cat._id)
        )
      ); //All those categories and their respective subcategories need to be removed from the selectedCategories
    }
  };

  //To deselect the categories
  const handleDeselect = (category) => {
    const updatedSelectedCheckboxes = selectedCategories.filter(
      (item) => item._id !== category._id
    );
    setSelectedCategories(updatedSelectedCheckboxes);
    const checkbox = document.getElementsByName(category.categoryName)[0];
    if (checkbox) {
      checkbox.checked = false;
      handleFirstLevelCategoryClick({ target: checkbox }, category);
    }
  };
  const [formDataORG, setFormDataORG] = useState({
    startDate: "",
    endDate: "",
  });

  const { startDate, endDate } = formDataORG;
  const onDateChange = (e) => {
    setFormDataORG({
      ...formDataORG,
      [e.target.name]: e.target.value,
    });
  };

  const agesArray = assetArr.map((obj) => obj.assetName);

  const bookingfor13to15 = [
    "St. Mary's hall",
    "St.Joseph's Block GF hall",
    "100",
    "620",
  ];

  const filteredArray1 = agesArray.filter(
    (item) => !bookingfor13to15.includes(item)
  );

  const arrayParam = encodeURIComponent(JSON.stringify(filteredArray1));

  const records = [
    { name: "St. Mary's hall", timing: "13:00" },
    { name: "St.Joseph's Block GF hall", timing: "14:30" },
    { name: "St. Joseph's Block 1st floor hall", timing: "15:30" },
  ];
  const bookingfor13to15time = ["13:00", "14:00", "15:00"];
  const filteredRecords = records.filter(
    (record) => !bookingfor13to15time.includes(record.timing)
  );

  return (
    <>
      <div className="selected-items">
        {selectedCategories.map((selectedCategory, index) => (
          <div
            key={index}
            className={`selected-item ${
              showAll || index < 5 ? "show" : "hide"
            }`}
          >
            {selectedCategory.categoryName}
            <img
              src={cancel}
              alt="cancel"
              className="cancel-icon"
              onClick={() => handleDeselect(selectedCategory)}
              width="15px"
              height="15px"
            />
          </div>
        ))}

        {selectedCategories.length > 4 && (
          <div className="mt-2">
            {showAll ? (
              <a
                className="showbutton"
                onClick={() => setShowAll(false)}
                style={{
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "#20262e",
                  fontSize: "16px",
                  textDecoration: "underline",
                }}
              >
                Show Less
              </a>
            ) : (
              <a
                className="showbutton"
                onClick={() => setShowAll(true)}
                style={{
                  fontWeight: 500,
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#20262e",
                  fontSize: "16px",
                }}
              >
                Show More
              </a>
            )}
          </div>
        )}
      </div>
      <hr />

      <div className=" filter-container ">
        <div>
          <div className="Sub-Heading ">Date Range</div>
          <div className="row mt-2">
            <div className="col-lg-4 col-md-6 col-sm-4 col-12">
              <input
                type="date"
                name="startDate"
                className="datefield"
                onChange={(e) => onDateChange(e)}
              />
            </div>
            <div className="col-lg-1 col-md-12 col-sm-12 ">-</div>
            <div className="col-lg-4 col-md-6 col-sm-4 col-12">
              <input
                type="date"
                name="endDate"
                className="datefield"
                onChange={(e) => onDateChange(e)}
              />
            </div>
          </div>
        </div>
        {catArr?.length > 0 && (
          <div className="mt-2">
            <div className="Sub-Heading mt-4">Category</div>
            <div className="row col-lg-12 col-md-12 col-12 mt-2 common-text-size alignItem">
              {catArr.map((category, index) => {
                return (
                  <div
                    key={category._id}
                    className="col-lg-6 col-md-6 col-sm-12 custom-checkbox"
                    style={{ marginBottom: "5px" }}
                  >
                    <label htmlFor={category._id} style={{ cursor: "pointer" }}>
                      <input
                        id={category._id}
                        name={category.categoryName}
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        checked={category.checked} // Add 'checked' property
                        onChange={(e) =>
                          handleFirstLevelCategoryClick(e, category)
                        }
                      />
                      &nbsp;
                      {category.categoryWithCount}
                    </label>
                  </div>
                );
              })}
            </div>

            <div>
              {catArr.map(
                (category, index) =>
                  category.levelData && (
                    <FilterLevels
                      key={category._id}
                      catData={category.levelData}
                      parent={category.categoryName}
                      handleAssetOnCategoryCheckUncheckFilters={
                        handleAssetOnCategoryCheckUncheckFilters
                      }
                    />
                  )
              )}
            </div>
          </div>
        )}

        <div className="fixed-bottom text-left ml-2">
          <Link to={`/customer?array=${arrayParam}`}>
            <button className="btnshow-css" style={{ marginLeft: "25%" }}>
              Showing &nbsp;{filteredArray1 ? filteredArray1.length : 0} results
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
