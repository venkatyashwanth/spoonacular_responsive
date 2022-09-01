import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./styles.css";

const MealPlanner = () => {
  const navigate = useNavigate();
  const navigateToProfilesPage = () => {
    navigate("/profilePage");
  };

  const navigateToCreateProfilePage = () => {
    navigate("/registerProfile");
  };

  return (
    <Container>
      <div className="d-flex flex-column align-items-center mt-3">
        <h1>Do you have your profile?</h1>
        <div>
          <Button variant="outline-success" className="p-2 mx-2 rounded-button" onClick={navigateToProfilesPage}>
            YES
          </Button>
          <Button variant="outline-warning" className="p-2 mx-2 rounded-button" onClick={navigateToCreateProfilePage}>
            NO
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default MealPlanner;
