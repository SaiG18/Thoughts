import React, { Component } from "react";
import { database } from "../firebase";
import _ from "lodash";
import renderHTML from "react-render-html";
import "../App.css";
import User from "./User";
import Header from "./Header";
import Navbar from "./Navbar";
import { NavLink, BrowserRouter, Route, Switch } from "react-router-dom";

export default class Blogpost extends Component {
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
      var currentPath = this.props.location.pathname;
      var cpKey = currentPath.substring(1);
      if (key == cpKey) {
        var bpTitle = post.title;
        var bpDate = post.date;
        var bpSummary = post.summary;
        var bpEssay = renderHTML(post.body);

        return (
          <div key={key}>
            <br />
            <NavLink to="/">
              <h4 id="postT">{bpTitle}</h4>
            </NavLink>
            <br />
            <p id="date">{bpDate}</p>
            <br />
            <br />
            <p class="summary">{bpSummary}</p>
            <p class="essay">{bpEssay}</p>
            <br />
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div>
        <div className="homeData">{this.renderPosts()}</div>
      </div>
    );
  }
}
