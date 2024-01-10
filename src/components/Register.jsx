import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login.css";
import { useUserAuth } from "../Context/UserAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/login");
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
              <strong>Register</strong>
            </h1>
            <p style={{ color: "black" }} className="text text-normal">
              Already a user?
              <span>
                <a href="/login" className="text text-links">
                  {" "}
                  Login here
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
              <input
                type="password"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              ></input>
            </div>
            <button
              type="submit"
              name="Submit"
              className="input-submit"
              value="Sign-In"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Signup;
