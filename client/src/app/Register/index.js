import React from "react";
import Header from "../Header";
import { register } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from "react-router-dom";
import getWeb3 from "../../utils/getWeb3";
import "./register.css"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "poster",
            validationMsg: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            responseError: "",
            isAllvalid: true,
            isProcessing: false,
            user: null,
            accountAddress: null
        }
    }

    async componentDidMount() {
        const web3 = await getWeb3()
        const accountAddress = await web3.eth.getCoinbase();
        if (accountAddress) {
            this.setState({ accountAddress })
        }
    }

    handleTextInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleRadioButtonChange = event => {
        if (event.target.checked) {
            let responseError = null;
            if (!this.state.accountAddress && (event.target.name == "donator" || event.target.name == "wholesaler")) {
                responseError = "Donator and Wholesaler need tpo log in with metamask!"
            }
            this.setState({ role: event.target.name, responseError })
        }
    }

    handleRegisterClick = () => {
        this.validateAll()
    }

    register = async () => {
        if (!this.state.isAllvalid) return;
        const { firstName, lastName, email, password, role } = this.state;
        const userName = firstName + " " + lastName;
        let accountAddress = this.state.accountAddress
        if (!accountAddress && (role == "donator" || role == "wholesaler")) {
            accountAddress = await this.getMetaMaskAccountAddress();
            console.log(accountAddress)
            if (accountAddress) {
                this.setState({ accountAddress, responseError: "" })
            } else {
                this.setState({ responseError: "Donator and Wholesaler need tpo log in with metamask!" })
                return
            }
        }

        const body = { address: accountAddress, userName, password, email, role };

        this.setState({ isProcessing: true })
        register(body).then(response => {
            if (response.data && response.data.user) {
                if (response.data.user.token) {
                    localStorage.setItem("access_token", response.data.user.token)
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
        this.setState({ validationMsg, isAllvalid }, this.register)
    }

    getMetaMaskAccountAddress = async () => {
        const web3 = await getWeb3()
        const account = await web3.eth.getCoinbase();
        await window.ethereum.enable();
        return account;
    }

    render() {
        const { validationMsg, user, accountAddress, role } = this.state
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
                                <div className="d-flex flex-row justify-content-between">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name <strong className="text-danger">*</strong></label>
                                        <input className="form-control" type="text" name="firstName" onChange={this.handleTextInputChange}></input>
                                        {validationMsg.firstName ? <p className="text-danger my-1">{validationMsg.firstName}</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name <strong className="text-danger">*</strong></label>
                                        <input className="form-control" type="text" name="lastName" onChange={this.handleTextInputChange}></input>
                                        {validationMsg.lastName ? <p className="text-danger my-1">{validationMsg.lastName}</p> : null}
                                    </div>
                                </div>
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
                                <div>
                                    <label>Role</label>
                                    <div className="d-flex flex-row">
                                        <div className="form-check mx-2">
                                            <input
                                                className="form-check-input"
                                                type="radio" name="poster"
                                                checked={this.state.role == "poster"}
                                                onChange={this.handleRadioButtonChange}></input>
                                            <label className="form-check-label" htmlFor="poster">Poster</label>
                                        </div>
                                        <div className="form-check mx-2">
                                            <input className="form-check-input"
                                                type="radio" name="donator"
                                                checked={this.state.role == "donator"}
                                                onChange={this.handleRadioButtonChange}></input>
                                            <label className="form-check-label" htmlFor="donator">Donator</label>
                                        </div>
                                        <div className="form-check mx-2">
                                            <input className="form-check-input"
                                                type="radio" name="wholesaler"
                                                checked={this.state.role == "wholesaler"}
                                                onChange={this.handleRadioButtonChange}></input>
                                            <label className="form-check-label" htmlFor="wholesaler">Wholesaler</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <button className="btn btn-primary" onClick={this.handleRegisterClick} style={{ minWidth: "100px" }} disabled={this.state.isProcessing}>
                                        {this.state.isProcessing ? <FontAwesomeIcon icon={faSpinner} size="sm" style={{ color: "#ffffff" }} spin /> : accountAddress || role == "poster" ? "Register" : "MetaMask"
                                        }
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