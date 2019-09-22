import React from "react";
import headerImage from "../../images/bg-header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import "./projects.css";

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donateAmount: ""
    };
  }
  handleProjectClick = () => {
    // this.props.handleProjectClick(this.props.project);
  };

  render() {
    const { project } = this.props;
    return (
      <div className="w-100" onClick={this.handleProjectClick}>
        <img style={{ width: "100%" }} src={project.imageUrl || headerImage}></img>
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
        <form >
          <div className="form-group">
            <label htmlFor="donateAmount">
              <strong>Donate Amount</strong>
            </label>
            <input
              className="form-control"
              name="donateAmount"
              value={project.donateAmount ? project.donateAmount : ""}
              onChange={this.props.handleDonateAmountChange}></input>
          </div>
        </form>
      </div>
    );
  }
}

export default ProjectDetail;
