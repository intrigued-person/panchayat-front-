import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from './logo.png'; // Import your logo image here

const Topnav = () => {
  return (
    <Navbar expand="lg" style={{ height: "70px", backgroundColor: "#0f2353", borderBottom: "1px solid #ccc" }}>
      <Container>
        <Navbar.Brand href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://www.logolynx.com/images/logolynx/b9/b94e73cdeec8d1be64386815ab2e22ca.jpeg" alt="University Logo" style={{ height: "50px", marginRight: "10px" }} />
          <b>
            <span style={{ color: "white" }} role="univlabel">E-PANCHAYAT </span>
            <span style={{ color: "white", fontWeight: "bold" }} role="clglabel">OFFICE</span>
          </b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{ color: "#FFD700", fontWeight: "lighter" }}
              className="nav-link"
              role="homelabel"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#FFD700'}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              style={{ color: "#FFD700", fontWeight: "lighter" }}
              className="nav-link"
              role="aboutlabel"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#FFD700'}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/search"
              role="courselabel"
              style={{ color: "#FFD700", fontWeight: "lighter" }}
              className="nav-link"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#FFD700'}
            >
              Search
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/adminLog"
              style={{ color: "#FFD700", fontWeight: "lighter" }}
              className="nav-link"
              role="stafflabel"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#FFD700'}
            >
              Employee Login
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/userLog"
              style={{ color: "#FFD700", fontWeight: "lighter" }}
              className="nav-link"
              role="studlabel"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#FFD700'}
            >
              User Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topnav;
