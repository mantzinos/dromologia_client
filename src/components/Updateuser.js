import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Updateuser = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [userr, setUserr] = useState({});
  const [checkAdd, setCheckAdd] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setUserr(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const myUser = userr;
      myUser.username = user;
      console.log(myUser);
      const { email, password } = userr;
      const res = await axios.put(
        `${process.env.REACT_APP_LOCAL}/update/`,
        myUser
      );

      if (res.data === "User updated successfully") {
        setCheckAdd(prev => true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (checkAdd) {
    return <Redirect to={settings} />;
  }
  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="myform">
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Κωδικός</label>
          </div>
          <div className="item">
            <input
              onChange={handleChange}
              className="inputtext"
              name="password"
              type="password"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Email</label>
          </div>
          <div className="item">
            <input
              onChange={handleChange}
              className="inputtext"
              name="email"
              type="email"
            />
          </div>
        </div>

        <div className="formitem">
          <div className="item">
            <button type="submit" className="loginbtn">
              Αλλαγή
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

export default Updateuser;
