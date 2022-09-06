import styled from "styled-components";
export const Header = styled.div`
color: white;
background-color: black;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 20px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`;
export const AppNameComponent = styled.div`
display: flex;
align-items: center;
font-size: 22px;
`;

export const SearchComponent = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: white;
padding:10px;
border-radius: 6px;
width: 50%;
@media (max-width: 991px){
    width: 100%;
}
`;

export const SearchInput = styled.input`
border: none;
outline: none;
margin-right: 15px;
font-size: 16px;
font-weight: bold;
width: 100%;
`;
export const SearchStyleIcon = { color: "black", cursor: "pointer" };


export const CaloriesContainer = styled.div`
  display: flex;
  flex-direction: row;
//   justify-content: space-between;
  flex-wrap: wrap;
  padding: 30px;
  gap: 30px;
  @media (max-width: 991px){
    justify-content: center;
  }
`;

// --------------------------------------------

export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
  border-radius: 10px;
`;

export const CoverImage = styled.img`
  height: 200px;
`;

export const RecipeName = styled.span`
  font-size: 16px;
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
  @media (max-width: 442px){
    height: 40vh;
  }
`


export const RecipeHeroText = styled.h1`
  font-size: 32px;
  font-weight: bold;
  max-width: 500px;
  text-align: center;
  @media (max-width: 442px){
    font-size: 18px;
  }
`;

export const RecipeHeroImage = styled.img`
width: 100%;
max-width: 400px;
height: auto;
border-radius: 10px;
`;