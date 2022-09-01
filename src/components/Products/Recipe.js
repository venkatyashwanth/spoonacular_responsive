import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

import React from "react";
import { ImportantDevices } from "@mui/icons-material";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [tasteInfo, setTasteInfo] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);

    const tasteData = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/tasteWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const tasteDetailData = await tasteData.json();
    setTasteInfo(tasteDetailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  const renderTasteList = () => {
    return Object.keys(tasteInfo).map((obj, i) => (
      <p>
        {obj}: {tasteInfo[obj]}
      </p>
    ));
  };

  return (
    <Container>
      <DetailWrapper className="d-flex flex-column flex-lg-row">
        <div>
          <h2>{details.title}</h2>
          <img src={details.image} alt="" />
        </div>
        <Info className="d-flex flex-column d-lg-flex flex-lg-column">
          <div className="d-flex flex-column align-items-center my-3">
            <Button
              className={activeTab === "instructions" ? "active" : ""}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </Button>
            <Button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </Button>
            <Button
              className={activeTab === "taste" ? "active" : ""}
              onClick={() => setActiveTab("taste")}
            >
              Taste
            </Button>
          </div>

          {activeTab === "instructions" && (
            <IngredientBox>
              <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
              <p dangerouslySetInnerHTML={{ __html: details.instructions }} className={"text-secondary"}></p>
            </IngredientBox>
          )}
          {activeTab === "ingredients" && (
            <div>
              <ul>
                {details.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "taste" && renderTasteList()}
        </Info>
      </DetailWrapper>
    </Container>
  );
}

const DetailWrapper = styled.div`
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  @media (max-width: 425px) {
    h2 {
      margin-bottom: 2rem;
      font-size: 18px;
      text-align: center;
    }
    img {
      width: 100%;
      min-width: 210px;
      border-radius: 10px;
    }
    margin: 2rem 0rem 5rem 0rem;
  }

  @media (min-width: 426px) and (max-width: 991px) {
    h2 {
      margin-bottom: 2rem;
      font-size: 22px;
      text-align: center;
    }
    img {
      width: 100%;
      min-width: 280px;
      border-radius: 10px;
    }
    margin: 2rem 0rem 5rem 0rem;
  }

  @media (min-width: 992px){
    img {
      width: 100%;
      min-width: 320px;
      border-radius: 10px;
    }
  }
  margin: 2rem 0rem 5rem 0rem;

  h2 {
    margin-bottom: 2rem;
  }

  

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  margin-top: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
`;

const Info = styled.div`
  @media (min-width: 991px){
    margin-left: 0rem;
    width: 50%;
    margin-left: 5rem;
  }
  width: 100%;
  
`;

const IngredientBox = styled.div`
  p{
    font-size: 16px;
  }
`

export default Recipe;
