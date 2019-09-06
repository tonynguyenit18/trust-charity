import React from "react";
import axios from 'axios'


class Charity extends React.Component {
  state = {
    post_title: '',
    post_location: '',
    post_description: ''
  }

  handleTitleChange = (v) => {
    this.setState({ post_title: v })
  }

  handleLocationChange = (v) => {
    this.setState({ post_location: v })
  }

  handleDescriptionChange = (v) => {
    this.setState({ post_description: v })
  }

  submitCharity = () => {
    const postUrl = 'http://localhost:8000/posts'

    axios.post(postUrl, {
      title: this.state.post_title,
      location: this.state.post_location,
      description: this.state.post_description,
      user_id: '5d719a0abbb7a3ee252c99ac' // at the moment user id is hard coded but, when the authentication is done, we need to use current user id
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container-fluid" style={{ backgroundColor: '#14BDEB' }}>

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

            <div className='row'>
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
                    this.handleTitleChange(value)
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
                    this.handleLocationChange(value)
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
                    this.handleDescriptionChange(value)
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
