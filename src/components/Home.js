import React, { Component } from "react";
import { database } from "../firebase";
import _ from "lodash";
import renderHTML from "react-render-html";
import "../App.css";
import User from "./User";
import Header from "./Header";
import Navbar from "./Navbar";
import { NavLink, BrowserRouter, Route, Switch } from "react-router-dom";
import Blogpost from "./Blogpost";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: "",
      body: "",
      posts: {}
    };
  }

  //Lifecycle
  componentDidMount() {
    database.on("value", snapshot => {
      this.setState({
        posts: snapshot.val()
      });
    });
  }

  //Render Firebase Posts Data
  renderPosts() {
    return _.map(this.state.posts, (post, key) => {
      return (
        <div key={key}>
          <br />
          <NavLink to={`${key}`}>
            <h2>{post.title}</h2>
          </NavLink>
          <p>{post.date}</p>
          <p>{post.summary}</p>
          <br />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <Header />
        <br />
        <div className="homeData">{this.renderPosts()}</div>
      </div>
    );
  }
}
