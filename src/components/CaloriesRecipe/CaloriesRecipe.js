import {
    RecipeContainer,
    RecipeName,
  } from "./styledComponents";
  
  // const TriggerButton = styled.div`
  //   border: none;
  //   background-color: white;
  //   cursor: pointer;
  // `;
  
  const CaloriesRecipe = (props) => {
    const { recipeObj} = props;
    console.log(recipeObj.id)
  
    return (
      <RecipeContainer>
        <RecipeName>{recipeObj.title}</RecipeName>
        <a href={recipeObj.sourceUrl} rel="noreferrer" style={{textDecoration:'none', color: 'black'}} target="_blank">Link to recipe</a>
        <p>Number of servings: {recipeObj.servings}</p>
        <p>Ready in {recipeObj.readyInMinutes} minutes</p>
        
      </RecipeContainer>
    );
  };
  
  export default CaloriesRecipe;
  