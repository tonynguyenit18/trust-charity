import React from "react";
import Header from "../Header";
import { login } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from "react-router-dom";
import getWeb3 from "../../utils/getWeb3"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            role: "poster",
            validationMsg: {
                email: "",
                password: ""
            },
            responseError: "",
            isAllvalid: true,
            isProcessing: false,
            user: null
        }
    }

    handleTextInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleRadioButtonChange = event => {
        if (event.target.checked) {
            this.setState({ role: event.target.name })
        }
    }

    handleRegisterClick = () => {
        this.validateAll()
    }

    login = () => {
        if (!this.state.isAllvalid) return;
        this.setState({ isProcessing: true })
        const { email, password } = this.state;
        const body = { password, email };

        login(body).then(async response => {
            if (response.data && response.data.user) {
                if (response.data.user.token) {
                    localStorage.setItem("access_token", response.data.user.token)
                }
                if (response.data.user.role == "donator" || response.data.user.role == "wholesaler") {
                    const web3 = await getWeb3()
                    const accountAddress = await web3.eth.getCoinbase();
                    if (!accountAddress) {
                        await window.ethereum.enable();
                    }
                }
                this.setState({ user: response.data.user, isProcessing: false })
            }
        }).catch(error => {
            let responseError = "An error occurs!";
            if (error.response.data && error.response.data.msg) {
                responseError = error.response.data.msg
            }
            this.setState({ isProcessing: false, responseError })
        })
    }

    validateAll = () => {
        const validationMsg = this.state.validationMsg;
        let isAllvalid = true;
        for (let field in validationMsg) {
            const fieldChar = field.split("");
            let fieldLabel = "";
            fieldChar.map((char, index) => {
                if (index == 0) {
                    char = char.toUpperCase();
                }
                if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
                    char = " " + char
                }
                fieldLabel += char
            })
            if (this.state[field]) {
                validationMsg[field] = ""
            } else {
                isAllvalid = false;
                validationMsg[field] = `${fieldLabel} is required`
            }
        }

        if (!validationMsg.email) {
            const emailPattern = /^\w+@\w+\.[\w|.]+$/;
            if (!emailPattern.test(this.state.email)) {
                isAllvalid = false;
                validationMsg.email = "Invalid email format!"
            } else {
                validationMsg.email = ""
            }
        }
        console.log(isAllvalid)
        this.setState({ validationMsg, isAllvalid }, this.login)
    }


    render() {
        const { validationMsg, user } = this.state
        return (
            <React.Fragment>
                {user ? <Redirect to={{
                    pathname: "/",
                    state: { user }
                }} /> :
                    <React.Fragment>
                        <Header backgroundColor={true}></Header>
                        <div className="container d-flex justify-content-center">
                            <div className="register-form-wrap" style={{ width: "40%", marginTop: "150px", padding: "20px" }}>
                                <div className="form-group">
                                    <label htmlFor="email">Email <strong className="text-danger">*</strong></label>
                                    <input className="form-control" type="text" name="email" onChange={this.handleTextInputChange}></input>
                                    {validationMsg.email ? <p className="text-danger my-1">{validationMsg.email}</p> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password <strong className="text-danger">*</strong></label>
                                    <input className="form-control" type="password" name="password" onChange={this.handleTextInputChange}></input>
                                    {validationMsg.password ? <p className="text-danger my-1">{validationMsg.password}</p> : null}
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <button className="btn btn-primary" onClick={this.handleRegisterClick} style={{ minWidth: "100px" }} disabled={this.state.isProcessing}>
                                        {this.state.isProcessing ? <FontAwesomeIcon icon={faSpinner} size="sm" style={{ color: "#ffffff" }} spin /> : "Login"}
                                    </button>
                                </div>
                                <div className=" w-100 text-center">
                                    {this.state.responseError ? <p className="text-danger my-1">{this.state.responseError}</p> : null}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>}
            </React.Fragment>
        )
    }
}

export default Login;