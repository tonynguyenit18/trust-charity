import React from "react";
import headerImage from "../../images/bg-header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import "./projects.css";

const Project = ({ project }) => {
  return (
    <div className="col-md-3 project-container__item">
      <img style={{ width: "100%" }} src={headerImage}></img>
      <div>
        <p>{project.id}</p>
        <div>
          <p>
            <FontAwesomeIcon
              icon={faHandHoldingUsd}
              size="2x"
              color="#14BDEB"
              className="pr-2"
            />
            {project.upVote}
          </p>
          <p>
            <FontAwesomeIcon
              icon={faFrown}
              size="2x"
              color="#14BDEB"
              className="pr-2"
            />
            {project.upVote}
          </p>
        </div>
      </div>
      <p>{project.downVote}</p>
      <p>{project.donationTotalAmount}</p>
      <p>{project.goalAmount}</p>
    </div>
  );
};

export default Project;
