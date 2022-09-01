import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

const MealsProfile = () => {
  const params = useParams();
  return (
    <Container>
      <h3>This is meals profile of {params.user}</h3>
    </Container>
  );
};

export default MealsProfile;
