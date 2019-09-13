import React from "react";
import Project from "./Project";
import ProjectDetail from "./ProjectDetail";
import headerImage from "../../images/bg-header.png";
import "./projects.css";
import { Modal, Button } from "react-bootstrap";

import Charity from "../Charity";
import Admin from "../Admin";
class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inDonateProcess: false,
      isShowModal: false,
      clickedProject: null
    };
  }

  handleProjectClick = clickedProject => {
    this.setState({ clickedProject, isShowModal: true });
  };

  handleClose = () => {
    this.setState({ clickedProject: null, inDonateProcess: null, isShowModal: false });
  };

  handleDonate = async () => {
    let { projectId, donateAmount } = this.state.clickedProject;
    const { donationContract, account } = this.props;
    donateAmount = this.props.web3.utils.toWei(donateAmount, "ether");
    console.log(projectId, donateAmount, this.state.clickedProject, account, donationContract)
    if (!projectId || !donateAmount || !donationContract || !account) return;
    this.setState({ inDonateProcess: true })
    donationContract.donate(projectId, { from: account, value: donateAmount }).then((err, data) => {
      this.setState({ inDonateProcess: false })
      console.log(err, data)
    })

  }

  handleDonateAmountChange = event => {
    const numberPattern = /^[0-9]*\.?[0-9]*$/;
    const newAmount = event.target.value
    const donateAmount = numberPattern.test(newAmount) ? newAmount : this.state.clickedProject.donateAmount
    this.setState(({ clickedProject }) => ({ clickedProject: { ...clickedProject, donateAmount } }))
  }

  render() {
    return (
      <div
        className="page-container"
      >
        <div className="image-background">
          <img
            style={{
              width: "100%", height: "auto",
            }}
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
          {this.state.clickedProject ?
            <Modal
              show={this.state.isShowModal}
              onHide={this.handleClose}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {this.state.clickedProject ? this.state.clickedProject.id : ""}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ProjectDetail
                  project={this.state.clickedProject}
                  handleDonateAmountChange={this.handleDonateAmountChange}
                ></ProjectDetail>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
              </Button>
                <Button variant="primary" onClick={this.handleDonate}
                  disabled={!this.state.clickedProject || !this.state.clickedProject.donateAmount || this.state.inDonateProcess}>
                  Donate
              </Button>
              </Modal.Footer>
            </Modal> : null}
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
            {this.props.projects.map((project, index) => (
              <React.Fragment key={project.id + " " + index}>
                <Project
                  handleProjectClick={this.handleProjectClick}
                  project={project}
                ></Project>
              </React.Fragment>
            ))}
          </div>
          <Charity />
          <Admin donationContract={this.props.donationContract} account={this.props.account} />
        </div>
      </div>
    );
  }
}

export default Projects;
