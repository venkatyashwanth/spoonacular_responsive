import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/esm/Container";
import { Link, useParams } from "react-router-dom";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();


  const getCuisine = async (name) => {
    try{
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
      );
      const recipes = await data.json();
      setCuisine(recipes.results);
    }
    catch(error){
      console.log(error.message)
    }
    
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);


  return (
    <Container>
    <Grid>
      {cuisine.length !== 0 && cuisine.map((item) => {
        return (
          <Link to={"/recipe/" + item.id} key={item.id}>
            <Card key={item.id}>
              <img src={item.image} alt="" />
              <span className="mt-2">{item.title}</span>
            </Card>
          </Link>
        );
      })}
    </Grid>
    </Container>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 2rem;
`;

const Card = styled.div`
display: flex;
flex-direction: column;
align-items: center;
  margin: 10px;
  img {
    width: 100%;
    border-radius: 2rem;
    max-width: 120px;
  }
  span {
    text-align: center;
    font-size: 14px;
    color: black;
    max-width: 120px;
  }
`;

export default Cuisine;
