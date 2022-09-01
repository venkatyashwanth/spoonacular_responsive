import styled from "styled-components";

export const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 30px;
  just-content: space-evenly;
  gap: 30px;
`;
export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;

export const CoverImage = styled.img`
  height: 200px;
`;

export const RecipeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
  height: 60px;
`;
export const IngredientsText = styled.span`
  font-size: 18px;
  border: solid 1px green;
  color: black;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  color: green;
  text-align: center;
  margin-bottom: 12px;
`;
export const SeeMoreText = styled(IngredientsText)`
  color: #eb3300;
  border: solid 1px #eb3300;
`;

export const RecipeHeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  height: 80vh;
`


export const RecipeHeroText = styled.h1`
  font-size: 32px;
  font-weight: bold;
  max-width: 500px;
  text-align: center;
`;

export const RecipeHeroImage = styled.img`
width: 100%;
max-width: 400px;
height: auto;
border-radius: 10px;
`;