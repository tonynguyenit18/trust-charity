import React from "react";
import Project from "./Project";
import ProjectDetail from "./ProjectDetail";
import headerImage from "../../images/bg-header.png";
import "./projects.css";
import { Modal, Button } from "react-bootstrap";

import Charity from "../Charity";
class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      clickedProject: null
    };
  }

  handleProjectClick = clickedProject => {
    this.setState({ clickedProject, isShowModal: true });
  };

  handleClose = () => {
    this.setState({ isShowModal: false });
  };
  render() {
    return (
      <div
        className="page-container"
        style={{
          overflow: "hidden"
        }}
      >
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
            position: "relative"
          }}
        >
          <Modal show={this.state.isShowModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.clickedProject ? this.state.clickedProject.id : ""}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProjectDetail
                project={this.state.clickedProject}
              ></ProjectDetail>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Donate
              </Button>
            </Modal.Footer>
          </Modal>
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
          <div className="project-container row">
            {this.props.projects.map(project => (
              <Project
                handleProjectClick={this.handleProjectClick}
                key={project.id}
                project={project}
              ></Project>
            ))}
          </div>
          <Charity />
        </div>
      </div>
    );
  }
}

export default Projects;
