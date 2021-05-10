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
      const res = await axios.post(
        `${REACT_APP_LOCAL}/vehicle/add/${user}`,
        newVehicle
      );
      if (res.data) {
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
      <form onSubmit={handleSubmit} className="myform4">
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Μάρκα</label>
          </div>
          <div className="item">
            <input
              onChange={handleChange}
              className="inputtext"
              name="brand"
              type="text"
              required
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
              name="color"
              type="text"
              required
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Πινακίδα</label>
          </div>
          <div className="item">
            <input
              onChange={handleChange}
              className="inputtext"
              name="sign"
              type="text"
              required
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Επιλογή καύσιμου</label>
          </div>
          <div className="item">
            <select
              onChange={handleChange}
              className="selectbtn loginbtn"
              name="fuel"
              required
            >
              <option value="0">Καύσιμο</option>
              {["Βενζίνη", "Πετρέλαιο", "Ηλεκτρικό", "Γκάζι"].map(a => (
                <option value={a._id} id={a._id}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Τύπος οχήματος</label>
          </div>
          <div className="item">
            <input
              type="radio"
              onChange={handleChange}
              name="type"
              value="Αυτοκίνητο"
            />
            <label for="Αυτοκίνητο">Αυτοκίνητο</label>
            <span className="myspan" />
            <input
              type="radio"
              onChange={handleChange}
              name="type"
              value="Δίκυκλο"
            />
            <label for="Δίκυκλο">Δίκυκλο</label>
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Ψυγείο</label>
          </div>
          <div className="item">
            <input
              type="radio"
              onChange={handleChange}
              name="fridge"
              value="Ναι"
            />
            <label for="Ναι">Ναι</label>
            <span className="myspan" />
            <input
              type="radio"
              onChange={handleChange}
              name="fridge"
              value="Όχι"
            />
            <label for="Όχι">Όχι</label>
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
