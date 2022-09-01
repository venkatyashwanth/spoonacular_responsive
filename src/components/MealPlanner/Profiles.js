import { useState } from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from 'react-bootstrap/Spinner';
import "./styles.css";



const Profiles = () => {
  const navigate = useNavigate();

  const navigateToCreateProfile = () => {
    navigate("/registerProfile");
  };

  const [fireStoreData, setFireStoreData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const data = JSON.parse(localStorage.getItem("_token"));

  const collectionRef = collection(database, `${data.uid}_mealUsers`);

  const getData = () => {
    getDocs(collectionRef).then((response) => {
      setFireStoreData(response.docs);
      setIsLoading(false)
    });
    
  };
  getData();
  const navigateToProfile = (user) => {
    navigate(`/profileLog/${user}`)
  };


  const renderProfileInfo = () => {
    return (
      <div className="d-flex flex-wrap my-3 justify-content-center justify-content-lg-start">
        {isLoading && <Spinner animation="grow" />}
        {fireStoreData.map((item) => (
          <Card className="card-width mr-3 my-3" key={item.data().user}>
            <Card.Body>
              <Card.Title>{item.data().user}</Card.Title>
              <Button variant="primary" onClick={() => navigateToProfile(item.data().user)}>Profile Log</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <>
      <Container className="my-5">
        <h3>Profiles Page</h3>
        {renderProfileInfo()}
        <Button variant="outline-secondary" onClick={navigateToCreateProfile}>Add New Profile</Button>
      </Container>
    </>
  );
};

export default Profiles;
