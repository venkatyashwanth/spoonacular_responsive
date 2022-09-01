import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { database } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";

const Register = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/ProfilePage");
  };

  const [error,setError] = useState('');
  const [successMsg, setSuccessMsg] = useState("");
  const [show, setShow] = useState(false); //For Error message
  const [showSuccess, setShowSuccess] = useState(false); //For Success message
  

  const [userDetails, setUserDetails] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    yPassword: "",
  });

  const handleDetails = (event) => {
    let { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const data = JSON.parse(localStorage.getItem("_token"));

  const collectionRef = collection(database, `${data.uid}_mealUsers`);
  const addToDataBase = (mealData) => {
    console.log(mealData);
    addDoc(collectionRef, {
      email: mealData.email,
      hash: mealData.hash,
      password: mealData.password,
      spoonacularPassword: mealData.spoonacularPassword,
      status: mealData.status,
      user: mealData.user,
      username: mealData.username,
    })
      .then(() => {
        setSuccessMsg("Data Added")
        setShowSuccess(true);
      })
      .catch((err) => {
        setError(err.message);
        setShow(true)
      });
  };

  const addDetails = (details) => {
    const user = details.username;
    const email = details.email;
    const password = details.yPassword;

    console.log(user);
    console.log(email);
    const url = `https://api.spoonacular.com/users/connect?apiKey=${process.env.REACT_APP_API_KEY}`;
    console.log(url);
    const options = {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const doNetworkCall = async () => {
      try {
        const response = await fetch(url, options);
        const jsonData = await response.json();
        addToDataBase({ user, email, password, ...jsonData });
      } catch (error) {
        console.log(error);
      }
    };

    doNetworkCall();
  };

  const sendData = (event) => {
    event.preventDefault();

    // Get Data from the firebase
    const getData = () => {
      getDocs(collectionRef).then((response) => {
        const data = response.docs;
        let result = false;
        data.map((item) => {
          if (userDetails.username === item.data().user) {
            result = true;
          }
        });
        if (result) {
          setError("username already existed")
          setShow(true)
        } else {
          addDetails(userDetails);
        }
      });
    };
    getData();
  };

  return (
    <>
      <Container className="mt-3">
        <Form onSubmit={sendData} className="mb-3">
          <h3 className="text-center">Profile Register</h3>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="userName">Enter username: </Form.Label>
            <Form.Control
              id="userName"
              type="text"
              placeholder="Enter Name"
              name="username"
              value={userDetails.username}
              onChange={handleDetails}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="firstName">Enter firstName: </Form.Label>
            <Form.Control
              id="firstName"
              type="text"
              placeholder="Enter Name"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleDetails}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="lastName">Enter lastName: </Form.Label>
            <Form.Control
              id="lastName"
              type="text"
              placeholder="Enter Name"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleDetails}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Enter your email: </Form.Label>
            <Form.Control
              id="email"
              name="email"
              type="email"
              placeholder="Enter Name"
              value={userDetails.email}
              onChange={handleDetails}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Enter your password: </Form.Label>
            <Form.Control
              id="password"
              name="yPassword"
              type="password"
              placeholder="Enter Name"
              value={userDetails.yPassword}
              onChange={handleDetails}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Profile
          </Button>
        </Form>
        <Button variant="outline-secondary" onClick={navigateToHome}>Profile Home</Button>
        <Row>
          <Col className="d-flex flex-column align-items-end mt-5">
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={2000}
              autohide
              bg="danger"
            >
              <Toast.Body className="text-white">
                {error}
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column align-items-end mt-5">
            <Toast
              onClose={() => setShowSuccess(false)}
              show={showSuccess}
              delay={2000}
              autohide
              bg="success"
            >
              <Toast.Body className="text-white">
                {successMsg}
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
