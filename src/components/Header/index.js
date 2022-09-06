import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { isLoggedIn, doLogout } from "../service.js/Auth";
import { getAuth, signOut } from "firebase/auth";
import { GiSpoon } from "react-icons/gi";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("");

  const functionSignIn = () => {
    setActiveTab("link1");
    navigate("/signIn");
  };

  const functionSignOut = () => {
    setActiveTab("link2");
    navigate("/signUp");
  };

  const HomePath = () => {
    setActiveTab("link3");
    navigate("/home");
  };

  const RecipesPath = () => {
    setActiveTab("link4");
    navigate("/GetRecipes");
  };

  const CalorieCalc = () => {
    setActiveTab("link6");
    navigate("/calorieFinding");
  };

  const MealPlanPath = () => {
    setActiveTab("link5");
    navigate("/mealPlanPage");
  };

  const removeActiveLink = () => {
    setActiveTab("")
  }

  const activeClassLink1 = activeTab === "link1" ? "active" : "";
  const activeClassLink2 = activeTab === "link2" ? "active" : "";
  const activeClassLink3 = activeTab === "link3" ? "active" : "";
  const activeClassLink4 = activeTab === "link4" ? "active" : "";
  const activeClassLink5 = activeTab === "link5" ? "active" : "";
  const activeClassLink6 = activeTab === "link6" ? "active" : "";
  

  const checkStatus = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
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
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center text-light">
            Spoonacular
            <GiSpoon size={32} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav nav nav-pills">
           
              {!isLoggedIn() && (
                <li className="nav-item" onClick={() => navigate("/signIn")}>
                  <a className="nav-link active" aria-current="page">
                    SignIn
                  </a>
                </li>
              )}
              {!isLoggedIn() && (
                <li className="nav-item" onClick={() => navigate("/signUp")}>
                <a className="nav-link">
                  SignUp
                </a>
              </li>
              )}

            </ul>
          </div>
        </div>
      </nav> */}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
            Spoonacular
            <GiSpoon size={32} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {!isLoggedIn() && (
                <Nav.Link
                  onClick={functionSignIn}
                  className={`nav-link`}
                >
                  
                  <span
                    className={`d-inline-block  ${activeClassLink1} navigationLink`}
                  >
                    Sign In
                  </span>
                </Nav.Link>
              )}
              {!isLoggedIn() && (
                <Nav.Link
                  className={`nav-link`}
                  onClick={functionSignOut}
                >
                  <span
                    className={`d-inline-block  ${activeClassLink2} navigationLink`}
                  >
                    Sign Up
                  </span>
                  
                </Nav.Link>
              )}

              {isLoggedIn() && (
                <Nav.Link className={`nav-link d-none d-lg-flex`}>
                  Hello, {username}
                </Nav.Link>
              )}
              {/* () =>  */}

              {isLoggedIn() && (
                <Nav.Link className={`nav-link`} onClick={HomePath}>
                  <span
                    className={`d-inline-block ${activeClassLink3} navigationLink`}
                  >
                    Home
                  </span>
                </Nav.Link>
              )}

              {isLoggedIn() && (
                // <Nav.Link className={`nav-link navigationLink ${activeClassLink3}`} onClick={HomePath}>Home</Nav.Link>
                <Nav.Link className={`nav-link `} onClick={RecipesPath}>
                  <span
                    className={`d-inline-block ${activeClassLink4} navigationLink`}
                  >
                    Ingredients
                  </span>
                </Nav.Link>
              )}

              {isLoggedIn() && (
                <Nav.Link className={`nav-link `} onClick={CalorieCalc}>
                  <span
                    className={`d-inline-block ${activeClassLink6} navigationLink`}
                  >
                    Calories
                  </span>
                </Nav.Link>
              )}

              {isLoggedIn() && (
                // <Nav.Link className={`nav-link navigationLink ${activeClassLink3}`} onClick={HomePath}>Home</Nav.Link>
                <Nav.Link className={`nav-link `} onClick={MealPlanPath}>
                  <span
                    className={`d-inline-block ${activeClassLink5} navigationLink`}
                  >
                    Meal Planner
                  </span>
                </Nav.Link>
              )}

              {isLoggedIn() && (
                <NavDropdown title="More" id="basic-nav-dropdown" onClick={removeActiveLink}>
                  <NavDropdown.Item onClick={() => navigate("/GetTestPage")}>
                    Wine Recommendations
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={checkStatus}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
