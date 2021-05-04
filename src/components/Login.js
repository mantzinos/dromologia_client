import React, { useState } from "react";
import { Redirect } from "react-router";
const axios = require("axios");

const Login = () => {
  const [myInput, setMyInput] = useState({});
  const [mySubmit, setMySubmit] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;
    setMyInput(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_LOCAL}/login`,
        myInput
      );
      setMySubmit(prev => res.data);
      event.preventDefault();
    } catch (err) {
      console.log(err);
    }
    const myName = `/main/${myInput.username}`;
  };
  if (mySubmit === "ok")
    return (
      <Redirect
        to={{
          pathname: `/main/${myInput.username}`,
          state: { password: myInput.password },
        }}
      />
    );
  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="myform">
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Συνθηματικό χρήστη</label>
          </div>
          <div className="item">
            <input
              onChange={handleChange}
              className="input"
              name="username"
              type="text"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Κωδικός χρήστη</label>
          </div>
          <div className="item">
            <input
              onChange={handleChange}
              className="input"
              name="password"
              type="password"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <button type="submit" className="loginbtn">
              Σύνδεση
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
