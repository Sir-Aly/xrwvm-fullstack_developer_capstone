import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div className="register_wrapper">
      <div className="register_container">
        <div className="header">
          <h2>Sign Up</h2>
          <img
            src={close_icon}
            alt="Close"
            className="close_icon"
            onClick={gohome}
          />
        </div>

        <form onSubmit={register}>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="Username" />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={user_icon} alt="First Name" />
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={user_icon} alt="Last Name" />
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={email_icon} alt="Email" />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={password_icon} alt="Password" />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="submit" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
