import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { disabled } from "../constants/customStyles";

import "../css/Authentication.css";

const initialFormState = {
  username: "",
  password: "",
  authCode: "",
  formType: "signIn",
};

function Authentication() {
  const [formState, updateFormState] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      updateFormState(initialFormState);
    };
  }, []);

  const onChange = (e) => {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  };

  async function signUp() {
    setLoading((prev) => !prev);
    setErrorMessage("");
    document.body.style.cursor = "wait";
    const { username, password } = formState;
    try {
      // eslint-disable-next-line
      const { usr } = await Auth.signUp({
        username,
        password,
      });
      updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
      document.body.style.cursor = "default";
      setLoading((prev) => !prev);
    } catch (error) {
      setErrorMessage(error.message);
      console.log("error signing up", error);
      document.body.style.cursor = "default";
      setLoading((prev) => !prev);
    }
  }

  async function confirmSignUp() {
    setLoading((prev) => !prev);
    setErrorMessage("");
    document.body.style.cursor = "wait";
    const { username, authCode } = formState;
    try {
      await Auth.confirmSignUp(username, authCode);
      updateFormState(() => ({ ...formState, formType: "signIn" }));
      document.body.style.cursor = "default";
      setLoading((prev) => !prev);
    } catch (error) {
      setErrorMessage(error.message);
      console.log("error confirming sign up", error);
      document.body.style.cursor = "default";
      setLoading((prev) => !prev);
    }
  }

  async function signIn() {
    setLoading((prev) => !prev);
    setErrorMessage("");
    document.body.style.cursor = "wait";
    const { username, password } = formState;
    try {
      // eslint-disable-next-line
      const user = await Auth.signIn(username, password);
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
      document.body.style.cursor = "default";
      setLoading((prev) => !prev);
    } catch (error) {
      setErrorMessage(error.message);
      console.log(typeof error);
      console.log("error signing in", error.message);
      document.body.style.cursor = "default";
      setLoading((prev) => !prev);
    }
  }

  async function forgotPassword() {
    setLoading((prev) => !prev);
    setErrorMessage("");
    document.body.style.cursor = "wait";
    const { username } = formState;
    try {
      const data = await Auth.forgotPassword(username);
      console.log(data);
      updateFormState(() => ({
        ...formState,
        formType: "forgotPasswordSubmit",
      }));
      document.body.style.cursor = "default";
      setLoading((prev) => !prev);
    } catch (error) {
      setErrorMessage(error.message);
      console.log("error: ", error);
      document.body.style.cursor = "default";
      setLoading((prev) => !prev);
    }
  }

  async function forgotPasswordSubmit() {
    setLoading((prev) => !prev);
    setErrorMessage("");
    document.body.style.cursor = "wait";
    const { username, authCode, password } = formState;
    try {
      const data = await Auth.forgotPasswordSubmit(
        username,
        authCode,
        password
      );
      updateFormState(() => ({ ...formState, formType: "signIn" }));
      document.body.style.cursor = "default";
      setLoading((prev) => !prev);
      console.log(data);
    } catch (error) {
      setErrorMessage(error.message);
      console.log("error: ", error);
      document.body.style.cursor = "default";
      setLoading((prev) => !prev);
    }
  }

  const { formType } = formState;

  return (
    <div className="auth-container">
      <div className="auth">
        {formType === "signUp" && (
          <>
            <h1 className="auth-title">Sign Up</h1>
            <span className="error">{errorMessage}</span>
            <input
              name="username"
              type="text"
              onChange={onChange}
              placeholder="email"
              className="input-text"
            />
            <input
              name="password"
              type="password"
              onChange={onChange}
              placeholder="password"
              className="input-text"
            />
            <input
              style={loading ? disabled : null}
              type="button"
              value="Create Account"
              className="submit"
              onClick={signUp}
            />
            <div>
              <span
                className="hover-underline-animation auth-form-option"
                onClick={() =>
                  updateFormState(() => ({ ...formState, formType: "signIn" }))
                }
              >
                Already have an account?
              </span>
            </div>
          </>
        )}
        {formType === "confirmSignUp" && (
          <>
            <h1 className="auth-title">Confirmation</h1>
            <span className="confirmation">
              Please check your inbox for the confirmation code.
            </span>
            <span className="error">{errorMessage}</span>
            <input
              name="authCode"
              onChange={onChange}
              placeholder="enter confirmation code"
              className="input-text"
            />
            <input
              style={loading ? disabled : null}
              type="button"
              value="Confirm Sign Up"
              className="submit"
              onClick={confirmSignUp}
            />
          </>
        )}
        {formType === "signIn" && (
          <>
            <h1 className="auth-title">Sign In</h1>
            <span className="error">{errorMessage}</span>
            <input
              name="username"
              type="text"
              onChange={onChange}
              placeholder="email"
              className="input-text"
            />
            <input
              name="password"
              type="password"
              onChange={onChange}
              placeholder="password"
              className="input-text"
            />
            <input
              style={loading ? disabled : null}
              type="button"
              value="Login"
              className="submit"
              onClick={signIn}
            />
            <div className="auth-login-options">
              <span
                className="hover-underline-animation auth-form-option"
                onClick={() =>
                  updateFormState(() => ({
                    ...formState,
                    formType: "forgotPassword",
                  }))
                }
              >
                Forgot your password
              </span>
              <span
                className="hover-underline-animation auth-form-option"
                onClick={() =>
                  updateFormState(() => ({ ...formState, formType: "signUp" }))
                }
              >
                Create an Account
              </span>
            </div>
          </>
        )}
        {formType === "forgotPassword" && (
          <>
            <h1 className="auth-title">Forgot Password</h1>
            <span className="error">{errorMessage}</span>
            <input
              name="username"
              type="text"
              onChange={onChange}
              placeholder="email"
              className="input-text"
            />
            <input
              style={loading ? disabled : null}
              type="button"
              value="Get Confirmation Code"
              className="submit"
              onClick={forgotPassword}
            />
            <div className="auth-login-options">
              <span
                className="hover-underline-animation auth-form-option"
                onClick={() =>
                  updateFormState(() => ({
                    ...formState,
                    formType: "signIn",
                  }))
                }
              >
                Back to sign in
              </span>
            </div>
          </>
        )}
        {formType === "forgotPasswordSubmit" && (
          <>
            <h1 className="auth-title">Reset Password</h1>
            <span className="confirmation">
              Please check your inbox for the confirmation code.
            </span>
            <span className="error">{errorMessage}</span>
            <input
              name="authCode"
              type="text"
              onChange={onChange}
              placeholder="confirmation code"
              className="input-text"
            />
            <input
              name="password"
              type="password"
              onChange={onChange}
              placeholder="new password"
              className="input-text"
            />
            <input
              style={loading ? disabled : null}
              type="button"
              value="Reset Password"
              className="submit"
              onClick={forgotPasswordSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Authentication;
