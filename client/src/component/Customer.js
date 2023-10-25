import { React, Fragment, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../component/styles/Filter.css";
import { Navbar, Nav, NavItem, NavLink } from "react-bootstrap";
import "../component/styles/Slider.css";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Customer() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const arrayParam = queryParams.get("array");

  // Parse the JSON string back to an array
  const filteredArray1 = JSON.parse(decodeURIComponent(arrayParam));

  const [tabIndex, setTabIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [showCash, setShowCash] = useState(false);
  const [showAadharId, setShowAadharId] = useState(false);
  const [showportId, setShowportId] = useState(false);
  const [asset, setasset] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  console.log("filteredArray1", filteredArray1);

  // Function to toggle the visibility of the div
  const toggleDiv = () => {
    setShowCard(!showCard);
  };
  const toggleCash = () => {
    setShowCash(!showCash);
  };
  const toggleAadharId = () => {
    setShowAadharId(!showAadharId);
  };
  const toggleportId = () => {
    setShowportId(!showportId);
  };

  const NextBackBtn = (tabIndex) => {
    if (tabIndex === 2) {
      // onDefaultBank()
    }
    setTabIndex(tabIndex);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assets")
      .then((response) => {
        setasset(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCardClick = (file) => {
    if (selectedCards.includes(file)) {
      // If the card is already selected, remove it from the selectedCards array
      setSelectedCards(selectedCards.filter((card) => card !== file));
    } else {
      // If the card is not selected, add it to the selectedCards array
      setSelectedCards([...selectedCards, file]);
    }
  };

  const [formDataORG, setFormDataORG] = useState([]);
  console.log("selectedcards", selectedCards);

  return (
    <div className="mt-4 whitebox col-sm-12 col-md-12">
      {/* <div>
        <Navbar bg="light" variant="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{ color: "white" }}>
              <Nav.Link href="/home" className="hoverbtn">
                Add Room
              </Nav.Link>
              <Nav.Link href="/about" className="hoverbtn">
                Cancel booking
              </Nav.Link>
              <Nav.Link href="/home" className="hoverbtn">
                Reservation
              </Nav.Link>

              <Nav.Link href="/contact" className="hoverbtn">
                Check-in List
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div> */}
      <div className="col-lg-12 col-md-11 col-sm-12 col-12 pl-4">
        <h3 className="headingDashboard fontFam pl-2"> Customer Details</h3>
      </div>
      <Fragment>
        <Tabs selectedIndex={tabIndex}>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
            {" "}
            <TabList>
              <Tab tabfor="1"> Personal Info</Tab>
              <Tab tabfor="2">Reservation Info</Tab>
              <Tab tabfor="3">Room Info</Tab>
              <Tab tabfor="4">Payment Info</Tab>
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
                          <label className="label-control">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control shadow-none "
                          />
                        </div>

                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Email</label>
                          <input
                            type="text"
                            name="email"
                            placeholder="example@gmail.com"
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
                          <label className="label-control ">State</label>
                          <input
                            type="text"
                            name="state"
                            className="form-control shadow-none "
                          />
                        </div>
                      </div>
                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Address</label>
                          <input
                            type="text"
                            name="address"
                            className="form-control shadow-none "
                          />
                        </div>
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Nationality</label>
                          <input
                            type="text"
                            name="nationality"
                            className="form-control shadow-none "
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="col-lg-6  col-md-12 col-sm-12 col-12 ">
                        <label className="label-control ">Address</label>
                        <input
                          type="text"
                          name="phoneno"
                          className="form-control shadow-none "
                        />
                      </div>
                      <div className="col-lg-6  col-md-12 col-sm-12 col-12 ">
                        <label className="label-control  ">Nationality</label>
                        <input
                          type="text"
                          name="nationality"
                          className="form-control shadow-none "
                        />
                      </div>
                    </div> */}
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
                    Reservation Information
                  </div>
                  <div className="row col-lg-12 col-md-12 col-sm-9 col-12 mt-4">
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Booked By</label>
                          <input
                            type="text"
                            name="BookedBy"
                            className="form-control shadow-none "
                          />
                        </div>
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Room Type</label>
                          <input
                            type="text"
                            name="roomtype"
                            className="form-control shadow-none "
                          />
                        </div>
                      </div>
                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">
                            Check-in Date
                          </label>
                          <input
                            type="datetime-local"
                            name="check-in"
                            className="form-control shadow-none"
                          />
                        </div>

                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">
                            Check-out Date
                          </label>
                          <input
                            type="datetime-local"
                            name="check-out"
                            className="form-control shadow-none"
                          />
                        </div>
                      </div>
                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                          <label className="label-control ">
                            No of Persons
                          </label>
                          <input
                            type="text"
                            name="Noofpersons"
                            className="form-control shadow-none"
                          />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                          <label className="label-control ">No of Rooms</label>
                          <input
                            type="text"
                            name="Noofpersons"
                            className="form-control shadow-none"
                          />
                        </div>

                        <div className="col-lg-1  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">No of Adults</label>
                          <input
                            type="number"
                            name="Noofadults"
                            className="form-control shadow-none"
                          />
                        </div>
                        <div className="col-lg-1  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Children</label>
                          <input
                            type="number"
                            name="noofchildren"
                            className="form-control shadow-none"
                          />
                        </div>
                        <div className="col-lg-1  col-md-12 col-sm-12 col-12">
                          <label className="label-control">No of infants</label>
                          <input
                            type="number"
                            name="noofinfants"
                            className="form-control shadow-none"
                          />
                        </div>
                        <div className="col-lg-1  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">Total pax</label>
                          <input
                            type="text"
                            name="totalpax"
                            disabled={true}
                            className="form-control shadow-none"
                          />
                        </div>
                      </div>
                      <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control ">
                            Purpose of Stay
                          </label>
                          <input
                            type="text"
                            name="staypurpose"
                            className="form-control shadow-none"
                          />
                        </div>
                        <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                          <label className="label-control  ">
                            Special request
                          </label>
                          <input
                            type="text"
                            name="splrequest"
                            className="form-control shadow-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                        <div className="col-lg-3  col-md-12 col-sm-12 col-12">
                          {" "}
                          <input
                            type="radio"
                            name="passport Id"
                            className="shadow-none"
                            onClick={toggleportId}
                            checked={showportId}
                          />
                          <label className="label-control ">P.Port Id</label>
                        </div>

                        <div className="col-lg-3  col-md-12 col-sm-12 col-12">
                          {" "}
                          <input
                            type="radio"
                            name="Aadhar Id"
                            className="shadow-none"
                            onClick={toggleAadharId}
                            checked={showAadharId}
                          />
                          <label className="label-control ">Aadhar Id</label>
                        </div>

                        <input
                          type="number"
                          name="Id"
                          className="form-control shadow-none"
                        />
                      </div>
                      <div className="col-lg-6  col-md-12 col-sm-12 col-12">
                        <label className="label-control">Id Proof</label>
                        <br />
                        <FileBase64
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) =>
                            setFormDataORG({
                              ...formDataORG,
                              logo: base64,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" col-lg-12 col-md-12 col-sm-12 text-right">
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
                <form onSubmit={(e) => NextBackBtn(3)}>
                  <div className="col-lg-4  col-md-12 col-sm-12 col-12 h3 mt-3">
                    Room Information
                  </div>
                  <div className="row col-lg-12 col-md-12 col-sm-9 col-12 mt-4">
                    <div className="container">
                      <div className="row">
                        {filteredArray1 &&
                          filteredArray1.map((file) => (
                            <div
                              key={file}
                              className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                            >
                              <div
                                className={`card ${
                                  selectedCards.includes(file)
                                    ? "selectedasset"
                                    : "unselectedasset"
                                }`}
                                onClick={() => handleCardClick(file)}
                              >
                                <div className="card-body">
                                  <h5 className="card-title">{file}</h5>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className=" col-lg-12 col-md-12 col-sm-12 text-right">
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
                      value="Next"
                      className="btn-css"
                    />
                  </div>
                </form>
              </TabPanel>
              <TabPanel tabId="3">
                <form
                // onSubmit={(e) => NextBackBtn(3)}
                >
                  <div className="col-lg-4  col-md-12 col-sm-12 col-12 h3 mt-3">
                    Payment Information
                  </div>
                  <div className="row col-lg-12 col-md-12 col-sm-9 col-12 mt-4">
                    <div className="col-lg-12 col-md-12 col-sm-9 col-12 label-control">
                      Selected Rooms:
                      <div
                        className="row col-lg-12 col-md-12 col-sm-9 col-12 mt-4"
                        style={{ color: "#912323" }}
                      >
                        {selectedCards.map((card, index) => (
                          <div
                            key={index}
                            className=" mb-2 ml-2" // Adjust the column classes as needed
                          >
                            <div className="selected-card">
                              {/* Render the content of each selected card */}
                              {card + ","}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">Discount</label>
                        <input
                          type="text"
                          name="discount"
                          className="form-control shadow-none "
                        />
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">GST</label>
                        <input
                          type="text"
                          name="gst"
                          className="form-control shadow-none "
                        />
                      </div>
                    </div>
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">Billed To</label>
                        <input
                          type="text"
                          name="billedto"
                          className="form-control shadow-none "
                        />
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">Booked By</label>
                        <input
                          type="text"
                          name="bookedby"
                          className="form-control shadow-none "
                        />
                      </div>
                    </div>
                    <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                      <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                        <label className="label-control ">Payment Method</label>
                        <br />
                        <input
                          type="radio"
                          name="cash"
                          className=" shadow-none "
                          onClick={toggleCash}
                          checked={showCash}
                        />
                        &nbsp;
                        <label className="label-control ">Cash</label>
                        &nbsp;&nbsp;
                        <input
                          type="radio"
                          name="card"
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
                              name="cardnumber"
                              className="form-control shadow-none "
                            />
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                            <label className="label-control ">
                              Name on card
                            </label>
                            <input
                              type="text"
                              name="nameoncard"
                              className="form-control shadow-none "
                            />
                          </div>
                        </div>
                        <div className="row col-lg-12 col-md-12 col-sm-9 col-12">
                          {/* <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                            <label className="label-control ">
                              Security Number
                            </label>
                            <input
                              type="text"
                              name="Noofpersons"
                              className="form-control shadow-none "
                            />
                          </div> */}
                          <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                            <label className="label-control ">
                              Expiry Date
                            </label>
                            <input
                              type="date"
                              name="expirydate"
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
                              name="totalamt"
                              className="form-control shadow-none "
                            />
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-9 col-12">
                            <label className="label-control ">
                              Grand Total
                            </label>
                            <input
                              type="text"
                              name="grandtotal"
                              className="form-control shadow-none "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" col-lg-12 col-md-12 col-sm-12 text-right mt-4">
                      {" "}
                      <button
                        className="btn-css  "
                        onClick={() => NextBackBtn(2)}
                      >
                        Back
                      </button>
                      &nbsp;
                      <input
                        type="submit"
                        name="submit"
                        value="Submit"
                        className="btn-css"
                      />
                    </div>
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
