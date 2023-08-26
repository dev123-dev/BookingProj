import { useEffect, useState } from "react";
import axios from 'axios';
import "../component/Filter.css";
import FilterLevels from "./FilterLevels";


export default function FilterList() {
    const [catArr, setCatArr] = useState([]);
    const [assetArr, setAssetArr] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

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
    const handleAssetOnCategoryCheckUncheckFilters = (assetorcategory, checked, blnAssetOrCategory, category) => {
        let filteredCategories;
        if (checked) {
            if (blnAssetOrCategory) {
                setAssetArr(prevAssetArr => [...prevAssetArr, ...assetorcategory]);
                setSelectedCategories([...selectedCategories, category]);
            }
            else
                setSelectedCategories([...selectedCategories, assetorcategory]);
        } else {
            filteredCategories = handleFilteredCatHierarchyRecursive(assetorcategory, 0);

            setAssetArr(assetArr.filter(assetObj => !assetObj.category?.some(cat => cat._id === assetorcategory._id)));

            setSelectedCategories(selectedCategories.filter(
                (cat) => !filteredCategories.includes(cat._id)
            )); //All those categories and their respective subcategories need to be removed from the selectedCategories
        }
    }

    //Special Recursive Function
    const handleFilteredCatHierarchyRecursive = (category, index) => {
        let filteredCategories = [];

        if (index === 0) {
            filteredCategories = [category._id];
        } else {
            filteredCategories.push(category._id);
        }

        const childCategories = selectedCategories.filter(cat => cat.belongsToId === category._id);
        for (const childCategory of childCategories) {
            filteredCategories.push(...handleFilteredCatHierarchyRecursive(childCategory, index + 1));
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
                            prevCatArr.map(cat =>
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
                prevCatArr.map(cat =>
                    cat._id === category._id ? { ...cat, levelData: null } : cat
                )
            );
            setAssetArr(assetArr.filter(assetObj => !assetObj.category?.some(cat => cat._id === category._id)));

            setSelectedCategories(selectedCategories.filter(
                (cat) => !filteredCategories.includes(cat._id)
            )); //All those categories and their respective subcategories need to be removed from the selectedCategories
        }
    }

    return (
        <div
            style={{ border: "2px solid black" }}
            className="main"
        >
            {catArr?.length > 0 && (
                <div>
                    <h4 className="text-left ml-2">Category</h4>
                    <div className="row col-lg-12 col-md-12 col-12">
                        {catArr.map((category, index) => {
                            return (
                                <div
                                    key={category._id}
                                    className="col-lg-6 col-md-4 my-2 text-left"
                                >
                                    <input
                                        key={category._id}
                                        name={category.categoryName}
                                        type="checkbox"
                                        onChange={(e) => handleFirstLevelCategoryClick(e, category)}
                                    />
                                    &nbsp;
                                    <label htmlFor={category._id}>{category.categoryWithCount}</label>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        {catArr.map((category, index) =>
                            category.levelData && (
                                <FilterLevels
                                    key={category._id}
                                    catData={category.levelData}
                                    parent={category.categoryName}
                                    handleAssetOnCategoryCheckUncheckFilters={handleAssetOnCategoryCheckUncheckFilters}
                                />
                            )
                        )}
                    </div>
                </div>)}
            <div id="bottom">
                <button className="btnResult">
                    Showing &nbsp;{assetArr.length} results
                </button>
            </div>
        </div>
    )

}