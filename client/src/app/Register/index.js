import React from "react";
import "./register.css"

class Login extends React.Component {
    render() {
        return (
            <div className="container d-flex justify-content-center">
                <div className="register-form-wrap" style={{ width: "40%", marginTop: "100px", padding: "20px" }}>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input className="form-control" type="text" id="firstName"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input className="form-control" type="text" id="lastName"></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="text" id="email"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password"></input>
                    </div>
                    <div>
                        <label>Role</label>
                        <div className="d-flex flex-row">
                            <div className="form-check mx-2">
                                <input className="form-check-input" type="radio" id="poster"></input>
                                <label className="form-check-label" htmlFor="poster">Poster</label>
                            </div>
                            <div className="form-check mx-2">
                                <input className="form-check-input" type="radio" id="donator"></input>
                                <label className="form-check-label" htmlFor="donator">Donator</label>
                            </div>
                            <div className="form-check mx-2">
                                <input className="form-check-input" type="radio" id="wholesaler"></input>
                                <label className="form-check-label" htmlFor="wholesaler">Wholesaler</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;