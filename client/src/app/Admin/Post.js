import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import headerImage from "../../images/bg-header.png";

class Post extends React.Component {

  render() {
    return (
      <Fragment>
        <Card >
          <Card.Img variant="top" src={headerImage} />
          <Card.Body>
            <small>{this.props.postObj.location}</small>
            <Card.Title>{this.props.postObj.title}</Card.Title>
            <Card.Text>
              {this.props.postObj.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Fragment>)
  }
}

export default Post;
