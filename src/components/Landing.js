import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div id="landingP">
        <NavLink to="/">
          <h1 id="landing">Abstracts</h1>
        </NavLink>
      </div>
    );
  }
}
