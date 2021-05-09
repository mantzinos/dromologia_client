import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Addvehicle = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [vehicle, setVehicle] = useState({});
  const [checkAdd, setCheckAdd] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setVehicle(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newVehicle = vehicle;
      console.log(newVehicle);
      //   const res = await axios.post(
      //     `${process.env.REACT_APP_LOCAL}/vehicle/add/${user}`,
      //     newVehicle
      //   );
      //   if (res.data) {
      //     setCheckAdd(prev => true);
      //   }
    } catch (err) {
      console.log(err);
    }
    console.log(vehicle);
  };
  if (checkAdd) {
    return <Redirect to={settings} />;
  }
  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="myform4">
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Μάρκα</label>
          </div>
          <div className="item">
            <input
              onChange={handleChange}
              className="inputtext"
              name="username"
              type="text"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Χρώμα</label>
          </div>
          <div className="item">
            <input
              onChange={handleChange}
              className="inputtext"
              name="username"
              type="text"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Τύπος οχήματος</label>
          </div>
          <div className="item">
            <input
              onChange={handleChange}
              className="inputtext"
              name="username"
              type="text"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Καύσιμο</label>
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
            <label htmlFor="username">Ψυγείο</label>
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

export default Addvehicle;
