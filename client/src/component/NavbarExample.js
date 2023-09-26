import { React } from "react";
import { Navbar, Nav, NavItem, NavLink } from "react-bootstrap";
import "../component/styles/Slider.css";

export default function NavbarExample() {
  return (
    // <div>
    //   <Navbar bg="dark" variant="dark" expand="lg">
    //     <Navbar.Brand href="/">My App</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="mr-auto" style={{ color: "white" }}>
    //         <Nav.Link
    //           href="/home"
    //           className="hoverbtn"
    //           style={{ width: "80px" }}
    //         >
    //           Home
    //         </Nav.Link>
    //         <Nav.Link
    //           href="/about"
    //           className="hoverbtn"
    //           style={{ width: "80px" }}
    //         >
    //           About
    //         </Nav.Link>
    //         <Nav.Link
    //           href="/home"
    //           className="hoverbtn"
    //           style={{ width: "80px" }}
    //         >
    //           Services
    //         </Nav.Link>

    //         <Nav.Link
    //           href="/contact"
    //           className="hoverbtn"
    //           style={{ width: "80px" }}
    //         >
    //           Contact
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    // </div>
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand
          href="/"
          className="bg-dark font-weight-bold"
          style={{ color: "#B0DFDD", fontSize: "22px" }}
        >
          Booking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" bg="dark" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ml-5">
            <NavItem>
              <NavLink
                href="/"
                className="hoverbtn "
                style={{ color: "white" }}
              >
                {" "}
                Main
              </NavLink>
            </NavItem>
            &nbsp;&nbsp;
            <NavItem>
              <NavLink
                href="/file"
                className="hoverbtn "
                style={{ color: "white" }}
              >
                File
              </NavLink>
            </NavItem>
            &nbsp;&nbsp;
            <NavItem>
              <NavLink
                href="/tabs"
                className="hoverbtn "
                style={{ color: "white" }}
              >
                Org
              </NavLink>
            </NavItem>
            &nbsp;&nbsp;
            <NavItem>
              <NavLink
                href="/customer"
                className="hoverbtn "
                style={{ color: "white" }}
              >
                Customer
              </NavLink>
            </NavItem>
            &nbsp;&nbsp;
            <NavItem>
              <NavLink
                href="/hospital-form"
                className="hoverbtn "
                style={{ color: "white" }}
              >
                Hospital
              </NavLink>
            </NavItem>
            &nbsp;&nbsp;
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <Navbar className="navbar_height top_menu" expand="lg" fixed="top">
        <Navbar.Brand></Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto navbar_Collapse_content">
            <NavItem>
              <NavLink
                to="/superdashboard"
                className="navlink "
                style={{ fontSize: "19px" }}
                activeStyle={{
                  color: "#000",
                  fontSize: "19px",
                  textDecoration: "none",
                  background: "#fbb832",
                }}
              >
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/organization"
                className="navlink "
                style={{ fontSize: "19px" }}
                activeStyle={{
                  color: "#000",
                  fontSize: "19px",
                  background: "#fbb832",
                  textDecoration: "none",
                }}
              >
                Organization
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                to="/users"
                className="navlink"
                style={{ fontSize: "19px" }}
                activeStyle={{
                  color: "#000",
                  fontSize: "19px",
                  textDecoration: "none",
                  background: "#fbb832",
                }}
              >
                Users
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                to="/admindashboard"
                className="navlink"
                style={{ fontSize: "19px" }}
                activeStyle={{
                  color: "#000",
                  fontSize: "19px",
                  textDecoration: "none",
                  background: "#fbb832",
                }}
              >
                Dashboard
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                to="/category"
                className="navlink"
                style={{ fontSize: "19px" }}
                activeStyle={{
                  color: "#000",
                  fontSize: "19px",
                  textDecoration: "none",
                  background: "#fbb832",
                }}
              >
                Category
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
    </div>
  );
}
