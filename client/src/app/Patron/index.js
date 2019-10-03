import React from "react";
import axios from 'axios'

class Patron extends React.Component {

  render() {
    return (
      <div className="container-fluid" style={{ backgroundColor: '#ffad33', paddingBottom: '15px' }}>

        {/* title section */}
        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <h2 className='text-light'>Please donate for our app</h2>
          </div>
        </div>

        {/* sub titile section */}
        <div className="row justify-content-center">
          <div className="col-6 mt-2 text-center">
            <i className='text-light'>We can not develop and run Trust charity without your help. Please share your kindness to help pople around the world.</i>
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
            />
          </div>
        </div>

        <div className='row justify-content-center mt-4'>
          <div className='col-4 text-right'>
            <input type="button" className="btn btn-primary" id="patron_submit" value="Donate" onClick={() => {
              console.log('hi')
            }} />
          </div>
        </div>
      </div>
    );
  }
}

export default Patron;
