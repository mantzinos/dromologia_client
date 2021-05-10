import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
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
        `${process.env.REACT_APP_LOCAL}/register`,
        myInput
      );
      setMySubmit(prev => res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (mySubmit === "duplicate name") {
    return <Redirect to="/fail" />;
  }

  if (mySubmit === "ok") {
    return <Redirect to="/login" />;
  }
  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="myform2">
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Όνομα χρήστη</label>
          </div>
          <div className="item">
            <input
              className="inputtext"
              required
              onChange={handleChange}
              name="username"
              type="text"
              minLength="3"
              maxLength="10"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="password">Κωδικός χρήστη</label>
          </div>
          <div className="item">
            <input
              className="inputtext"
              required
              onChange={handleChange}
              name="password"
              type="password"
              minLength="3"
              maxLength="10"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="email">Email</label>
          </div>
          <div className="item">
            <input
              className="inputtext"
              required
              onChange={handleChange}
              name="email"
              type="email"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <button type="submit" className="loginbtn">
              Εγγραφή
            </button>
            <span className="myspan"> </span>
            <Link to="/" className="loginbtn">
              Άκυρο
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
