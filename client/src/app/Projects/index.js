import React from "react";
import Project from "./Project";
import ProjectDetail from "./ProjectDetail";
import headerImage from "../../images/bg-header.png";
import "./projects.css";
import { Modal, Button } from "react-bootstrap";
import { AppContext } from "../App"

import Charity from "../Charity";
import Admin from "../Admin";
class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inActionProcess: false,
      isShowModal: false,
      clickedProject: null,
      desireAction: null,
      donatingError: ""
    };
  }

  handleProjectClick = (clickedProject, desireAction) => {
    this.setState({ clickedProject, isShowModal: true, desireAction });
  };

  handleClose = () => {
    this.setState({ clickedProject: null, inActionProcess: false, isShowModal: false });
  };

  handleDonate = async () => {
    let { projectId, donateAmount } = this.state.clickedProject;
    let { donationContract, account, web3 } = this.props;
    donateAmount = web3.utils.toWei(donateAmount, "ether");
    if (!account) {
      account = await this.getMetaMaskAccountAddress();
    }
    if (!projectId || !donateAmount || !donationContract || !account) {
      if (!account) {
        this.setState({ donatingError: "There is an error occur. Please check your metamask accoutn." })
      }
      else if (!donateAmount) {
        this.setState({ donatingError: "Donation Amount is required." })
      } else {
        this.setState({ donatingError: "There is an error occur. Please reload the page and try again." })
      }
      return;
    };
    this.setState({ inActionProcess: true })
    donationContract.donate(projectId, { from: account, value: donateAmount }).then((data, err) => {
      if (err) {
        this.setState({ inActionProcess: false, donatingError: "There is an error occur. Please try again" })
        console.log(err)
      } else {
        console.log(data)
        this.handleClose();
        this.props.reLoadPage()
      }
    })

  }

  handleReport = async () => {
    let { projectId, reportReason } = this.state.clickedProject;
    let { donationContract, account } = this.props;
    if (!account) {
      account = await this.getMetaMaskAccountAddress()
    }
    if (!projectId || !reportReason || !donationContract || !account) {
      if (!account) {
        this.setState({ donatingError: "There is an error occur. Please check your metamask accoutn." })
      }
      else if (!reportReason) {
        this.setState({ donatingError: "Reason is required" })
      } else {
        this.setState({ donatingError: "There is an error occur. Please reload the page and try again" })
      }
      return;
    };
    this.setState({ inActionProcess: true })
    donationContract.downVote(projectId, { from: account }).then((data, err) => {
      if (err) {
        this.setState({ inActionProcess: false, donatingError: "There is an error occur. Please try again" })
        console.log(err)
      } else {
        console.log(data)
        this.handleClose();
        this.props.reLoadPage()
      }
    })
  }

  handleDonateAmountChange = event => {
    event.preventDefault()
    const numberPattern = /^[0-9]*\.?[0-9]*$/;
    const newAmount = event.target.value
    const donateAmount = numberPattern.test(newAmount) ? newAmount : this.state.clickedProject.donateAmount
    this.setState(({ clickedProject }) => ({ clickedProject: { ...clickedProject, donateAmount } }))
  }

  handleReportReasonChange = (event) => {
    event.preventDefault()
    const reportReason = event.target.value
    this.setState(({ clickedProject }) => ({ clickedProject: { ...clickedProject, reportReason } }))
  }

  getMetaMaskAccountAddress = async () => {
    await window.ethereum.enable();
    const account = await this.props.web3.eth.getCoinbase();
    return account;
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
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
                  style={{ overflow: 'scroll' }}
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
                      handleReportReasonChange={this.handleReportReasonChange}
                      desireAction={this.state.desireAction}
                    ></ProjectDetail>
                  </Modal.Body>
                  <Modal.Footer className={this.state.donatingError ? "d-flex flex-row modal-footer" : "d-flex flex-row-reverse"}>
                    {this.state.donatingError ?
                      <div>
                        <p className='text-danger'>{this.state.donatingError}</p>
                      </div> : null}
                    <div className="d-flex justify-content-around" style={this.state.desireAction ? { width: "180px" } : { width: "80px" }}>
                      <Button style={{ width: "80px" }} variant="secondary" onClick={this.handleClose}>
                        Close
                  </Button>
                      {!this.state.desireAction ? null :
                        this.state.desireAction == "donate" ?
                          <Button style={{ width: "80px" }} variant="primary" onClick={this.handleDonate}
                            disabled={!this.state.clickedProject || !this.state.clickedProject.donateAmount || this.state.inActionProcess}>
                            Donate
                  </Button> :
                          <Button style={{ width: "80px" }} variant="primary" onClick={this.handleReport}
                            disabled={!this.state.clickedProject || !this.state.clickedProject.reportReason || this.state.inActionProcess}>
                            Report
                  </Button>
                      }

                    </div>
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
              {context.user && (context.user.role === 'poster' || context.user.role === 'admin') && <Charity />}
              {context.user && context.user.role === 'admin' && <Admin donationContract={this.props.donationContract} account={this.props.account} />}
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Projects;
