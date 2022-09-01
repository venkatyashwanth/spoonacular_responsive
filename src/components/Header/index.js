import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { isLoggedIn, doLogout } from "../service.js/Auth";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();

  const checkStatus = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("success");
        doLogout();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const [username, setUserName] = useState("user");

  useEffect(() => {
    if (isLoggedIn()) {
      const data = JSON.parse(localStorage.getItem("_token"));
      const getname =
        data.username.charAt(0).toUpperCase() + data.username.slice(1);
      setUserName(getname);
    }
  }, [username]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          Spoonacular
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {!isLoggedIn() && (
              <Nav.Link onClick={() => navigate("/signUp")}>Sign Up</Nav.Link>
            )}
            {!isLoggedIn() && (
              <Nav.Link onClick={() => navigate("/signIn")}>Sign In</Nav.Link>
            )}

            {isLoggedIn() && (
              <Nav.Link className="d-none d-lg-flex">
                Hello, {username}
              </Nav.Link>
            )}

            {isLoggedIn() && (
              <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
            )}
            {isLoggedIn() && (
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/GetRecipes")}>
                  Recipes
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/mealPlanPage")}>
                  Meal Plan
                </NavDropdown.Item>
                <NavDropdown.Divider />
                
                <NavDropdown.Item onClick={() => navigate("/GetTestPage")}>
                  Test Page
                </NavDropdown.Item>

                <NavDropdown.Item onClick={checkStatus}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
