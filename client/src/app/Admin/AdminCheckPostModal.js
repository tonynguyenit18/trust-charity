import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios'
import Post from './Post'

class AdminCheckPostModal extends React.Component {

  rejectHandle = () => {
    const postUpdateUrl = `http://localhost:8000/posts/${this.props.postObj._id}`
    // set status 2(rejected) to the selected post
    axios.put(postUpdateUrl, { status: 2 }).then((res) => {
      this.props.removePostById(this.props.postObj._id)
      this.props.handleModalClose()
    }).catch((e) => {
      console.log(e)
    })
  }

  // set status 1(processing) to the selected post
  approveHandle = () => {
    const postUpdateUrl = `http://localhost:8000/posts/${this.props.postObj._id}`
    // get new posts(status:0) and set them to state
    axios.put(postUpdateUrl, { status: 1 }).then((res) => {
      this.props.removePostById(this.props.postObj._id)

      // add post to a blockchain through our smart contract
      this.props.donationContract.addPost(this.props.postObj._id, { from: this.props.account })


      this.props.handleModalClose()
    }).catch((e) => {
      console.log(e)
    })
  }

  render() {
    return (
      <Fragment>
        < Modal
          show={this.props.modalShow} onHide={() => {
            this.props.handleModalClose()
          }
          }
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Charity Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Post postObj={this.props.postObj} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              this.props.handleModalClose()
            }}>
              Cancel
          </Button>

            <Button variant="danger" onClick={() => {
              this.rejectHandle()
            }}>
              Reject
          </Button>

            <Button variant="primary" onClick={() => {
              this.approveHandle()
            }}>
              Approve
          </Button>
          </Modal.Footer>
        </Modal >
      </Fragment>)
  }
}

export default AdminCheckPostModal;
