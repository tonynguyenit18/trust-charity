import React from "react";


class Charity extends React.Component {
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
                <input type="text" className="form-control" id="post_title" name="title" required />
              </div>

              <div className='col-6'>
                <label htmlFor="post_location" className='text-light'>Location</label>
                <input type="text" className="form-control" id="post_location" name="location" required />
              </div>

            </div>

            <div className='row'>
              <div className='col-12'>
                <label htmlFor="post_description" className='text-light'>Description</label>
                <textarea className="form-control" rows="4" id="post_description"></textarea>
              </div>
            </div>

            <div className='row justify-content-end mt-4 mb-3'>
              <div className='col-5 text-right'>
                <input type="button" className="btn btn-primary" id="charity_submit" value="Submit" />
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default Charity;
