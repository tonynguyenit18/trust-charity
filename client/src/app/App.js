import React, { Component } from "react";
import Home from "./Home";
import Register from "./Register";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
      </BrowserRouter>
    )
  }
}

export default App;
