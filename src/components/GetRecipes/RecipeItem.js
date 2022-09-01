import { useState } from "react";
import { Navigate } from "react-router-dom";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import styled from "styled-components";


import { AiOutlineClose } from "react-icons/ai";

import {
  RecipeContainer,
  CoverImage,
  RecipeName,
  IngredientsText,
  SeeMoreText,
} from "./StyledRecipeComponent";

const TriggerButton = styled.div`
  border: none;
  background-color: white;
  cursor: pointer;
`;

const RecipeItem = (props) => {
  const { recipeObj, APP_KEY } = props;
  const ingredientItem = recipeObj.usedIngredients[0].original;
  const ingredientImage = recipeObj.usedIngredients[0].image;
  const missedIngredient = recipeObj.missedIngredients;

  const [navigated,setNavigated] = useState(false);

  

  const triggerFunc = () => {
    localStorage.setItem('appKey',JSON.stringify(APP_KEY))
    localStorage.setItem('recipeId',JSON.stringify(recipeObj.id))
    localStorage.removeItem('recipeFullData')
    setNavigated(preValue => !preValue)
  }

  return (
    <RecipeContainer>
      <CoverImage src={recipeObj.image} alt={recipeObj.title} />
      <RecipeName>{recipeObj.title}</RecipeName>
      <IngredientsText>
        <Popup
          modal
          trigger={<TriggerButton type="button">Ingredients</TriggerButton>}
        >
          {(close) => (
            <>
              <div style={{ padding: "10px" }}>
                <h4>Available Items</h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <p style={{ width: "200px" }}>{ingredientItem}</p>
                  <img src={ingredientImage} alt={ingredientItem} />
                </div>

                <hr />

                <h4>
                  UnAvailable Items: <span>{missedIngredient.length}</span>
                </h4>
                {missedIngredient.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <p style={{ width: "200px" }}>{item.original}</p>
                    <img src={item.image} alt="product" />
                  </div>
                ))}
              </div>
              <TriggerButton type="button" onClick={() => close()}>
                <AiOutlineClose />
              </TriggerButton>
            </>
          )}
        </Popup>
      </IngredientsText>
      <SeeMoreText>
        <TriggerButton onClick={triggerFunc}>See Complete Recipe</TriggerButton>
      </SeeMoreText>
      {navigated && <Navigate to="/GetIndividualRecipe" replace={true} />}
    </RecipeContainer>
  );
};

export default RecipeItem;
