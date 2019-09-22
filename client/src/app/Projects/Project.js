import React from "react";
import headerImage from "../../images/bg-header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import "./projects.css";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleProjectClick = () => {
    this.props.handleProjectClick(this.props.project);
  };

  render() {
    const { project } = this.props;
    return (
      <div
        className="col-md-3 project-container__item"
        onClick={this.handleProjectClick}
      >
        <img style={{ width: "100%" }} src={project.imageUrl ? project.imageUrl : headerImage}></img>
        <div className="row mt-2">
          <div className="col-md-6">
            <p>
              <strong>Donated: </strong>
              {project.donationTotalAmount}
            </p>
            <p>
              <strong>Gold: </strong>
              {project.goalAmount}
            </p>
          </div>
          <div className="col-md-3">
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
          <div className="col-md-3">
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
      </div>
    );
  }
}

export default Project;
