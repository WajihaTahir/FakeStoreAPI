import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login.css";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../Context/UserAuthContext";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="container-signin">
        <section className="wrapper">
          <div className="heading">
            <h1 style={{ color: "black" }} className="text text-large">
              <strong>Sign In</strong>
            </h1>
            <p style={{ color: "black" }} className="text text-normal">
              New User?
              <span>
                <a href="/register" className="text text-links">
                  {" "}
                  Create an account
                </a>
              </span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="email"
                placeholder="enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              ></input>
            </div>
            <div className="input-control">
              <label htmlFor="password"></label>
              <input
                type={visible ? "text" : "password"}
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              ></input>
              <div
                style={{ padding: "2px", color: "black" }}
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </div>
            <button
              type="submit"
              name="Submit"
              className="input-submit"
              value="Sign-In"
            >
              Sign In
            </button>
            <GoogleButton
              style={{ marginLeft: "70px" }}
              onClick={handleGoogleSignIn}
            />
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;
