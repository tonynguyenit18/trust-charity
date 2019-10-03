import React from "react";
import axios from 'axios'
import { Modal, Button } from "react-bootstrap";

class Patron extends React.Component {

  state = {
    modalShow: false,
    amount: ''
  }
  handleInputChange = (val) => {
    this.setState({ amount: val })
  }
  handleModalClose = () => this.setState({ modalShow: false })

  donateForTrustCharity = async () => {
    let account = this.props.account
    if (this.props.account) {
      account = await this.props.getMetaMaskAccountAddress()
    }

    // transfer Ether without smart contract
    this.props.web3.eth.sendTransaction(
      {
        from: account,
        to: '0xa5e6312cB4faf7e23aB5c4CEfB54e31f872dbe60',  // this has to point Trust charity address in the end
        value: this.props.web3.utils.toWei(this.state.amount, "ether")
      },
      (err, transactionHash) => {
        if (!err) {
          // transction completed
          this.setState({ modalShow: true, amount: '' })
        }
      }
    )
  }

  render() {
    return (
      <div id='patron-section' className="container-fluid" style={{ backgroundColor: '#ffad33', paddingBottom: '15px' }}>

        {/* modal content */}
        < Modal show={this.state.modalShow} onHide={() => {
          this.props.handleModalClose()
        }
        }>
          <Modal.Header closeButton>
            <Modal.Title>Thank You So Match For Your Support</Modal.Title>
          </Modal.Header>
          <Modal.Body>Thank you for your kindness. We promiss to use your money in order to improve and keep running Trust Chairty. </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              this.handleModalClose()
            }}>
              Close
          </Button>
          </Modal.Footer>
        </Modal >

        {/* title section */}
        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <h2 className='text-light'>Please donate for Trust Charity</h2>
          </div>
        </div>

        {/* sub titile section */}
        <div className="row justify-content-center">
          <div className="col-6 mt-2 text-center">
            <i className='text-light'>We can not develop and run Trust Charity without your help. Please share your kindness to help people around the world.</i>
          </div>
        </div>
        {/* Form section */}
        <div className="row justify-content-center mt-5">
          <div className='col-4'>
            <label htmlFor="patron_amount" className='text-light'>Amount(Ether)</label>
            <input
              type="number"
              className="form-control"
              id="patron_amount"
              name="patron_amount"
              value={this.state.amount}
              onChange={(e) => {
                const val = e.target.value
                this.handleInputChange(val)
              }}
            />
          </div>
        </div>

        <div className='row justify-content-center mt-4'>
          <div className='col-4 text-right'>
            <input
              type="button"
              className="btn btn-primary"
              id="patron_submit"
              value="Donate"
              disabled={
                this.state.amount === '' ||
                parseInt(this.state.amount) <= 0
              }
              onClick={() => {
                this.donateForTrustCharity()
              }} />
          </div>
        </div>
      </div>
    );
  }
}

export default Patron;
