import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Search from "./Search";
import Categories from "./Categories";
import Veggie from "./Veggie";
import Popular from "./Popular";


const Products = () => {
  return (
    <>
      <Container>
        <Col className="homePages">
          <Search />
          <Categories />
          <Veggie />
          <Popular />
        </Col>
      </Container>
    </>
  );
};

export default Products;

// import "./index.css";
// import Veggie from "./Veggie";
// import Popular from "./Popular";
// import Categories from "./Categories";
// import Search from "./Search";

// const Home = () => {
//   return (
//     <div className="homePages">
//       <Search />
//       <Categories />
//       <Veggie />
//         <Popular />
//     </div>
//   );
// };

// export default Home;
