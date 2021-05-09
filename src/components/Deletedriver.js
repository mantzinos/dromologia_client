import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Deletedriver = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState({});

  const [checkAdd, setCheckAdd] = useState(false);

  useEffect(() => {
    const getDrivers = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_LOCAL}/driver/getall/${user}`
      );
      console.log(res.data);
      setDrivers(res.data);
    };
    getDrivers();
  }, []);

  //   const handleChange = event => {
  //     const { name, value } = event.target;
  //     setDriver(prev => {
  //       return {
  //         ...prev,
  //         [name]: value,
  //       };
  //     });
  //   };
  const handleChangeDriver = event => {
    try {
      const { name, value } = event.target;
      console.log("name: ", name, " value: ", value);
      setDriver(prev => {
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
      const newDriver = driver;

      console.log(newDriver, "***driver***");

      console.log(newDriver);
      const res = await axios.delete(
        `${process.env.REACT_APP_LOCAL}/driver/delete/${user}`,
        { data: { _id: newDriver._id } }
      );
      console.log(res.data);
      if ((res.data = "Driver deleted successfully")) {
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
            <label htmlFor="username">Επιλογή οδηγού</label>
          </div>
          <div className="item">
            <select
              required
              onChange={handleChangeDriver}
              className="selectbtn loginbtn"
              name="driverd"
              id=""
            >
              <option value="0">Οδηγός</option>
              {drivers.map(a => (
                <option value={a._id} id={a._id}>
                  {a.lastname}
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

export default Deletedriver;
