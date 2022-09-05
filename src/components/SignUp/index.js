import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Firebase
import { app } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //   const [error,setError] = useState("")

  const handleInput = (event) => {
    let { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const sendData = (event) => {
    event.preventDefault();
    console.log(data);
    if (data.password === data.confirmPassword) {
      console.log("passwords matched");
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((response) => {
          updateProfile(auth.currentUser, {
            displayName: data.username,
          })
            .then(() => {
              console.log(auth.currentUser);
              console.log(response.user);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => alert(err.message));
    } else {
      alert("passwords not matched");
      return;
    }
    setData({ email: "", password: "", confirmPassword: "", username: "" });
    navigate("/signIn");
  };

  return (
    <Container className="mt-3">
      <Row className="my-5">
        <Col className="col-0 col-lg-3"></Col>
        <Col className="col-12 col-lg-6 shadow shadow-inset p-3 bg-white rounded">
          <Form onSubmit={sendData}>
            <h3 style={{fontFamily: "Roboto"}}>SignUp</h3>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInputUsername"
                placeholder="Enter Name"
                name="username"
                value={data.username}
                onChange={(event) => handleInput(event)}
                required
              />
              <label htmlFor="floatingInputUsername">User Name</label>
            </div>
            {/* <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="username"
                value={data.username}
                onChange={(event) => handleInput(event)}
              />
            </Form.Group> */}

            <div className="form-floating mb-3">
              <input
                type="email"
                placeholder="Enter email"
                className="form-control"
                id="floatingInputEmailAddress"
                name="email"
                value={data.email}
                onChange={(event) => handleInput(event)}
                required
              />
              <label htmlFor="floatingInputEmailAddress">Email address</label>
            </div>

            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={(event) => handleInput(event)}
              />
            </Form.Group> */}

            <div className="form-floating mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                id="floatingInputEmailPassword"
                name="password"
                value={data.password}
                onChange={(event) => handleInput(event)}
                required
              />
              <label htmlFor="floatingInputEmailPassword">Password</label>
            </div>

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={(event) => handleInput(event)}
              />
            </Form.Group> */}

            <div className="form-floating mb-3">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                id="floatingInputEmailCPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={(event) => handleInput(event)}
                required
              />
              <label htmlFor="floatingInputEmailCPassword">Confirm Password</label>
            </div>

            {/* <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={(event) => handleInput(event)}
              />
            </Form.Group> */}
            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;

{
  /* <Container>
        
        <Row className="my-5">
          <Col className="col-0 col-lg-3"></Col>

          <Col className="col-12 col-lg-6 shadow shadow-inset p-3 bg-white rounded">
            <Form onSubmit={sendData1}>
              <h3 style={{fontFamily: "Roboto"}}>Login</h3>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="emailItem"
                  value={sentdata.emailItem}
                  onChange={(event) => handleInput1(event)}
                  required
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInputPassword"
                  placeholder="Password"
                  name="passwordItem"
                  value={sentdata.passwordItem}
                  onChange={(event) => handleInput1(event)}
                  required
                />
                <label htmlFor="floatingInputPassword">Password</label>
              </div>
              <Button variant="primary" type="submit" className="w-100">
                LOGIN
              </Button>
            </Form>

            <h6 className="dividerLine text-muted"><span>OR</span></h6>
            <ul className="list-group list-group-flush my-2">
            
              <li id="singleDiv" className="list-group-item  py-3 px-0"></li>
              <li className="list-group-item  py-3 px-0">Git Hub</li>
            </ul>
          </Col>
          <Col className="col-0 col-lg-3"></Col>
        </Row>
        <Row>
          <Col className="col-12 d-flex flex-column align-items-center mt-5">
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={2000}
              autohide
              bg="danger"
              className="w-50"
            >
              <Toast.Body className="text-white text-center">{error}</Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container> */
}
