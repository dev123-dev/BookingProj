import { useEffect, useState } from "react";
import axios from "axios";
import CheckBox from "./CheckBox";

export default function FilterLevels({ catData, parent, removeLevel, handleAssetOnCategoryCheckUncheckFilters }) {
    const [levels, setLevels] = useState([]);
    const [remove, setRemove] = useState([]);

    useEffect(() => {
        if (catData) setLevels(catData);
    }, [catData]);

    useEffect(() => {
        if (removeLevel?.length > 0) {
            setLevels((prevState) =>
                prevState.map((category) =>
                    removeLevel.includes(category?.categoryName)
                        ? { ...category, levelData: null }
                        : category
                )
            );
        }
    }, [removeLevel]);

    const addLevels = async (category) => {
        // Add levels on when checkbox is clicked
        await axios
            .post(`http://localhost:5000/api`, { belongsToId: category._id })
            .then((response) => {
                const hasAssetFields = response.data.some((obj) =>
                    obj.hasOwnProperty("assetName")
                );

                if (hasAssetFields) {
                    handleAssetOnCategoryCheckUncheckFilters(response.data, true, true, category);
                } else if (response.data) {
                    setLevels((prevState) =>
                        prevState.map((cat) =>
                            cat._id === category._id ? { ...category, levelData: response.data } : cat
                        )
                    );
                    handleAssetOnCategoryCheckUncheckFilters(category, true, false);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const removeLevels = (category) => {
        // Remove levels when checkbox is unclicked
        setRemove([]);
        setLevels((prevState) =>
            prevState.map((cat) => {
                if (cat?.categoryName === category.categoryName) {
                    cat?.levelData?.forEach((valCat) =>
                        setRemove((ps) => [...ps, valCat.categoryName])
                    );
                }
                return cat?.categoryName === category.categoryName
                    ? { ...cat, levelData: null }
                    : cat;
            })
        );
        handleAssetOnCategoryCheckUncheckFilters(category, false, false);
    };

    return (
        catData?.length > 0 && (
            <div className="level-container">
                <h2>{parent}</h2>
                <div>
                    {/* Checkbox details each level */}
                    {catData.map((category) => (
                        <CheckBox
                            key={category._id}
                            category={category}
                            addLevels={addLevels}
                            removeLevels={removeLevels}
                        />
                    ))}
                </div>

                {/* Levels inside each level */}
                <div>
                    {levels.length > 0 &&
                        levels.map((cat, index) => (
                            <FilterLevels
                                key={cat._id}
                                catData={cat.levelData}
                                parent={cat.categoryName}
                                removeLevel={remove}
                                handleAssetOnCategoryCheckUncheckFilters={handleAssetOnCategoryCheckUncheckFilters}
                            />
                        ))}
                </div>
            </div>
        )
    );
}
