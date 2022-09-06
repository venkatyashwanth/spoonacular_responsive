import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Wine } from "./WineResource";


const GetTest = () => {
  const [wineInfo, setWineInfo] = useState([]);

  const getWineRecommendation = (wine) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `https://api.spoonacular.com/food/wine/recommendation?apiKey=${process.env.REACT_APP_API_KEY}&wine=${wine}&number=10`;

    const doNetworkCall = async () => {
      try {
        const response = await fetch(url, options);
        const jsonData = await response.json();
        console.log(jsonData.recommendedWines);
        setWineInfo(jsonData.recommendedWines);
      } catch (error) {
        console.log(error);
      }
    };
    doNetworkCall();
  };

  const handleWineType = (event) => {
    getWineRecommendation(event.target.value);
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <h4>Wine Recommendations</h4>
          <form>
            <div className="row">
              <div className="col">
                <label htmlFor="wines">Choose:</label>
                <select
                  name="wines"
                  id="wines"
                  onChange={handleWineType}
                  className="form-control"
                >
                  {Wine[0].white_wine.dry_white_wine.map((eachValue) => (
                    <option value={eachValue} key={eachValue}>
                      {eachValue}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </Row>
        <Row>
            <Col className="d-flex justify-content-center justify-content-xl-start flex-wrap mt-5">
            {wineInfo.length !== 0 &&
            wineInfo.map((eachWine) => (
              <Card key={eachWine.id} style={{ width: "300px", minHeight: "550px" }} className="d-flex flex-column justify-content-between mb-5 me-0 me-sm-4 shadow">
                <Card.Img variant="top" src={eachWine.imageUrl} style={{width: "220px", height: "200px",resizeMode: 'contain', margin: "auto", padding: "3px"}}/>


                <Card.Body>
                  <Card.Title style={{height: "40px"}}>{eachWine.title}</Card.Title>
                  <p>Description: </p>
                  <Card.Text className="overflow-scroll" style={{maxHeight: "80px"}}>
                    {eachWine.description}
                  </Card.Text>
                  <p>Price: {eachWine.price}</p>
                  <p>Rated by: {eachWine.ratingCount} members</p>
                  <p>Score: {Math.ceil(eachWine.score * 100)}</p>
        
                </Card.Body>
                <a href={eachWine.link} target="_blank" className="btn btn-primary">Buy Now</a>
              </Card>
            ))}
            </Col>
          
        </Row>
      </Container>
    </>
  );
};

export default GetTest;
