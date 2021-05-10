import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Updatevehicle = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [vehicle, setVehicle] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [checkAdd, setCheckAdd] = useState(false);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_LOCAL}/vehicle/getall/${user}`
        );
        console.log(res.data);
        setVehicles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getVehicles();
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setVehicle(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleChangeVehicle = event => {
    const { name, value } = event.target;
    setVehicle(prev => {
      return {
        ...prev,
        _id: value,
      };
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newVehicle = vehicle;
      const res = await axios.put(
        `${process.env.REACT_APP_LOCAL}/vehicle/update/${user}`,
        newVehicle
      );

      if (res.data === "Vehicle successfully updated") {
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
      <form onSubmit={handleSubmit} className="myform3">
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Επιλογή οχήματος</label>
          </div>
          <div className="item">
            <select
              onChange={handleChangeVehicle}
              className="selectbtn loginbtn"
              name="destinationd"
              id=""
            >
              <option value="0">Όχημα</option>
              {vehicles.map(a => (
                <option value={a._id} id={a._id}>
                  {a.sign}
                </option>
              ))}
            </select>
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

export default Updatevehicle;
