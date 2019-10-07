import React from "react";
import headerImage from "../../images/bg-header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import "./projects.css";
import { AppContext } from "../App"

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleProjectClick = (action) => () => {
    // if the porject is closed, no click event will be attached
    if (this.props.project.status !== 4) {
      this.props.handleProjectClick(this.props.project, action);
    }
  };

  render() {
    const { project } = this.props;
    return (
      <AppContext.Consumer>
        {context => (
          <div
            className="col-md-3 project-container__item"
          >
            <div className='col-12 text-center'>
              <h5>
                {project.title}
              </h5>
              {project.status === 4 && <i className='text-danger'>Archived!!</i>}
            </div>
            <img style={{ width: "100%", cursor: "pointer" }} src={project.imageUrl || headerImage} onClick={this.handleProjectClick("")}></img>
            <div className="row mt-2">
              <div className='col-6'>
                <small>
                  {project.location}
                </small>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <p>
                  <strong>Donated: </strong>
                  {project.donationTotalAmount}
                </p>
                <p>
                  <strong>Goal: </strong>
                  {project.goalAmount}
                </p>
              </div>
              <div className="col-md-3" style={{ cursor: "pointer" }} onClick={this.handleProjectClick("donate")}>
                <p>
                  <FontAwesomeIcon
                    icon={faHandHoldingUsd}
                    size="2x"
                    color="#14BDEB"
                    className="pr-2"
                  />
                  {project.upVote}
                </p>
              </div>
              <div className="col-md-3" style={{ cursor: "pointer" }} onClick={this.handleProjectClick("report")}>
                <p>
                  <FontAwesomeIcon
                    icon={faFrown}
                    size="2x"
                    color="#14BDEB"
                    className="pr-2"
                  />
                  {project.downVote}
                </p>
              </div>
            </div>
          </div>)}
      </AppContext.Consumer>
    );
  }
}

export default Project;
