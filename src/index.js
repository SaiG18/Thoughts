import React from "react";
import ReactDOM from "react-dom";
import User from "./components/User";
import Home from "./components/Home";
import Splash from "./components/Splash";
import App from "./App";
import Blogpost from "./components/Blogpost";
import Navbar from "./components/Navbar";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App/>, document.getElementById("root"));

serviceWorker.unregister();
