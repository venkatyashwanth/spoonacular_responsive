import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import WelcomePage from "./components/WelcomePage";
import GetRecipes from "./components/GetRecipes";
import Products from "./components/Products";
import Cuisine from "./components/Products/Cuisine";
import Recipe from "./components/Products/Recipe";
import MealPlanner from "./components/MealPlanner";
import Profiles from "./components/MealPlanner/Profiles";
import Register from "./components/MealPlanner/Register";
import ProfileLog from "./components/MealPlanner/ProfileLog";
import MealsProfile from "./components/MealPlanner/MealsProfile";
import Searched from "./components/Products/Searched";

import GetTest from "./components/GetTest";
import { isLoggedIn } from "./components/service.js/Auth";

function PrivateRoute({ children }) {
  const auth = isLoggedIn();
  return auth ? children : <Navigate to="/" />;
}

function App() {
  return (
    <div className="containerFluid">
      <Router>
        <Header />
        <section>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />

            <Route
              exact
              path="/home"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/cuisine/:type"
              element={
                <PrivateRoute>
                  <Cuisine />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/recipe/:name"
              element={
                <PrivateRoute>
                  <Recipe />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/searched/:search"
              element={
                <PrivateRoute>
                  <Searched />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/GetRecipes"
              element={
                <PrivateRoute>
                  <GetRecipes />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/GetTestPage"
              element={
                <PrivateRoute>
                  <GetTest />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/mealPlanPage"
              element={
                <PrivateRoute>
                  <MealPlanner />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/profilePage"
              element={
                <PrivateRoute>
                  <Profiles />
                </PrivateRoute>
              }
            />
            <Route path="/registerProfile" exact element={<Register />}></Route>
            <Route
              exact
              path="/profileLog/:user"
              element={
                <PrivateRoute>
                  <ProfileLog />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/mealProfileInformation/:user"
              element={
                <PrivateRoute>
                  <MealsProfile />
                </PrivateRoute>
              }
            />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;
