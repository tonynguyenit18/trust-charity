import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";

class ConfirmationModal extends React.Component {

  render() {
    return (
      <Fragment>
        < Modal show={this.props.modalShow} onHide={() => {
          this.props.handleModalClose()
        }
        }>
          <Modal.Header closeButton>
            <Modal.Title>Register Activity Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              this.props.handleModalClose()
            }}>
              Ok
          </Button>
          </Modal.Footer>
        </Modal >
      </Fragment>)
  }
}

export default ConfirmationModal;
