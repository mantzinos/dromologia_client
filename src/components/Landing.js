import React from "react";
import { Link } from "react-router-dom";
// import("./Landing.css");

const Landing = () => {
  return (
    <section className="landing">
      <div className="logcard">
        {/* <div className="title">
          <h1>Δρομολόγια</h1>
        </div> */}
        <div className="logform">
          <div className="logreg">
            <Link className="mylink" to="/login">
              Σύνδεση
            </Link>
          </div>
          <div className="logreg">
            <Link className="mylink" to="/register">
              Εγγραφή
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
