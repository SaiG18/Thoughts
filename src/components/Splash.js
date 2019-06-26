import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Splash extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.isSignedIn ? (
            <span>
              <Home />
              <NavLink to="/">
                <div>
                  <button
                    id="signout"
                    onClick={() => firebase.auth().signOut()}
                  >
                    Sign Out
                  </button>
                </div>
              </NavLink>
              <div id="footer">
                <NavLink to="/user">
                  <h2 id="link2">New Post</h2>
                </NavLink>
                <NavLink to="/">
                  <h1 id="navTitle">Thoughts</h1>
                </NavLink>
              </div>
            </span>
          ) : (
            <div id="landingP">
              <Landing />
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Splash;
