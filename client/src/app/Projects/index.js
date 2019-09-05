import React from "react";
import Project from "./Project";
import headerImage from "../../images/bg-header.png";
import "./projects.css";

class Projects extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="image-background">
          <img
            style={{ width: "100%", height: "auto" }}
            src={headerImage}
            alt="Header Image"
          />
        </div>
        <div
          className="page-content"
          style={{
            backgroundColor: "#ffffff",
            position: "relative",
            minHeight: "100vh"
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "60px",
              backgroundColor: "#ffffff",
              marginTop: "100vh"
            }}
          >
            <h4 style={{ fontSize: "24px", color: "#14BDEB" }}>Projects</h4>
          </div>
          <div className="project-container row m-3">
            {this.props.projects.map(project => (
              <Project key={project.id} project={project}></Project>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
