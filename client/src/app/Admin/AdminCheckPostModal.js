import React, { Fragment } from "react";
import { Modal, Button, DropdownButton, Dropdown } from "react-bootstrap";
import axios from 'axios'
import Post from './Post'

class AdminCheckPostModal extends React.Component {

  state = {
    wholesalers: [],
    approveError: false,
    selectedSaler: null
  }

  componentDidMount() {
    const getSalerUrl = 'http://localhost:8000/user?role=wholesaler'
    axios.get(getSalerUrl).then(data => {
      const wholesalers = data.data
      this.setState({ wholesalers })
    })
  }

  handleSalerChange = (saler) => {
    this.setState({ selectedSaler: saler })
  }


  rejectHandle = () => {
    const postUpdateUrl = `http://localhost:8000/posts/${this.props.postObj._id}`
    // set status 2(rejected) to the selected post
    axios.put(postUpdateUrl, { status: 2 }).then((res) => {
      this.props.removePostById(this.props.postObj._id)

      this.setState({ selectedSaler: null, approveError: false })
      this.props.handleModalClose()
    }).catch((e) => {
      console.log(e)
    })
  }

  // set status 1(processing) to the selected post
  approveHandle = () => {

    if (!this.state.selectedSaler) {
      // if saler is not selected
      this.setState({ approveError: true })
      return
    }

    // add post to a blockchain through our smart contract
    this.props.donationContract.addPost(this.props.postObj._id, this.props.postObj.goalAmount, this.state.selectedSaler.address, { from: this.props.account }).then((data, err) => {
      if (err) {
        console.log(err)
      } else {
        const postUpdateUrl = `http://localhost:8000/posts/${this.props.postObj._id}`
        // get new posts(status:0) and set them to state
        axios.put(postUpdateUrl, { status: 1 }).then((res) => {
          this.props.removePostById(this.props.postObj._id)

          this.setState({ selectedSaler: null, approveError: false })
          this.props.handleModalClose()
        }).catch((e) => {
          console.log(e)
        })
      }
    })
  }

  render() {
    return (
      <Fragment>
        < Modal
          show={this.props.modalShow} onHide={() => {
            this.setState({ selectedSaler: null })
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
            {this.state.wholesalers && <DropdownButton
              className='mt-3'
              title={!this.state.selectedSaler ? 'Select wholesaler to assign' : this.state.selectedSaler.userName}
            >
              {this.state.wholesalers.map((saler) => {
                return (<Dropdown.Item
                  key={`saler-${saler.address}`}
                  data-saler={saler.address}
                  onClick={() => {
                    this.handleSalerChange(saler)
                  }}
                >{saler.userName}</Dropdown.Item>)
              })}
            </DropdownButton>}
            <i className={`text-danger ${!this.state.approveError && 'd-none'}`} >Pleaes select one wholesaler to assing to this project</i>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              this.setState({ selectedSaler: null, approveError: false })
              this.props.handleModalClose()
            }}>
              Cancel
          </Button>

            <Button variant="danger" onClick={() => {
              this.setState({ approveError: false })
              this.rejectHandle()
            }}>
              Reject
          </Button>

            <Button variant="primary" onClick={() => {
              this.setState({ approveError: false })
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
