import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Adddestination = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [destination, setdestination] = useState({});
  const [checkAdd, setCheckAdd] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setdestination(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newDestination = destination;
      console.log(newDestination);
      const res = await axios.post(
        `${process.env.REACT_APP_LOCAL}/destination/add/${user}`,
        newDestination
      );
      if (res.data) {
        setCheckAdd(prev => true);
      }
    } catch (err) {
      console.log(err);
    }
    console.log(destination);
  };
  if (checkAdd) {
    return <Redirect to={settings} />;
  }
  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="myform3">
        <div className="formitem">
          <div className="item">
            <label htmlFor="name">Ονομασία</label>
          </div>
          <div className="item">
            <input
              className="inputtext"
              required
              onChange={handleChange}
              name="name"
              type="text"
              minLength="3"
              maxLength="12"
            />
          </div>
        </div>
        <div className="formitem3">
          <div className="item">
            <label htmlFor="description">Περιγραφή</label>
          </div>
          <div className="">
            <textarea
              className="inputtext inputtextarea"
              required
              onChange={handleChange}
              name="description"
              type="text"
              cols="25"
              rows="6"
              minlength="3"
              maxlength="60"
            ></textarea>
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="range">Απόσταση</label>
          </div>
          <div className="item">
            <input
              className="inputtext"
              required
              onChange={handleChange}
              name="range"
              type="text"
              minLength="1"
              maxLength="12"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <button type="submit" className="loginbtn">
              Εισαγωγή
            </button>
            <span className="myspan"> </span>
            <Link to={settings} className="loginbtn">
              Άκυρο
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Adddestination;
