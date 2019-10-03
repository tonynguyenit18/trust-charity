import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { AppContext } from "../App"

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerWithBackground: false
    };

    this.pageContent = null;
    this.navBar = null;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScrollAction);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScrollAction);
  }

  handleLogout = (context) => () => {
    localStorage.clear();
    if (context.clearUser && context.clearUser instanceof Function) {
      context.clearUser()
    }

  }

  handleScrollAction = () => {
    this.pageContent = document.querySelector(".page-content");
    this.navBar = document.querySelector(".header-content");
    if (!this.pageContent || !this.navBar) return;
    if (
      !this.state.headerWithBackground &&
      this.pageContent.getBoundingClientRect().top <= this.navBar.offsetHeight
    ) {
      this.setState({ headerWithBackground: true });
    }

    if (
      this.state.headerWithBackground &&
      this.pageContent.getBoundingClientRect().top > this.navBar.offsetHeight
    ) {
      this.setState({ headerWithBackground: false });
    }
  };

  moveToSection = section => event => {
    const projectSection = document.querySelector(`.page-content`);
    const header = document.querySelector(`.header-content`);
    if (!projectSection || !header) return;
    const projectSectionY = projectSection.offsetTop;
    const headerHeight = header.offsetHeight;
    let sectionOffset = 0
    if (section === 'patron') sectionOffset = document.querySelector(`#patron-section`).offsetTop

    window.scrollTo({
      top: projectSectionY - headerHeight + sectionOffset,
      behavior: "smooth"
    });
  };

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <div className="header">
            <div
              className="header-content"
              style={
                this.state.headerWithBackground || this.props.backgroundColor
                  ? { backgroundColor: "#000000" }
                  : {}
              }
            >
              <nav
                className="navbar navbar-expand-lg navbar-ligth justify-content-between"
                style={{ backgroundColor: "#ffffff00" }}
              >
                <Link
                  className="navbar-brand"
                  style={{ color: "#14BDEB", fontWeight: "bold" }}
                  to="/"
                >
                  Trust Charity
            </Link>
                <div className="d-flex flex-row-reverse">
                  {context && context.user ?
                    <button className="btn-in-navbar" onClick={this.handleLogout(context)}>Log out</button>
                    :
                    <React.Fragment>
                      <Link to="/register">
                        <button className="btn-in-navbar">Register</button>
                      </Link>
                      <Link to="/login">
                        <button className="btn-in-navbar">Log in</button>
                      </Link>
                    </React.Fragment>}
                  <button
                    className="btn-in-navbar"
                    onClick={this.moveToSection('projects')}
                  >
                    Projects
              </button>
                  <button
                    className="btn-in-navbar"
                    onClick={this.moveToSection("patron")}
                  >Petrons</button>
                </div>
              </nav>
              {context && context.user && context.user.role && context.user.userName ?
                <div style={{ textAlign: "right", marginRight: "3%" }}>
                  <p style={{ color: "#ffffff" }}>{`${context.user.role.toUpperCase()}: ${context.user.userName}`}</p>
                </div> : null}
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Header;
