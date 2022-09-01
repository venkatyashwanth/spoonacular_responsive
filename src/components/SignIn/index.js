import React from "react";
import { useState,useEffect } from "react";
import { app } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";

import jwt_decode from 'jwt-decode';


const Signin = () => {
  const navigate = useNavigate();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const [client,setClient] = useState('');

  const [sentdata, setSentData] = useState({
    emailItem: "",
    passwordItem: "",
  });

  const handleInput1 = (event) => {
    let { name, value } = event.target;
    setSentData({ ...sentdata, [name]: value });
  };

  const sendData1 = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, sentdata.emailItem, sentdata.passwordItem)
      .then((response) => {
        if (response.user) {
          const responseData = JSON.stringify({
            token: response.user.accessToken,
            username: response.user.displayName,
            uid: response.user.uid
          });
          localStorage.setItem("_token", responseData);
        }
        navigate(`/home`);
      })
      .catch((err) => {
        alert(err)
        if(err == "FirebaseError: Firebase: Error (auth/user-not-found)."){
          setError("Username is not registered")
        }
        else if(err == "FirebaseError: Firebase: Error (auth/wrong-password)."){
          setError("Enter Valid Password")
        }
        setShow(true)
      });

    setSentData({ emailItem: "", passwordItem: "" });
  };

  // FirebaseError: Firebase: Error (auth/user-not-found).
  // FirebaseError: Firebase: Error (auth/user-not-found).
  // FirebaseError: Firebase: Error (auth/wrong-password).

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        if (response.user) {
          const responseData = JSON.stringify({
            token: response.user.accessToken,
            username: response.user.displayName,
            uid: response.user.uid
          });
          localStorage.setItem("_token", responseData);
          console.log(response.user)
          setClient(response.user.uid)
          
        }
        // navigate(`/home`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const handleCallbackResponse = () => {
    console.log("responsed");
    // const hidden_data = jwt_decode(data.token);
    console.log(client)
  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: `359767345663-1rfm3quklsmrocs5299euh61hjlpqbca.apps.googleusercontent.com`,
      })
      // 
      //806220621824-lksaj1upiicup1ln51ucfoai227n91b6.apps.googleusercontent.com
    google.accounts.id.renderButton(
    document.getElementById("singleDiv"),
    {theme:"outline", size: "large"}
    )
  }, [])


  

  return (
    <>
      <Container className="mt-3">
        <Form onSubmit={sendData1}>
          <h3 className="text-center">Sign In Form</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="emailItem"
              value={sentdata.emailItem}
              onChange={(event) => handleInput1(event)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="passwordItem"
              value={sentdata.passwordItem}
              onChange={(event) => handleInput1(event)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <hr />
        <div className="row">
          <div className="col-12 d-flex flex-column justify-center">
            <h4 className="text-center">Sign In With Google</h4>
            <div id="singleDiv"></div>
            <Button
              variant="inherit"
              type="button"
              className="align-self-center"
              onClick={signInWithGoogle}
            >
              <FcGoogle size={30} />
            </Button>
          </div>
        </div>
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
      </Container>
    </>
  );
};

export default Signin;
