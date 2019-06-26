import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import User from "./components/User";
import Home from "./components/Home";
import Blogpost from "./components/Blogpost";
import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import ScrollIntoView from "./components/ScrollIntoView";

class App extends Component {
  render() {
    return (
      <BrowserRouter >
      <ScrollIntoView>
        <div>
          <Switch>
            <Route path="/" component={Splash} exact />
            <Route path="/user" component={User} />
            <Route path="/:id" component={Blogpost} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
       </ScrollIntoView>
      </BrowserRouter>
    );
  }
};

export default App; 