import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login.css";
import { useUserAuth } from "../Context/UserAuthContext";
import validator from "validator";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Is Strong Password");
    } else {
      setErrorMessage(
        "Not Strong" + " : Include character, upper-lower case & number"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password, confirmPassword);
      console.log("passsss", password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const validateForm = () => password === confirmPassword; //the validate form gets true if matches

  return (
    <>
      <div className="container-signin">
        <section className="wrapper">
          <div className="heading">
            <h2 style={{ color: "black" }} className="text text-large">
              <strong>Register</strong>
            </h2>
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  validate(e.target.value);
                }}
                className="input-field"
              ></input>
              {errorMessage === "" ? null : (
                <span
                  style={{
                    fontWeight: "middle",
                    color: "red",
                  }}
                >
                  {errorMessage}
                </span>
              )}
            </div>
            <div className="input-control">
              <input
                type="password"
                placeholder="enter your password"
                value={confirmPassword}
                className="input-field"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPassword && (
                <p
                  className="validation-message"
                  style={{ color: validateForm() ? "green" : "red" }}
                >
                  {validateForm()
                    ? "Password Matches"
                    : "Password Does not Match"}
                </p>
              )}
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
