import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import CurrentSelection from "./CurrentSelection";

interface NavbarProps {
  selectedSource: string; // Receive selectedSource as a prop
}

const NavbarTransparent: React.FC<NavbarProps> = ({ selectedSource }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyle: React.CSSProperties = {
    backgroundColor: scrolled ? "rgba(0, 0, 0, 0.3)" : "black",
    backdropFilter: scrolled ? "blur(2px)" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: "background-color 0.3s ease-in-out",
    display: "flex",
    alignItems: "center", // Center vertically
  };

  const brandStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: 700,
    color: scrolled ? "black" : "white",
  };

  const navLinkStyle: React.CSSProperties = {
    color: scrolled ? "black" : "white",
    fontSize: "1rem",
  };

  const navLinkHoverStyle: React.CSSProperties = {
    color: "#fff",
  };

  const offcanvasStyle: React.CSSProperties = {
    fontSize: "1rem", // Increase font size
    fontWeight: "500",
    transform: "translateY(-80%)", // Adjust the vertical position
  };

  return (
    <>
      <style>
        {`
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            transition: background-color 0.3s ease-in-out;
          }

          .navbar.scrolled {
            background-color: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(50px);
          }

          .navbar-brand {
            font-size: 1.5rem;
            font-weight: 700;
            color: scrolled ? "black" : "white";
          }

          .nav-link {
            color: scrolled ? "black" : "white";
            font-size: 1rem;
          }

          .nav-link:hover {
            color: ${navLinkHoverStyle.color}; // Apply hover color
          }

          .navbar-collapse {
            justify-content: flex-end;
          }

          .about-button {
            margin-left: auto;
          }
        `}
      </style>
      <Navbar
        expand="lg"
        className={`navbar navbar-expand-lg navbar-dark ${
          scrolled ? "scrolled" : ""
        }`}
        style={navbarStyle}
      >
        <Container>
          <Navbar.Brand href="/" style={brandStyle}>
            Tenable Dashboard
          </Navbar.Brand>
          {scrolled && (
            <Navbar.Offcanvas className="navbar-text" style={offcanvasStyle}>
              <CurrentSelection source={selectedSource} />
            </Navbar.Offcanvas>
          )}
          <Navbar.Toggle aria-controls="navbar-collapse" />
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="ml-auto">
              <Nav.Link href="/" style={navLinkStyle}>
                Recargar
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarTransparent;
