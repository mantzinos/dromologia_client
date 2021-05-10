import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Deletevehicle = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState({});

  const [checkAdd, setCheckAdd] = useState(false);

  useEffect(() => {
    const getVehicles = async () => {
      const res = await axios.get(`${REACT_APP_LOCAL}/vehicle/getall/${user}`);
      console.log(res.data);
      setVehicles(res.data);
    };
    getVehicles();
  }, []);

  const handleChangeVehicle = event => {
    try {
      const { name, value } = event.target;
      console.log("name: ", name, " value: ", value);
      setVehicle(prev => {
        return {
          _id: value,
        };
      });
      console.log(value);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newVehicle = vehicle;

      console.log(newVehicle, "***vehicle***");

      console.log(newVehicle);
      const res = await axios.delete(
        `${process.env.REACT_APP_LOCAL}/vehicle/delete/${user}`,
        { data: { _id: newVehicle._id } }
      );
      console.log(res.data);
      if ((res.data = "vehicle successfully deleted")) {
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
            <label htmlFor="username">Επιλογή οχήματος</label>
          </div>
          <div className="item">
            <select
              required
              onChange={handleChangeVehicle}
              className="selectbtn loginbtn"
              name="vehicled"
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

export default Deletevehicle;
