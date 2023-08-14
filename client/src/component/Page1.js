import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Checkbox from "./Checkbox";

export default function Page1() {
  const [data, setData] = useState([]);
  const [catdata, setCatData] = useState([]);
  const [catdata2, setCatData2] = useState([]);

  // Make a Post request to the backend API endpoint
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

  // const cat = [];
  // data.map((category) =>
  //   cat.push({
  //     catId: category._id,
  //     label: category.categoryWithCount,
  //     value: category.categoryWithCount,
  //   })
  // );

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const [checkedItems, setCheckedItems] = useState(
    new Array(data.length).fill(false)
  );
  const [checkedItems2, setCheckedItems2] = useState(
    new Array(catdata.length).fill(false)
  );

  const [userinfo, setuserinfo] = useState({ asset: [], removeasset: [] });

  //first level
  const handleCheckboxChange = (index, catid, e) => {
    const { value, checked } = e.target;
    const { asset } = userinfo;

    // Case 1 : The user checks the box
    if (checked) {
      setuserinfo({
        asset: [...asset, value],
        removeasset: [...asset, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setuserinfo({
        asset: asset.filter((e) => e !== value),
        removeasset: asset.filter((e) => e !== value),
      });
    }

    setIsChecked(!isChecked);
    let finalData = {
      label: catid,
      value: catid,
    };

    axios
      .post(`http://localhost:5000/api`, finalData)
      .then((response) => {
        setCatData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  //second level

  const handleCheckboxChange2 = (index, catid) => {
    setIsChecked2(!isChecked2);
    let finalData = {
      label: catid,
      value: catid,
    };
    axios
      .post(`http://localhost:5000/api`, finalData)
      .then((response) => {
        setCatData2(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const newCheckedItems = [...checkedItems2];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems2(newCheckedItems);
  };
  const [isCheck, setIsCheck] = useState([]);
  // const [dataArray, setDataArray] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [catArr, setCatArr] = useState([]);
  const [assetArr, setAssetArr] = useState([]);
  //const [filteredDataArray, setFilteredDataArray] = useState([]);

  //first level
  const handleClick = (e, catId) => {
    const { checked } = e.target;

    setIsCheck([...isCheck, catId]);

    // console.log("Values", e);
    if (checked) {
      axios
        .post(`http://localhost:5000/api`, { belongsToId: catId })
        .then((response) => {
          console.log("Response", response.data);
          setSubCategory(response.data);

          const hasAssetFields = response.data.some((obj) =>
            obj.hasOwnProperty("assetName")
          );

          if (hasAssetFields) {
            setAssetArr((prevAssetArr) => [...prevAssetArr, ...response.data]);
          } else {
            setCatArr((prevCatArr) => [...prevCatArr, ...response.data]);
          }
          // if (!checked) {
          //   setIsCheck(isCheck.filter((item) => item !== catId));
          // }

          // setCatData(response.data);

          // if (checked) {
          //   setDataArray((prevDataArray) => [...prevDataArray, ...response.data]);
          // }

          // if (!checked) {
          //   setIsCheck(isCheck.filter((item) => item !== id));
          // }
          // if (checked && dataArray.assetName !== "") {
          //   setassetArr((prevDataArray) => [...prevDataArray, ...response.data]);
          // } else {
          //   setcatArr((prevDataArray1) => [...prevDataArray1, ...response.data]);
          // }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setAssetArr(assetArr.filter((assetObj) => assetObj._id !== catId));
      setCatArr(catArr.filter((catObj) => catObj.belongsToId !== catId));

      // let cond = true;
      // let iteratedIds,
      //   uncheckedArr = [];
      // uncheckedArr = catArr.filter((obj) => obj.belongsToId == catId);
      // while (cond) {
      //     uncheckedArr.map((obj) => {

      //     })

      // }
    }

    // const newCheckedItems = [...checkedItems];
    // newCheckedItems[index] = !newCheckedItems[index];
    // setCheckedItems(newCheckedItems);
  };
  console.log("assetArr", assetArr);

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
                <div className="col-lg-6 col-md-4 my-2 text-left">
                  {/* <input
                    key={index}
                    type="checkbox"
                    id="topping"
                    name="topping"
                    value={category.catId}
                    checked={checkedItems[index]}
                    onChange={(e) =>
                      handleCheckboxChange(index, category.catId, e)
                    }
          
                  />{" "} */}
                  <Checkbox
                    key={category._id}
                    type="checkbox"
                    name={category.categoryName}
                    id={category._id}
                    handleClick={(e) => handleClick(e, category._id)}
                    //isChecked={isCheck.includes(category._id)}
                  />
                  &nbsp;
                  {category.categoryWithCount}
                </div>
              );
            })}

          {/* {isCheck ? (
            <>
              <div
                className="checkedBox row  col-lg-12 ml-2"
                style={{ border: "1px solid black" }}
              >
                {subcategory.map((item) => (
                  <>
                    {item.categoryName && item.categoryName != "" ? (
                      <div className="col-lg-12 my-2 text-left">
                        {" "}
                        <input
                          key={item._id}
                          type="checkbox"
                          id="topp"
                          name="topp"
                          value="Rooms"
                          checked={checkedItems[item]}
                          onChange={() => handleCheckboxChange2(item, item._id)}
                        
                        />{" "}
                        <Checkbox
                          key={item._id}
                          type="checkbox"
                          name={item.categoryName}
                          id={item._id}
                          handleClick={(e) =>
                            handleCheckboxChange2(e, item._id)
                          }
                
                        />
                        &nbsp;
                        {item.categoryName}
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ))}

                {isChecked2 ? (
                  <>
                    <div
                      className="checkedBox row  col-lg-12 ml-1"
                      style={{ border: "1px solid black" }}
                    >
                      {catdata2 &&
                        catdata2.map((category, index) => {
                          return (
                            <div className="col-lg-12 my-2 text-left">
                              <input
                                key={index}
                                type="checkbox"
                                id="topp"
                                name="topp"
                                value="asset"
                                checked={checkedItems[index]}
                                onChange={() =>
                                  handleCheckboxChange2(index, category._id)
                                }
                              />{" "}
                              &nbsp;
                              {category.categoryWithCount || category.assetName}
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
          )} */}
        </div>
        <div id="bottom">
          <button className="btnResult">
            Show &nbsp;{assetArr.length} result
          </button>
        </div>
      </div>
    </div>
  );
}
