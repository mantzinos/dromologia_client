import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = props => {
  const main = `/main/${props.user}`;
  return (
    <div className="mynavbar">
      <div className="navtitle">Δρομολόγια</div>
      <div className="navbuttons">
        <div className="navbtnmain">
          <Link className="loginbtn" to="/history">
            Ιστορικό
          </Link>
        </div>
        <div className="navbtnmain">
          <Link className="loginbtn" to={main}>
            Αρχική
          </Link>
        </div>
        <div className="navbtnmain">
          <Link className="loginbtn" to="/">
            Έξοδος
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
