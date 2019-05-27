import React, { PureComponent} from 'react';
import MainNavbar from "./navbar.component";
import { BrowserRouter } from "react-router-dom";

class Inventory extends  PureComponent {
  componentDidMount() {
    console.log('I just loaded');
  }

  render() {
    return (
      <div>
        <MainNavbar/>
        <h4>Inventory</h4>
      </div>

    );
  }
}
export default Inventory;
