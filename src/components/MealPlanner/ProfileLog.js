import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Toast from "react-bootstrap/Toast";
const ProfileLog = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleCredentials = (event) => {
    let { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const data = JSON.parse(localStorage.getItem("_token"));
  const collectionRef = collection(database, `${data.uid}_mealUsers`);

  const verifyCredentials = (event) => {
    event.preventDefault();
    console.log(credentials);

    const getData = () => {
      getDocs(collectionRef).then((response) => {
        const data = response.docs;
        let result = false;
        data.map((item) => {
          if (
            item.data().email === credentials.email &&
            item.data().password === credentials.password
          ) {
            result = true;
            navigate(`/mealProfileInformation/${item.data().user}`)
          }
        });
        !result && setShow(true);
      });
    };
    getData();
  };

  const navigateToProfiles = () => {
    navigate("/ProfilePage");
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={verifyCredentials} className="mb-3">
              <h3 className="text-center">Hello {params.user}! </h3>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="emailItem">Your Email: </Form.Label>
                <Form.Control
                  id="emailItem"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  //   value={userDetails.username}
                  onChange={handleCredentials}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="passwordItem">Your Password: </Form.Label>
                <Form.Control
                  id="passwordItem"
                  type="password"
                  placeholder="Enter Name"
                  name="password"
                  //   value={userDetails.firstName}
                  onChange={handleCredentials}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Verify
              </Button>
            </Form>
            <Button variant="primary" onClick={navigateToProfiles}>
              Go To Profiles
            </Button>
            
          </Col>
        </Row>

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
                Wrong Credentials Entered
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileLog;
