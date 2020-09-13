import React from "react";
import PizzaForm from "./components/PizzaForm.js"
import { Route, Link } from "react-router-dom"
import Home from "./components/Home"

const App = () => {
  return (
    <div>
      

      <Route exact path="/" component={Home}/>
            <nav>
                <Link to="/" style={{ margin: "2%" }}>Home</Link>
            </nav>
      
      <Route path="/pizza" data-cy="Order" component={PizzaForm} />
      
    </div>
  );
};
export default App;

