import React from "react";
import axios from 'axios'
import ConfirmationModal from './confirmationModal'

class Charity extends React.Component {
  state = {
    post_title: '',
    post_location: '',
    post_goal_amount: '',
    post_description: '',
    modalShow: false,
    modalMessage: '',
    successUpload: false
  }

  handleInputChange = (section, v) => {
    this.setState({ [section]: v })
  }

  handleModalClose = () => this.setState({ modalShow: false })
  handleModalShow = () => this.setState({ modalShow: true })
  handleFileInputChange = () => { this.setState({ successUpload: false }) }

  submitCharity = () => {
    // set validtion for the submit form
    if (this.state.post_title === '' || this.state.post_location === '' || this.state.post_description === '' || this.uploadInput.files.length === 0) {
      const message = "Please fill all of the required fields"
      this.setState({ modalMessage: message, modalShow: true })

      return
    } else if (parseInt(this.state.post_goal_amount) < 0) {
      const message = "Goal Amount can not be negative"
      this.setState({ modalMessage: message, modalShow: true })

      return
    }

    // Perform the upload
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    // post file name and file type to get a signed signeture url
    axios.post("http://localhost:8000/sign_s3", {
      fileType: fileType
    })
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var image_url = returnData.url;
        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            'Content-Type': fileType
          }
        };

        // put request to store the image in s3 with signed url
        axios.put(signedRequest, file, options)
          .then(result => {
            this.setState({ success: true });

            // create a new post with image
            const postUrl = 'http://localhost:8000/posts'

            axios.post(postUrl, {
              title: this.state.post_title,
              location: this.state.post_location,
              goalAmount: this.state.post_goal_amount,
              imageUrl: image_url,
              description: this.state.post_description,
              user_id: '5d719a0abbb7a3ee252c99ac' // at the moment user id is hard coded but, when the authentication is done, we need to use current user id
            })
              .then((response) => {
                const message = "Your charity activity has been submitted successfully and in a process. We will get back to you shortly."
                this.setState({
                  modalMessage: message,
                  modalShow: true, post_title: '',
                  post_location: '',
                  post_description: ''
                })
              })
              .catch((error) => {
                const message = error.message
                this.setState({
                  modalMessage: message,
                  modalShow: true, post_title: '',
                  post_location: '',
                  post_description: ''
                })
              });

          })
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
            const message = error.message
            this.setState({
              modalMessage: message,
              modalShow: true, post_title: '',
              post_location: '',
              post_description: ''
            })
          })
      })
      .catch(error => {
        alert(JSON.stringify(error));
        const message = error.message
        this.setState({
          modalMessage: message,
          modalShow: true, post_title: '',
          post_location: '',
          post_description: ''
        })
      })

  }

  render() {
    return (
      <div className="container-fluid" style={{ backgroundColor: '#14BDEB' }}>
        <ConfirmationModal modalMessage={this.state.modalMessage} modalShow={this.state.modalShow} handleModalClose={this.handleModalClose} />

        {/* title section */}
        <div className="row justify-content-center">
          <div className="col-4 mt-5 text-center">
            <h2 className='text-light'>Start Your Fundraising</h2>
          </div>
        </div>

        {/* sub titile section */}
        <div className="row justify-content-center">
          <div className="col-6 mt-2 text-center">
            <i className='text-light'>Post your situation to start a fundraising appeal for your charity project, Successful activity will be on our site to be exposed to our donators.</i>
          </div>
        </div>

        {/* Form section */}
        <div className="row justify-content-center  mt-5">
          <div className='col-7'>

            <div className='row mb-2'>
              <div className='col-6'>
                <label htmlFor="post_title" className='text-light'>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="post_title"
                  name="title"
                  value={this.state.post_title}
                  onChange={(e) => {
                    const value = e.target.value
                    this.handleInputChange(e.target.id, value)
                  }} />
              </div>

              <div className='col-6'>
                <label htmlFor="post_location" className='text-light'>Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="post_location"
                  value={this.state.post_location}
                  onChange={(e) => {
                    const value = e.target.value
                    this.handleInputChange(e.target.id, value)
                  }}
                />
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-6'>
                <label htmlFor="post_image" className='text-light'>Image</label>
                <input
                  id="post_image"
                  type='file'
                  className='d-block'
                  ref={(ref) => { this.uploadInput = ref; }}
                  onChange={(e) => {
                    this.handleFileInputChange()
                  }}
                />
              </div>
              <div className='col-6'>
                <label htmlFor="post_goal_amount" className='text-light'>Goal Amount(Ether)</label>
                <input
                  type="Number"
                  className="form-control"
                  id="post_goal_amount"
                  value={this.state.post_goal_amount}
                  onChange={(e) => {
                    const value = e.target.value
                    this.handleInputChange(e.target.id, value)
                  }}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <label htmlFor="post_description" className='text-light'>Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  id="post_description"
                  value={this.state.post_description}
                  onChange={(e) => {
                    const value = e.target.value
                    this.handleInputChange(e.target.id, value)
                  }}
                ></textarea>
              </div>
            </div>

            <div className='row justify-content-end mt-4 mb-3'>
              <div className='col-5 text-right'>
                <input type="button" className="btn btn-primary" id="charity_submit" value="Submit" onClick={() => {
                  this.submitCharity()
                }} />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Charity;
