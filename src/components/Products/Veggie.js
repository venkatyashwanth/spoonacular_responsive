import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Container from "react-bootstrap/esm/Container";

import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
        try{
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
              );
              const data = await api.json();
              localStorage.setItem("veggie", JSON.stringify(data.recipes));
              setVeggie(data.recipes);
        }
        catch(error){
            console.log(error)
        }
    }
  };

  return (
    <Container>
      <Wrapper className="d-none d-lg-block">
        <h3 className="mb-3">Our Vegeterian Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "2rem",
          }}
        >
          {veggie.map((recipe) => {
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
        <h3>Our Vegeterian Picks</h3>
        <Splide
          options={{
            perPage: 2,
            arrows: false,
            pagination: true,
            drag: "free",
            gap: "1rem",
          }}
        >
          {veggie.map((recipe) => {
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
  }
`;

const Card = styled.div`
  @media (max-width: 426px) {
    min-height: 8rem;
    border-radius: 2rem;
    overflow: hidden;
    margin: 0px 5px;
  }

  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;

  Link {
    text-decoration: none;
  }
  img {
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    object-fit: cover;
    @media (max-width: 426px){
        border-radius: 0.2rem;
    }
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
    @media (max-width: 426px){
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

export default Veggie;
