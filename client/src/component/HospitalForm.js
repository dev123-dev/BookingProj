import { React, Fragment, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../component/styles/Filter.css";

export default function HospitalForm() {
  const [tabIndex, setTabIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [showCash, setShowCash] = useState(false);

  // Function to toggle the visibility of the div
  const toggleDiv = () => {
    setShowCard(!showCard);
  };
  const toggleCash = () => {
    setShowCash(!showCash);
  };

  const NextBackBtn = (tabIndex) => {
    setTabIndex(tabIndex);
  };
  return (
    <div className="mt-4 whitebox col-md-12 col-sm-12 over ">
      <div className="col-lg-12 col-md-11 col-sm-12 col-12 ml-4 pl-4">
        <h3 className="headingDashboard fontFam pl-2"> Hospital Details</h3>
      </div>
      <Fragment>
        <Tabs selectedIndex={tabIndex}>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
            {" "}
            <TabList>
              <Tab tabfor="1"> Personal Info</Tab>
              <Tab tabfor="2">Appointment Info</Tab>
              <Tab tabfor="3">Payment Info</Tab>
            </TabList>
          </div>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12"></div>
          <div className="whiteBoxAll mt-3">
            <>
              <TabPanel tabId="0">
                <form onSubmit={(e) => NextBackBtn(1)}>
                  <div className="col-lg-4  col-md-12 col-sm-12 col-12 h3 mt-3">
                    Personal Information
                  </div>
                  <div className="row col-lg-12 col-md-12 col-sm-9 col-12 mt-4">
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Patient Name</label>
                          <input
                            type="text"
                            name="Name"
                            className="form-control shadow-none "
                          />
                        </div>

                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control  "> Age</label>
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
                          <label className="label-control ">Mobile No</label>
                          <input
                            type="text"
                            name="phoneno"
                            className="form-control shadow-none "
                          />
                        </div>
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Gender</label>
                          <input
                            type="text"
                            name="gender"
                            className="form-control shadow-none "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                        <label className="label-control ">Address</label>
                        <textarea
                          rows={2}
                          style={{ width: "98%" }}
                          className="form-control textarea shadow-none"
                          name="address"
                        ></textarea>
                      </div>
                      <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                        <label className="label-control  ">Status</label>
                        <input
                          type="text"
                          name="status"
                          className="form-control shadow-none "
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" col-lg-12 col-md-12 col-sm-12 text-right mt-4">
                    {" "}
                    {/* <button
                      className="btn-css  "
                      onClick={() => NextBackBtn(1)}
                    >
                      Back
                    </button> */}
                    &nbsp;
                    <input
                      type="submit"
                      name="submit"
                      value="Next"
                      className="btn-css"
                    />
                  </div>
                </form>
              </TabPanel>
              <TabPanel tabId="1">
                <form onSubmit={(e) => NextBackBtn(2)}>
                  <div className="col-lg-4  col-md-12 col-sm-12 col-12 h3 mt-3">
                    Appointment Information
                  </div>
                  <div className="row col-lg-12 col-md-12 col-sm-9 col-12 mt-4">
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Patient Id</label>
                          <input
                            type="text"
                            name="staypurpose"
                            className="form-control shadow-none "
                          />
                        </div>

                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">
                            Appointment Id
                          </label>
                          <input
                            type="text"
                            name="BookedBy"
                            className="form-control shadow-none "
                          />
                        </div>
                      </div>

                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">
                            Patient Symptom
                          </label>
                          <input
                            type="text"
                            name="Noofpersons"
                            className="form-control shadow-none "
                          />
                        </div>

                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control "> Consult to</label>
                          <input
                            type="text"
                            name="Noofpersons"
                            className="form-control shadow-none "
                          />
                        </div>
                      </div>
                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">
                            Appointment Date
                          </label>
                          <input
                            type="date"
                            name="check-in"
                            className="form-control shadow-none "
                          />
                        </div>

                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">
                            Appointment Time
                          </label>
                          <input
                            type="time"
                            name="check-out"
                            className="form-control shadow-none "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                        <label className="label-control ">Insurance Id</label>
                        <input
                          type="text"
                          name="check-in"
                          className="form-control shadow-none "
                        />
                      </div>

                      <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                        <label className="label-control ">Remarks</label>
                        <textarea
                          row="3"
                          name="Remarks"
                          style={{ width: "98%" }}
                          className="form-control shadow-none  textarea"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className=" col-lg-12 col-md-12 col-sm-12 text-right mt-4">
                    {" "}
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
                      value="Next"
                      className="btn-css"
                    />
                  </div>
                </form>
              </TabPanel>
              <TabPanel tabId="2">
                <form>
                  <div className="col-lg-4  col-md-12 col-sm-12 col-12 h3 mt-3">
                    Payment Information
                  </div>
                  <div className="row col-lg-12 col-md-12 col-sm-9 col-12 mt-4">
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">Discount</label>
                        <input
                          type="text"
                          name="Noofpersons"
                          className="form-control shadow-none "
                        />
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">GST</label>
                        <input
                          type="text"
                          name="Noofpersons"
                          className="form-control shadow-none "
                        />
                      </div>
                    </div>
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">Billed To</label>
                        <input
                          type="text"
                          name="Noofpersons"
                          className="form-control shadow-none "
                        />
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">Booked By</label>
                        <input
                          type="text"
                          name="Noofpersons"
                          className="form-control shadow-none "
                        />
                      </div>
                    </div>
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">Payment Mode</label>
                        <br />
                        <input
                          type="radio"
                          name="Noofpersons"
                          className=" shadow-none form_contctWhite"
                          onClick={toggleCash}
                          checked={showCash}
                        />
                        &nbsp;
                        <label className="label-control ">Cash</label>
                        &nbsp;&nbsp;
                        <input
                          type="radio"
                          name="Noofpersons"
                          className=" shadow-none "
                          onClick={toggleDiv}
                          checked={showCard}
                        />
                        &nbsp;
                        <label className="label-control ">Card</label>
                      </div>

                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">Payment Date</label>
                        <br />

                        <input
                          type="date"
                          name="paymentdate"
                          className=" form-control shadow-none "
                        />
                      </div>
                      <div
                        id="myDiv"
                        className={
                          showCard && !showCash
                            ? "visible col-lg-6"
                            : "hidden col-lg-6"
                        }
                      >
                        <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                          <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                            <label className="label-control ">
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="Noofpersons"
                              className="form-control shadow-none "
                            />
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                            <label className="label-control ">
                              Name on card
                            </label>
                            <input
                              type="text"
                              name="Noofpersons"
                              className="form-control shadow-none "
                            />
                          </div>
                        </div>
                        <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                          <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                            <label className="label-control ">
                              Security Number
                            </label>
                            <input
                              type="text"
                              name="Noofpersons"
                              className="form-control shadow-none "
                            />
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                            <label className="label-control ">
                              Expiry Date
                            </label>
                            <input
                              type="date"
                              name="Noofpersons"
                              className="form-control shadow-none "
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        id="myDiv"
                        className={
                          showCash && !showCard
                            ? "visible col-lg-6"
                            : "hidden col-lg-6"
                        }
                      >
                        <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                          <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                            <label className="label-control ">
                              Total Amount
                            </label>
                            <input
                              type="text"
                              name="Noofpersons"
                              className="form-control shadow-none "
                            />
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                            <label className="label-control ">
                              Grand Total
                            </label>
                            <input
                              type="text"
                              name="Noofpersons"
                              className="form-control shadow-none "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" col-lg-12 col-md-12 col-sm-12 text-right mt-4">
                    {" "}
                    <button
                      className="btn-css  "
                      onClick={() => NextBackBtn(1)}
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
                </form>
              </TabPanel>
            </>
          </div>
        </Tabs>
      </Fragment>
    </div>
  );
}
