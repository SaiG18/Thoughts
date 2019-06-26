import React, { Component } from "react";
import { NavLink } from 'react-router-dom'; 

export default class Header extends Component {
  render() {
    return (
      <div>
        <NavLink to='/' ><h1>Abstracts</h1></NavLink>
        <br />
      </div>
    );
  }
}
