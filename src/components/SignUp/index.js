import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


// Firebase
import { app } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {updateProfile} from "firebase/auth"

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
          }).then(() => {
            console.log(auth.currentUser);
            console.log(response.user)
          }).catch((error) => {
            console.log(error)
          });
        })
        .catch((err) => alert(err.message));
    } else {
      alert("passwords not matched");
      return;
    }
    setData({ email: "", password: "", confirmPassword: "", username: "" });
    navigate('/signIn')
  };

  return (
    <Container className="mt-3">
      <Form onSubmit={sendData}>
        <h3 className="text-center">Sign Up Form</h3>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="username"
            value={data.username}
            onChange={(event) => handleInput(event)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={data.email}
            onChange={(event) => handleInput(event)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={(event) => handleInput(event)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={(event) => handleInput(event)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
