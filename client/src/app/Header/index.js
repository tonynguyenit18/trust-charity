import React from "react";
import "./header.css"
import headerImage from "../../images/bg-header.png"

const Header = () => {
    return (
        <div className="header">
            <div className="image-background">
                <img style={{ width: "100%", height: "auto" }} src={headerImage} alt="Header Image" />
            </div>
            <div className="header-content">
                <nav className="navbar navbar-expand-lg navbar-ligth justify-content-between" style={{ backgroundColor: "#ffffff00" }}>
                    <a className="navbar-brand" style={{ color: "#E34902", fontWeight: "bold" }} href="#">Trust Charity</a>
                    <div className="d-flex flex-row-reverse">
                        <button className="btn-in-navbar">Register</button>
                        <button className="btn-in-navbar">Log in</button>
                        <button className="btn-in-navbar">Projects</button>
                        <button className="btn-in-navbar">Petrons</button>
                    </div>
                </nav>
            </div>
        </div >
    );
}

export default Header