import { React, Fragment, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../component/styles/Filter.css";
import FileBase64 from "react-file-base64";
import axios from "axios";

export default function TabExample() {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [files, setFiles] = useState([]);
  const NextBackBtn = (tabIndex) => {
    if (tabIndex === 2) {
      // onDefaultBank()
    }
    setTabIndex(tabIndex);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/files")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleCardClick = (file) => {
    if (selectedCards.includes(file.fileName)) {
      // If the card is already selected, remove it from the selectedCards array
      setSelectedCards(
        selectedCards.filter((fileName) => fileName !== file.fileName)
      );
    } else {
      // If the card is not selected, add it to the selectedCards array
      setSelectedCards([...selectedCards, file.fileName]);
    }
  };
  return (
    // <div>
    //   <Tabs className="Tabs">
    //     <TabList>
    //       <Tab>Tab 1</Tab>
    //       <Tab>Tab 2</Tab>
    //       <Tab>Tab 3</Tab>
    //     </TabList>
    //     <TabPanel>
    //       <p>Tab 1 works!</p>
    //     </TabPanel>
    //     <TabPanel>
    //       <p>Tab 2 works!</p>
    //     </TabPanel>
    //     <TabPanel>
    //       <p>Tab 3 works!</p>
    //     </TabPanel>
    //   </Tabs>
    // </div>

    <div className="mt-4 whitebox col-md-12 col-sm-12">
      <div className="col-lg-12 col-md-11 col-sm-12 col-12 ml-4 pl-4">
        <h3 className="headingDashboard fontFam pl-2"> Add Organization</h3>
      </div>
      <Fragment>
        <Tabs selectedIndex={tabIndex}>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
            {" "}
            <TabList>
              <Tab tabfor="1">Basic Information</Tab>
              <Tab tabfor="2">Templates</Tab>
              {/* <Tab tabfor="3">Booking Details</Tab> */}
            </TabList>
          </div>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12"></div>
          <div className="whiteBoxAll mt-3">
            <>
              <TabPanel tabId="0">
                <form onSubmit={(e) => NextBackBtn(1)}>
                  <div className="col-lg-4  col-md-12 col-sm-12 col-12 h3 mt-3">
                    Basic Details
                  </div>
                  <div className="row col-lg-12 col-md-12 col-sm-9 col-12 mt-4">
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">
                            Organization Name
                          </label>
                          <input
                            type="text"
                            name="orgName"
                            className="form-control shadow-none "
                          />
                        </div>

                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Email</label>
                          <input
                            type="text"
                            name="email"
                            title="Only capital letters containing 5 Alphabets"
                            className="form-control shadow-none "
                          />
                        </div>
                      </div>
                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Phone No</label>
                          <input
                            type="text"
                            name="phoneno"
                            className="form-control shadow-none "
                          />
                        </div>

                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">
                            Additional info
                          </label>
                          <input
                            type="text"
                            name="additionalinfo"
                            className="form-control shadow-none "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                        <label className="label-control  ">Address</label>
                        <textarea
                          style={{ width: "98%" }}
                          rows={2}
                          className="form-control textarea"
                          name="address"
                        ></textarea>
                      </div>
                      <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                        <label className="label-control ">Logo</label>
                        <div className="controls">
                          <FileBase64
                            type="file"
                            multiple={false}
                            // onDone={({ base64 }) =>
                            //   setFormDataORG({
                            //     ...formDataORG,
                            //     logo: base64,
                            //   })
                            // }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row col-lg-12 col-md-12 col-sm-12col-12 ">
                    <div className=" col-md-12 col-lg-12 col-sm-12 col-12 ">
                      <input
                        type="submit"
                        name="submit"
                        value="Next"
                        // style={{ margin: "24px" }}
                        className="btn-css   float-right   mx-3 mt-2 fontFam "
                      />
                    </div>
                  </div>
                </form>
              </TabPanel>

              <TabPanel tabId="1">
                <form
                // onSubmit={(e) => NextBackBtn(2)}
                >
                  <div className="row col-lg-12 col-md-12 col-sm-12">
                    {" "}
                    <div className="col-lg-6 col-md-12 col-sm-12  pl-4 h3">
                      Templates
                    </div>
                    <div className=" col-lg-6 col-md-12 col-sm-12 col-12 text-right">
                      <button
                        className="btn-css  "
                        onClick={() => NextBackBtn(0)}
                      >
                        Back
                      </button>
                      &nbsp;
                      <input
                        type="submit"
                        name="submit"
                        value="Done"
                        className="btn-css"
                      />
                    </div>
                  </div>

                  <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                    <br />
                    {files ? (
                      <>
                        {files.map((file) => (
                          <div
                            key={file._id}
                            className={`ml-${file === 0 ? "0" : "4"}`}
                          >
                            <br />
                            <div
                              // className="card mb-3"
                              className={`card mb-3 ${
                                selectedCards.includes(file.fileName)
                                  ? "selected"
                                  : "unselected"
                              }`}
                              style={{}}
                              onClick={() => handleCardClick(file)}
                            >
                              <img
                                src={file.ImageUrl}
                                width="60px"
                                height="180px"
                                className="card-img-top"
                                alt="Card Image"
                              />
                              <div className="card-body">
                                <h5 className="card-title font-weight-bold">
                                  {file.fileName}
                                </h5>
                                <p className="card-text">{file.Description}</p>
                                {/* <Link
                                  to={`/${file.fileName}`}
                                  style={{
                                    color: "#3D1C0B",
                                    textDecoration: "none",
                                  }}
                                >
                                  <a
                                    href={`/${file.fileName}`}
                                    className="btn-css font-weight-bold "
                                  >
                                    View Template
                                  </a>
                                </Link> */}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
              </TabPanel>
            </>
          </div>
        </Tabs>
      </Fragment>
    </div>
  );
}
