import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Product from "./components/product.component";
import Inventory from "./components/inventory.component";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/' exact component={ Product }/>
          <Route path='/products/' component={ Product }/>
          <Route path='/inventory/' component={ Inventory }/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
