import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
    const logout = async () => {
        let name = sessionStorage.getItem("username");
        if (name !== null) {
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("firstname");
            sessionStorage.removeItem("lastname");
            window.location.href = window.location.origin;
        }
    };

    let login_status = "Login";
    let username = sessionStorage.getItem("username");
    if (username !== null) {
        login_status = "Logout";
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
            <div className="container">
                <a className="navbar-brand fw-bold fs-4" href="/">
                    🚗 Dealership<span className="text-primary">App</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Contact</a>
                        </li>
                    </ul>
                    
                    <div className="d-flex align-items-center gap-3">
                        {username && (
                            <span className="text-light me-2">
                                Welcome, <span className="fw-bold text-primary">{username}</span>
                            </span>
                        )}
                        {login_status === "Login" ? (
                            <a className="btn btn-outline-light px-4" href="/login">Login</a>
                        ) : (
                            <button className="btn btn-danger px-4" onClick={logout}>Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;