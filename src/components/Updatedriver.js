import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Updatedriver = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [file, setFile] = useState("");
  const [photo, setPhoto] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState({});
  console.log(process.env.REACT_APP_PHOTO);
  console.log(process.env.REACT_APP_LOCAL);
  const [checkAdd, setCheckAdd] = useState(false);

  useEffect(() => {
    const getDrivers = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_LOCAL}/driver/getall/${user}`
      );
      setDrivers(res.data);
    };
    getDrivers();
  }, []);

  const fileHandler = event => {
    const photo = event.target.files[0];
    setFile(prev => photo);
  };
  const uploadHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "drivers");
      const pic = await axios.post(`${process.env.REACT_APP_PHOTO}`, formData);
      setPhoto(prev => pic.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setDriver(prev => {
      return {
        ...prev,
        [name]: value,
        photo,
      };
    });
  };
  const handleChangeDriver = event => {
    try {
      const { name, value } = event.target;
      setDriver(prev => {
        return {
          ...prev,
          _id: value,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "drivers");
      const pic = await axios.post(`${process.env.REACT_APP_PHOTO}`, formData);
      console.log(pic.data.url);
      const newDriver = driver;
      newDriver.photo = pic.data.url;
      console.log(newDriver);
      const res = await axios.put(
        `${process.env.REACT_APP_LOCAL}/driver/update/${user}`,
        newDriver
      );

      if (res.data) {
        setCheckAdd(prev => true);
      }
    } catch (err) {
      console.log(err);
    }
    console.log(driver);
  };
  if (checkAdd) {
    return <Redirect to={settings} />;
  }
  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="myform3">
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Επιλογή οδηγού</label>
          </div>
          <div className="item">
            <select
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
            <label htmlFor="phone">Τηλέφωνο</label>
          </div>
          <div className="item">
            <input
              min="10"
              max="10"
              className="inputtext"
              onChange={handleChange}
              name="phone"
              type="text"
            />
          </div>
        </div>
        <div className="formitem formitemphoto">
          <div className="item">
            <label htmlFor="photo">Φωτογραφία</label>
          </div>
          <div className="item">
            <div className="itemphoto">
              <input
                // className="inputtext"
                className="itemphoto"
                onChange={fileHandler}
                name="photo"
                type="file"
              />
            </div>
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <button type="submit" className="loginbtn">
              Αλλαγή
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

export default Updatedriver;
