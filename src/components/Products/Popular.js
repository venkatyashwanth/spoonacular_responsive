import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();

      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <Container>
      <Wrapper className="d-none d-lg-block">
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "3rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Link to={"/recipe/" + recipe.id}>
                  <Card>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Card>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>

      <Wrapper className="d-block d-lg-none">
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 2,
            arrows: false,
            pagination: true,
            drag: "free",
            gap: "2rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Link to={"/recipe/" + recipe.id}>
                  <Card>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Card>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
  h3{
    @media (max-width: 426px){
        font-size: 1.5rem;
    }
    @media (min-width: 426px) and(max-width: 991px){
        font-size: 1.8rem;
    }
`;

const Card = styled.div`
  @media (max-width: 426px) {
    min-height: 8rem;
    border-radius: 2rem;
    overflow: hidden;
    margin: 0px 5px;
  }
  min-height: 10rem;
  border-radius: 2rem;
  overflow: hidden;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;

  img {
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    width: 100%;
    text-align: center;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    @media (max-width: 426px) {
      font-size: 0.8rem;
    }
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
