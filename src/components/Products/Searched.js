import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import Container from "react-bootstrap/esm/Container";

function Searched() {
  const [searchRecipes, setSearchRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchRecipes(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Container>
      <Grid>
        {searchRecipes.map((item) => {
          return (
            <Link to={"/recipe/" + item.id} style={{color: "black"}}>
              <Card key={item.id}>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
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
  grid-gap: 3rem;
  margin: 0 10%;
  min-height: 65vh;
`;

const Card = styled.div`
  margin: 10px;
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
    font-size: 14px;
  }
`;

export default Searched;
