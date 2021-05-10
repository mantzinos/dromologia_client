import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Deleteuser = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [userr, setUserr] = useState({});
  const [checkAdd, setCheckAdd] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

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
      const res = await axios.delete(
        `${process.env.REACT_APP_LOCAL}/delete/${user}`,
        {
          data: { password: userr.password },
        }
      );
      if (res.data === "ok") {
        setCheckDelete(prev => true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (checkAdd) {
    return <Redirect to={settings} />;
  }
  if (checkDelete) {
    return <Redirect to="/" />;
  }
  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="myform">
        <div className="formitem">
          Είσαι σίγουρος ότι θέλεις να διαγράψεις τον λογαριασμό σου οριστικά ;
          <br /> Αν ναι τότε συνέχισε.
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Επιβεβαίωση κωδικού</label>
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
            <button type="submit" className="loginbtn">
              Διαγραφή
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

export default Deleteuser;
