import React from "react";
import "./header.css";
import { Link } from "react-router-dom";


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
    const projectSection = document.querySelector(`.${section}`);
    const header = document.querySelector(`.header-content`);
    if (!projectSection || !header) return;
    const projectSectionY = projectSection.offsetTop;
    const headerHeight = header.offsetHeight;
    window.scrollTo({
      top: projectSectionY - headerHeight,
      behavior: "smooth"
    });
  };

  render() {
    return (
      <div className="header">
        <div
          className="header-content"
          style={
            this.state.headerWithBackground
              ? { backgroundColor: "#000000" }
              : {}
          }
        >
          <nav
            className="navbar navbar-expand-lg navbar-ligth justify-content-between"
            style={{ backgroundColor: "#ffffff00" }}
          >
            <a
              className="navbar-brand"
              style={{ color: "#14BDEB", fontWeight: "bold" }}
              href="#"
            >
              Trust Charity
            </a>
            <div className="d-flex flex-row-reverse">
              <Link to="/register">
                <button className="btn-in-navbar">Register</button>
              </Link>
              <Link to="/login">
                <button className="btn-in-navbar">Log in</button>
              </Link>
              <button
                className="btn-in-navbar"
                onClick={this.moveToSection("page-content")}
              >
                Projects
              </button>
              <button className="btn-in-navbar">Petrons</button>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
