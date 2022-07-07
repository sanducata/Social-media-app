import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext/AuthContext";
import DropdownToggleContext from "../../../context/DropdownToggleContext/DropdownToggleContext";

import classes from "./login.module.css";

function Login() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const { selectValue, setSelectValue } = useContext(DropdownToggleContext);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post("http://localhost:5000/auth/login", loginData);
      await getLoggedIn();

      setSelectValue("Following");
      localStorage.setItem("dropdown-button-value", selectValue);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={classes.loginContainer}>
      <div className={classes.leftSide}>
        <img
          className={classes.loginImg}
          src={PF + "/loginImage.jpg"}
          alt="loginPhoto"
        />
      </div>
      <div className={classes.rightSide}>
        <div className={classes.rightSideTitle}>
          <h1>Hello!</h1>
          <p>welcome back, you've been missed</p>
        </div>
        <form onSubmit={login} className={classes.loginForm}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span>
            <Link to="/register" className={classes.forgotPassword}>
              Forgot password?
            </Link>
          </span>
          <button type="submit" className={classes.loginFormButton}>
            Login
          </button>
        </form>
        <span className={classes.createAccount}>
          Not a member?{" "}
          <Link to="/register" className={classes.createAnAccount}>
            Create an account
          </Link>
        </span>
        <div className={classes.orDiv}>
          <hr />
          <span>or</span>
          <hr />
        </div>
        <button className={classes.googleButton}>
          <img src={PF + "/googleLogo.svg"} alt="googleButton" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
