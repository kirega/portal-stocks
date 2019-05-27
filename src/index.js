
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./app";
import './index.css';
import MainNavbar from "./components/navbar.component";

ReactDOM.render(
  <Router>
    {/*<MainNavbar />*/}
    <App />
  </Router>, document.getElementById("index"));
