import React from "react";
import axios from 'axios'
import ConfirmationModal from './confirmationModal'
class Register extends React.Component {
    state = {
        userName: '',
        email: '',
        role: '',
        password:'',
        publicAddress:this.props.publicAddress,
        modalShow: false,
        modalMessage: ''
    }

    handleInputChange = (section, v) => {
        this.setState({ [section]: v })
    }

    handleModalClose = () => this.setState({ modalShow: false })
    handleModalShow = () => this.setState({ modalShow: true })

    submitCharity = () => {
        // set validtion for the submit form
        if (this.state.userName === '' || this.state.email === '' || this.state.password === '') {
            const message = "Please fill all of the required fields"
            this.setState({ modalMessage: message, modalShow: true })

            return
        } else if (parseInt(this.state.role) < 0) {
            const message = "Please Select one of User role!!"
            this.setState({ modalMessage: message, modalShow: true })

            return
        }
        // create a new post with image
        const postUrl = 'http://localhost:8000/users'

        axios.post(postUrl, {
            userName: this.state.userName,
            email: this.state.email,
            role: this.state.role,
            password: this.state.password,
            publicAddress: this.props.publicAddress
        })
            .then((response) => {
                const message = "Register successful!! Thank you."
                this.setState({
                    modalMessage: message,
                    modalShow: true, 
                    userName: '',
                    email: '',
                    password: ''
                })
            })
            .catch((error) => {
                const message = error.message
                this.setState({
                    modalMessage: message,
                    modalShow: true, userName: '',
                    email: '',
                    password: ''
                })
            })
            .catch(error => {
                alert("ERROR " + JSON.stringify(error));
                const message = error.message
                this.setState({
                    modalMessage: message,
                    modalShow: true, userName: '',
                    email: '',
                    password: ''
                })
            })
    }

    render() {
        return (
            <div className="container-fluid mt-1 mb-1" style={{ backgroundColor: '#56Ad' }}>
                <ConfirmationModal modalMessage={this.state.modalMessage} modalShow={this.state.modalShow} handleModalClose={this.handleModalClose} />

                {/* title section */}
                <div className="row justify-content-center">
                    <div className="col-4 mt-5 text-center">
                        <h2 className='text-light'>Register with Us</h2>
                    </div>
                </div>

                {/* sub titile section */}
                <div className="row justify-content-center">
                    <div className="col-6 mt-2 text-center">
                        <i className='text-light'>Your publicAddress: {this.props.publicAddress}</i>
                    </div>
                </div>

                {/* Form section */}
                <div className="row justify-content-center  mt-5">
                    <div className="col-6">

                        <div className='row justify-content-center  mb-2'>
                            <div className='col-6'>
                                <label htmlFor="userName" className='text-light'>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    name="title"
                                    value={this.state.userName}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        this.handleInputChange(e.target.id, value)
                                    }} />
                            </div>


                        </div>
                        <div className='row justify-content-center mb-2'>
                            <div className='col-6'>
                                <label htmlFor="email" className='text-light'>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={this.state.email}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        this.handleInputChange(e.target.id, value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mb-2'>
                            <div className='col-6'>
                                <label htmlFor="role" className='text-light'>User Role</label>
                                <input
                                    type="Number"
                                    className="form-control"
                                    id="role"
                                    value={this.state.role}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        this.handleInputChange(e.target.id, value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mb-2'>
                            <div className='col-6'>
                                <label htmlFor="password" className='text-light'>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={this.state.password}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        this.handleInputChange(e.target.id, value)
                                    }}/>
                            </div>
                        </div>
                        <div className='row justify-content-center mt-4 mb-2'>
                            <div className='col-6 text-right'>
                                <input type="button" className="btn btn-primary" id="charity_submit" value="Register" onClick={() => {
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

export default Register;
