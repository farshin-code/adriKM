import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LoginModal from "./LoginModal";
import useNavBar from "../hooks/navBar";
import LoginButton from "./LoginButton";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
function NavBar() {
  const { show, setShow, clickHandler } = useNavBar();
  const { currentUser } = useAuthContext();
  // in case this is verified/reset Password page , we dont want to show buttons and links
  const location = useLocation().search;
  const [showButtonsAndLinks, setShowButtonsAndLinks] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(location);
    const oobCode = params.get("oobCode");
    if (oobCode === null) {
      setShowButtonsAndLinks(true);
    }
  }, [location]);

  return (
    <>
      <LoginModal show={show} hide={() => setShow(false)} />
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand className="fw-bold text-secondary" href="#home">
            <img
              src="./adri-km.png"
              alt="logo"
              width={"auto"}
              height={"50px"}
            />
            {/* <span className="fw-bold text-primary">ADRI</span> Meet! */}
          </Navbar.Brand>
          {showButtonsAndLinks && (
            <>
              <div className="d-flex ml-auto gap-2">
                <LoginButton buttonType={1} clickHandler={clickHandler} />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
              </div>
              <Navbar.Collapse className="justify-content-end pe-1">
                <Nav className="ml-auto">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/elastic-search" className="nav-link">
                    Elastic Search
                  </Link>
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                  <Link to="/contact-us" className="nav-link">
                    Contact
                  </Link>
                  {currentUser && (
                    <Link to="/profile" className="nav-link">
                      <Image
                        src={currentUser.photoURL}
                        fluid
                        roundedCircle
                        alt="profile"
                        width={"30px"}
                        height={"30px"}
                      />
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>

              <LoginButton buttonType={2} clickHandler={clickHandler} />
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
