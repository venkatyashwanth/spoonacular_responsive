import React from "react";
import { useState, useEffect } from "react";
import { app } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { signInWithPopup, GithubAuthProvider } from "firebase/auth";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";

import "./index.css";

const Signin = () => {
  const navigate = useNavigate();

  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();

  const providerGit = new GithubAuthProvider();
  providerGit.addScope('repo');
  providerGit.setCustomParameters({
    'allow_signup': 'false'
  });

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const [client, setClient] = useState("");

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
            uid: response.user.uid,
          });
          localStorage.setItem("_token", responseData);
        }
        navigate(`/home`);
      })
      .catch((err) => {
        if (err == "FirebaseError: Firebase: Error (auth/user-not-found).") {
          setError("Username is not registered");
        } else if (
          err == "FirebaseError: Firebase: Error (auth/wrong-password)."
        ) {
          setError("Enter Valid Password");
        }
        setShow(true);
      });

    setSentData({ emailItem: "", passwordItem: "" });
  };

  const signInWithGitHub = () => {
    console.log(auth.currentUser);
    signInWithPopup(auth, providerGit)
      .then((result) => {
        console.log(result);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(token);
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        var email = error.customData.email;
        // The AuthCredential type that was used.
        var credential = GithubAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
        if (error.code === "auth/account-exists-with-different-credential") {
          var pendingCred = error.credential;
          console.log(pendingCred)
          // fetchSignInMethodsForEmail(auth, email).then(function (methods) {
          //   console.log(methods);
          //   if (methods[0] === "password") {
          //     console.log("here");
          //   }

          //   // var provider = getProviderForProviderId(methods[0]);
          //   // console.log(provider)
          // });
        }
      });
  };

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [GithubAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((response) => {
  //       if (response.user) {
  //         const responseData = JSON.stringify({
  //           token: response.user.accessToken,
  //           username: response.user.displayName,
  //           uid: response.user.uid,
  //         });
  //         localStorage.setItem("_token", responseData);
  //         console.log(response.user);
  //         setClient(response.user.uid);
  //       }
  //       // navigate(`/home`);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  const handleCallbackResponse = (response) => {
    const idToken = response.credential;
    const credential = GoogleAuthProvider.credential(idToken);
    console.log(credential);

    const endTimer = setTimeout(() => {
      let user = auth.currentUser;
      console.log(user);
      console.log(user.uid);
      const responseData = JSON.stringify({
        token: user.accessToken,
        username: user.displayName,
        uid: user.uid,
      });
      console.log(responseData);
      localStorage.setItem("_token", responseData);
      setClient(user.uid);
      navigate(`/home`);
      clearTimeout(endTimer);
    }, 2000);
    signInWithCredential(auth, credential).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The credential that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: `359767345663-1rfm3quklsmrocs5299euh61hjlpqbca.apps.googleusercontent.com`,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("singleDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <Container>
        <Row className="my-5">
          <Col className="col-0 col-lg-3"></Col>

          <Col className="col-12 col-lg-6 shadow shadow-inset p-3 bg-white rounded">
            <Form onSubmit={sendData1}>
              <h3 style={{ fontFamily: "Roboto" }}>Login</h3>
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

            <h6 className="dividerLine text-muted">
              <span>OR</span>
            </h6>
            <ul className="list-group list-group-flush my-2">
              <li id="singleDiv" className="list-group-item  py-3 px-0"></li>
              {/* <li className="list-group-item  py-3 px-0">
                <button onClick={signInWithGitHub}>Git Hub</button>
              </li> */}
            </ul>
            {/* <div>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </div> */}
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
              <Toast.Body className="text-white text-center">
                {error}
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signin;
