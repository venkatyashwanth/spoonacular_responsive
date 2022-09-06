import Axios from "axios";
import { GiHamburger } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import {
  Header,
  AppNameComponent,
  SearchComponent,
  SearchInput,
  SearchStyleIcon,
  CaloriesContainer,
  RecipeHeroContainer,
  RecipeHeroText,
  RecipeHeroImage,
} from "./styledComponents";

import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";

import CaloriesRecipe from "./CaloriesRecipe";

const initialImage = () => {
  return (
    <>
      <RecipeHeroContainer>
        <RecipeHeroText>
          Get Recipes Based On Your Calorie Intake per day
        </RecipeHeroText>
        <RecipeHeroImage src="https://julienquaglierinic8e0c9.zapwp.com/q:i/r:1/wp:1/w:412/u:https://julienquaglierini.com/wp-content/uploads/2019/08/calcul-calories.png" />
      </RecipeHeroContainer>
    </>
  );
};

const CalorieFinder = () => {
  const [searchString, setSearchString] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [nutrients, setNutrients] = useState([]);

  const getSearchValue = (event) => {
    setSearchString(event.target.value);
  };

  const getByEnter = (event) => {
    if (event.key === "Enter") {
      fetchRecipe(searchString);
      setSearchString("");
    }
  };

  const handleSearch = () => {
    fetchRecipe(searchString);
    setSearchString("");
  };

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${searchString}&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    if (response.data.length === 0) {
      alert("Recipe Not Found with given input");
    }
    // console.log(response.data);
    setRecipeList(response.data.meals);
    setNutrients(response.data.nutrients);
  };

  const data = [
    {
      count: nutrients.carbohydrates * 4,
      content: "carbs",
    },
    {
      count: nutrients.fat * 9,
      content: "fat",
    },
    {
      count: nutrients.protein * 4,
      content: "protein",
    },
  ];

  return (
    <>
      <Header>
        <Container>
          <Row>
            <Col className="d-flex flex-column flex-lg-row justify-content-between">
              <AppNameComponent>
                <GiHamburger size={36} style={{ marginRight: "10px" }} />
                Calorie Diet
              </AppNameComponent>

              <SearchComponent className="mt-3">
                <SearchInput
                  type="number"
                  placeholder="Enter Number Of Calories"
                  value={searchString}
                  onChange={getSearchValue}
                  onKeyDown={getByEnter}
                />
                <AiOutlineSearch
                  style={SearchStyleIcon}
                  onClick={handleSearch}
                />
              </SearchComponent>
            </Col>
          </Row>
        </Container>
      </Header>

      <Container>
        <Row>
          <CaloriesContainer>
            {recipeList.length === 0
              ? initialImage()
              : recipeList.map((recipeObj) => (
                  <CaloriesRecipe recipeObj={recipeObj} key={recipeObj.id} />
                ))}
          </CaloriesContainer>
          <div>
            {nutrients.length !== 0 && (
              <ul style={{ listStyleType: "none" }}>
                Nutrients:
                <li>Total Calories: {nutrients.calories}</li>
                <li>Carbs: {nutrients.carbohydrates} gms</li>
                <li>Fat: {nutrients.fat} gms</li>
                <li>Protein: {nutrients.protein} gms</li>
              </ul>
            )}
          </div>
        </Row>
        <Row>
            <Col>
          {recipeList.length !== 0 && (
            <ResponsiveContainer width="100%" height={300} maxWidth={300}>
              <PieChart>
                <Pie
                  cx="70%"
                  cy="40%"
                  data={data}
                  startAngle={0}
                  endAngle={360}
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="count"
                >
                  <Cell name="carbs" fill="#fecba6" />
                  <Cell name="fat" fill="#b3d23f" />
                  <Cell name="protein" fill="#a44c9e" />
                </Pie>
                <Legend
                  iconType="circle"
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CalorieFinder;
