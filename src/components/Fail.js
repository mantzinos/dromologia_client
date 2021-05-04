import React, { useState } from "react";
import { Redirect } from "react-router";

const Fail = () => {
  const [mySubmit, setMySubmit] = useState(false);

  const goBack = event => {
    event.preventDefault();
    setMySubmit(prev => true);
  };
  if (mySubmit) return <Redirect to="/register" />;
  return (
    <section className="login fail">
      <form onSubmit={goBack} className="myform">
        <div className="formitem">
          <div className="item">
            Το όνομα που δοκιμάζεται να χρησιμοποιήσετε υπάρχει ήδη παρακαλώ
            επιλέξτε κάποιο άλλο
          </div>
        </div>

        <div className="formitem">
          <div className="item">
            <button type="submit" className="loginbtn">
              Return
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Fail;
