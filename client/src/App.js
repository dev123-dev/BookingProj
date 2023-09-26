import React from "react";
import "./index.css";
import MainPage from "./component/Mainpage";
import NavbarExample from "./component/NavbarExample";
import { Route, Routes } from "react-router-dom";
import FileList from "./FileList";
import Hotel from "../src/Template1/product/Hotel";

import TabExample from "./component/TabExample";
import Hospital from "./Template2/Product/Hospital";
import Customer from "./component/Customer";
import HospitalForm from "./component/HospitalForm";
// import CustomerDashboard from "./component/CustomerDashboard";

function App() {
  return (
    <div className="App">
      <NavbarExample />
      <br />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/file" element={<FileList />} />
        <Route path="/Hotel" element={<Hotel />} />

        <Route path="/tabs" element={<TabExample />} />
        <Route path="/Hospital" element={<Hospital />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/hospital-form" element={<HospitalForm />} />
        {/* <Route path="/customer-dashboard" element={<CustomerDashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;
