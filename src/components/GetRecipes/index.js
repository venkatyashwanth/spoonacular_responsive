import styled from "styled-components";
import Axios from "axios";
import { useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { GiHamburger } from "react-icons/gi";
import RecipeItem from './RecipeItem'
import {
  Header,
  AppNameComponent,
  SearchComponent,
  SearchInput,
  SearchStyleIcon,
} from "./StyledHeaderComponent";

import {
  RecipeListContainer,
  RecipeHeroContainer,
  RecipeHeroText,
  RecipeHeroImage,
} from "./StyledRecipeComponent";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


const initialImage = () => {
  return (
    <>
      <RecipeHeroContainer>
        <RecipeHeroText>
          Get Your Recipes Based On Ingredients Available In Your Home
        </RecipeHeroText>
        <RecipeHeroImage src="https://www.pluggedin.com/wp-content/uploads/2019/12/ratatouille-1200x684.png" />
      </RecipeHeroContainer>
    </>
  );
};


const GetRecipes = () => {

  const [searchString, setSearchString] = useState("");
  const [recipeList, setRecipeList] = useState([]);

  const handleSearch = () => {
    fetchRecipe(searchString);
    setSearchString("");
  };

  const getSearchValue = (event) => {
    setSearchString(event.target.value);
  };

  const getByEnter = (event) => {
    if (event.key === "Enter") {
      fetchRecipe(searchString);
      setSearchString("");
    }
  };

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchString}&number=20&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    if (response.data.length === 0) {
      alert("Recipe Not Found with given input");
    }
    setRecipeList(response.data);
  };


  return (
    <Container>
      <Header>
        <AppNameComponent>
          <GiHamburger size={36} style={{ margin: "15px" }} />
          Get Recipes
        </AppNameComponent>

        <SearchComponent>
          <SearchInput
            type="search"
            placeholder="Enter Ingredients"
            value={searchString}
            onChange={getSearchValue}
            onKeyDown={getByEnter}
          />
          <AiOutlineSearch style={SearchStyleIcon} onClick={handleSearch} />
        </SearchComponent>
      </Header>

      <RecipeListContainer>
        {recipeList.length === 0
          ? initialImage()
          : recipeList.map((recipeObj) => (
              <RecipeItem
                recipeObj={recipeObj}
                key={recipeObj.id}
              />
            ))}
      </RecipeListContainer>
    </Container>
  );
};

export default GetRecipes