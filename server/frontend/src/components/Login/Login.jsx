import React, { useState } from 'react';
import "./Login.css";
import "../assets/style.css";
import Header from '../Header/Header';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("/djangoapp/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "userName": userName, "password": password }),
    });
    
    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
      sessionStorage.setItem('username', json.userName);
      window.location.href = "/";
    } else {
      alert("The user could not be authenticated");
    }
  };

  return (
    <div style={{backgroundColor: "#f8f9fa", minHeight: "100vh"}}>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-white text-center py-4 border-bottom-0">
                        <h3 className="fw-bold text-primary">Welcome Back</h3>
                        <p className="text-muted mb-0">Please sign in to continue</p>
                    </div>
                    <div className="card-body px-5 pb-5">
                        <form onSubmit={login}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Username</label>
                                <input type="text" className="form-control" placeholder="Enter username" 
                                    onChange={(e) => setUserName(e.target.value)} required/>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" 
                                    onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-lg">Sign In</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer bg-light text-center py-3">
                        <small>Don't have an account? <a href="/register" className="text-decoration-none">Register here</a></small>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;