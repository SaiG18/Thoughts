import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Blogpost from "./Blogpost";
import Home from "./Home";

export default class Navbar extends Component {
  render() {
    return (
      <div id="footer">
        <NavLink to="/user">
          <h2 id="link2">User</h2>
        </NavLink>
        <NavLink to="/">
          <h1 id="navTitle">Abstracts</h1>
        </NavLink>
      </div>
    );
  }
}
