import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  const settings = `/settings/${props.user}`;
  const history = `/history/${props.user}`;
  return (
    <div className="mynavbar">
      <div className="navtitle">Δρομολόγια</div>
      <div className="navbuttons">
        <div className="navbtnmain">
          <Link className="loginbtn" to={history}>
            Ιστορικό
          </Link>
        </div>
        <div className="navbtnmain">
          <Link className="loginbtn" to={settings}>
            Ρυθμίσεις
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

export default Navbar;
