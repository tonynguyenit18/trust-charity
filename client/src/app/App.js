import React, { Component } from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter, Route } from "react-router-dom";
import { getCurrentUserInfo } from "./utils/api"

export const AppContext = React.createContext(null);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    const token = localStorage.getItem("access_token");
    if (!token || (token && this.state.user)) return;
    getCurrentUserInfo().then(response => {
      if (response.data && response.data.user) {
        if (response.data.user.token) {
          localStorage.setItem("access_token", response.data.user.token)
        }
        this.setState({ user: response.data.user })
      }
    }).catch(error => {
      throw error;
    })
  }

  handleClearUserInfo = () => {
    this.setState({ user: null })
  }

  render() {
    return (
      <AppContext.Provider value={{ user: this.state.user, clearUser: this.handleClearUserInfo }}>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </BrowserRouter>
      </AppContext.Provider>
    )
  }
}

export default App;
